import axios, { AxiosResponse } from "axios";
import { CheckCertificationRequest, EmailCertificationRequest,  SignInRequest, SignUpRequest } from "./request/auth";
import { CheckCertificationResponse, EmailCertificationResponse, IdCheckedResponse, SignInResponse, SignUpResponse } from "./response/auth";
import { Response } from "./response";
import idCheckedRequest from "./request/auth/id-check.request";

const responsehandler = <T>(response: AxiosResponse<any, any>) => {
  const responseBody: T = response.data;
  return responseBody;
};

const errorHandler = (error:any) => {
  if(!error.response || !error.response.data) return null;
  const responseBody : Response = error.response.data;
  return responseBody;
}

const DOMAIN = 'http://localhost:8080';
const API_DOMAIN = `${DOMAIN}/api/v1`;

export const SNS_SIGN_IN_URL = (type: 'kakao' | 'naver') => `${API_DOMAIN}/auth/oauth2/${type}`;
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const ID_CHECK_URL = () => `${API_DOMAIN}/auth/id-check`;
const EMAIL_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/email-certification`;
const CHECK_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/check-certification`;

export const signInRequest = async (requestBody : SignInRequest) => {
  const result = await axios.post(SIGN_IN_URL(), requestBody)
      .then(responsehandler<SignInResponse>)
      .catch(errorHandler);

  return result;
}


export const signUpRequest = async (requestBody: SignUpRequest) => {
  const result = await axios.post(SIGN_UP_URL(), requestBody)
      .then(responsehandler<SignUpResponse>)
      .catch(errorHandler);

  return result;
}

export const idCheckRequest = async (requestBody: idCheckedRequest) => {

  const result = await axios.post(ID_CHECK_URL(), requestBody)
      .then(responsehandler<IdCheckedResponse>)
      .catch(errorHandler);
      
  return result;
  
};

export const emailCertificationRequest = async (requestBody: EmailCertificationRequest) => {
  const result = await axios.post(EMAIL_CERTIFICATION_URL(), requestBody)
      .then(responsehandler<EmailCertificationResponse>)
      .catch(errorHandler);

      return result;
};

export const checkCertificationRequest = async (requestBody: CheckCertificationRequest) => {
  const result = await axios.post(CHECK_CERTIFICATION_URL(), requestBody)
      .then(responsehandler<CheckCertificationResponse>)
      .catch(errorHandler);

      return result;
}; 
