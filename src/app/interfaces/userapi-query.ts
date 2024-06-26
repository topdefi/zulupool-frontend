import * as EApi from '../enums/api-enums';
import { TCoinName } from './coin';
import { IUserSettings, IUser } from './user';

/* export interface IUserChangePasswordParams { }
export interface IUserChangePasswordResponse { }
export interface IUserChangePasswordInitiateParams { }
export interface IUserChangePasswordInitiateResponse { }
export interface IUserCreateParams {}
export interface IUserCreateResponse {} */
export interface IUserResendEmailParams {
    login: string; // login Unique user identifier (up to 64 characters)
    password: string; // Password (8-64 characters length)
    email: string; // User email
}
export interface IUserResendEmailResponse {
    status: EApi.statusCommonResp | EApi.userResendEmailResp;
}

export interface IUserActionParams {
    id: string; // unique identifier of operation generated by another api function
    totp?: number; //OTP
    newPassword?: string;
}
export interface IUserChangePassword {
    id: string; // unique identifier of operation generated by another api function
    newPassword: string;
}
export interface IUserActionResponse {
    status: EApi.statusCommonResp | EApi.userActionResp;
}

export interface IUserGetCredentialsParms {
    id: string; // unique identifier of operation generated by another api function
    targetLogin?: string; //various user login (only for admin session id)
}
export interface IUserGetCredentialsResponse {
    status: EApi.statusCommonResp;
    name: string; // Unique user identifier
    email: string; //User email
    registrationDate: number; // User registration date. Uses unix time format.
    isReadOnly?: boolean;
    login?: string;
    has2fa: boolean;
}
export interface ICredentials {
    name: string; // Unique user identifier
    email: string; //User email
    registrationDate: number; // User registration date. Uses unix time format.
    login?: string;
}
export interface IUserGetSettingsParams {
    id: string; // unique identifier of operation generated by another api function
    targetLogin?: string; //various user login (only for admin session id)
}
export interface IUserGetSettingsResponse {
    status: EApi.statusCommonResp;
    coins: IUserSettings[];
}

export interface IUserUpdateSettingsParams {
    id: string; // unique identifier of operation generated by another api function
    targetLogin?: string; //various user login (only for admin session id)
    coin: TCoinName;
    address: string;
    payoutThreshold: number;
    autoPayoutEnabled: boolean;
}
export interface IUserUpdateSettingsResponse {
    status: EApi.statusCommonResp;
}
export interface IUserUpdateCredentialsParams {
    id: string; // unique identifier of operation generated by another api function
    targetLogin?: string; //various user login (only for admin session id)
    name: string;
}
export interface IUserUpdateCredentialsResponse {
    status: EApi.statusCommonResp;
}
export interface IUserEnumerateAllParams {
    id: string; // unique identifier of operation generated by another api function
    coin: TCoinName;
    offset?: number; //(default=0) - first row offset
    size?: number; //(default=100) - rows count in result
    sortBy?: string; // (default="averagePower") - column for sorting
    sortDescending?: boolean; //(default=true) - enable descending sort
}
export interface IUserEnumerateAllResponse {
    status: EApi.statusCommonResp | EApi.userEnumerateAllResp;
    users: IUser[];
}

export interface IUserCreateParams {
    login: string; // Unique user identifier (up to 64 characters)
    password: string; // Password (8-64 characters length)
    email: string; // User email, can be omitted, if isActive=true
    publicname: string;
}
export interface IUserCreateByAdminParams {
    login: string; // Unique user identifier (up to 64 characters)
    password: string; // Password (8-64 characters length)
    email?: string; // User email, can be omitted, if isActive=true
    name?: string; // User name (display instead of login in 'blocks found by pool' table (up to 256 characters)
    isActive?: boolean; // if true, function will create activated user (option available for admin account only)
    isReadOnly?: boolean; // if true, user will have no write access to his account (option available for admin account only)
    feePlanId?: string;
    //parentUser?: string;
    //defaultFee?: number;
    //specificFee?: ISpecificFee[];
    //id?: string; //unique user session id returned by userlogin function, only admin session is usable
}
export interface ISpecificFee {
    coin: string;
    fee: number;
}

export interface IUserCreateResponse {
    status: EApi.statusCommonResp | EApi.userCreateResp; // Request status.
}
