export interface IResponse {
  succeeded: boolean;
  errors: string[];
  responseError: ResponseError;
}

export enum ResponseError {
  None,
  AuthorizationError,
  Fail,
  HttpError,
  NotFound,
  ValidationError
}
