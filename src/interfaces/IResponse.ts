export enum BusinessCode {
    Success = 100000,
    TimeOut = 500003
  }
  
export interface IResponse<TModel> {
  code: BusinessCode;
  data: TModel;
  msg: string;
  time: number;
}