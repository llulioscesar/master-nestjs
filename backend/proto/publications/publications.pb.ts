/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "publications";

export interface GetByIdRequest {
  id: string;
}

export interface GetByIdResponse {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const PUBLICATIONS_PACKAGE_NAME = "publications";

export interface PublicationsServiceClient {
  getById(request: GetByIdRequest): Observable<GetByIdResponse>;
}

export interface PublicationsServiceController {
  getById(request: GetByIdRequest): Promise<GetByIdResponse> | Observable<GetByIdResponse> | GetByIdResponse;
}

export function PublicationsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getById"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PublicationsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PublicationsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PUBLICATIONS_SERVICE_NAME = "PublicationsService";
