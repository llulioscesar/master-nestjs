/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty.pb";

export const protobufPackage = "notifications";

export interface SendRequest {
  userId: string;
  content: string;
  publicationId: string;
}

export const NOTIFICATIONS_PACKAGE_NAME = "notifications";

export interface NotificationsServiceClient {
  send(request: SendRequest): Observable<Empty>;
}

export interface NotificationsServiceController {
  send(request: SendRequest): void;
}

export function NotificationsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["send"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("NotificationsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("NotificationsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const NOTIFICATIONS_SERVICE_NAME = "NotificationsService";
