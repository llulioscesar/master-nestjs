/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "accounts";

export interface GetUserRequest {
  id: string;
}

export interface GetUserResponse {
  id: string;
  username: string;
  email: string;
}

export const ACCOUNTS_PACKAGE_NAME = "accounts";

export interface AccountsServiceClient {
  getUser(request: GetUserRequest): Observable<GetUserResponse>;
}

export interface AccountsServiceController {
  getUser(request: GetUserRequest): Promise<GetUserResponse> | Observable<GetUserResponse> | GetUserResponse;
}

export function AccountsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AccountsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AccountsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ACCOUNTS_SERVICE_NAME = "AccountsService";
