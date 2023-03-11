/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "publications";

export interface getByPublicationIdRequest {
  id: string;
}

export interface Comment {
  id: string;
  content: string;
  publicationId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  children: Comment[];
}

export interface getByPublicationIdResponse {
  comments: Comment[];
}

export const PUBLICATIONS_PACKAGE_NAME = "publications";

export interface CommentsServiceClient {
  getByPublicationId(request: getByPublicationIdRequest): Observable<getByPublicationIdResponse>;
}

export interface CommentsServiceController {
  getByPublicationId(
    request: getByPublicationIdRequest,
  ): Promise<getByPublicationIdResponse> | Observable<getByPublicationIdResponse> | getByPublicationIdResponse;
}

export function CommentsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getByPublicationId"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CommentsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CommentsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const COMMENTS_SERVICE_NAME = "CommentsService";
