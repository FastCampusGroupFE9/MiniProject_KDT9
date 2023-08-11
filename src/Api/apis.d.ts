// apis.d.ts

import { AxiosInstance } from "axios";
import { UpdateType } from "../types/common.ts";


declare module "src/Api/apis.ts" {
  export const getAccessToken: () => string | undefined;
  
  export const ApiHttp: AxiosInstance;
  export const ApiLogin: AxiosInstance;
  export const getSilentAxios: (token: string) => AxiosInstance;
  export const getNewAccessToken: () => Promise<string>;

  export function getListAll(): Promise<any>;
  export function permission(item: { id: number }): Promise<any>;
  export function getMyPage(): Promise<any>;
  export function login(email: string, password: string): Promise<any>;
  export function logOut(): Promise<any>;
  export function signUp(email: string, password: string, name: string, join: string): Promise<any>;
  export function getMainPage(token: string): Promise<any>;
  export function postMain(title: string, category: string, endDate: string, reason: string, startDate: string): Promise<any>;
  export function postPassword(data: { newPassword: string }): Promise<any>;
  export function postUpdate(data: UpdateType): Promise<any>;
  export function postDelete(id: number): Promise<any>;
}
