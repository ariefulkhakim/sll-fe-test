import { DefaultApiResponseType } from '@/types/apiResponse';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookie from 'js-cookie';

export const apiClient = axios.create({
  baseURL: "https://test.api.sahabatlautlestari.com",
  headers: {
    'Content-Type': 'application/json',
    'x-version': '2.0'
  },
});

const onRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const session = Cookie.get("access_token");
  const updatedConfig = { ...config };

  const headers: any = {
    ...updatedConfig.headers,
    Authorization: `Bearer ${session}`,
  };

  return {
    ...updatedConfig,
    headers,
  };
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.log(response)
  return response;
};

const onResponseError = (error: AxiosError): DefaultApiResponseType => {
  const responseError: any = error.response;
  console.log(error);
  if (responseError) {
    return {
      status: responseError.status,
      success: false,
      msg: responseError?.data?.msg || 'Failed',
      data: null,
    };
  }

  return {
    status: 500,
    success: false,
    msg: 'Internal Server Error',
    data: null,
  };
};

apiClient.interceptors.request.use(onRequest, onRequestError);
apiClient.interceptors.response.use(onResponse, onResponseError);

type T = {
  type?: string;
  path: string;
  token?: string;
  body?: null | { [key: string]: string } | undefined | any;
  params?: null | { [key: string]: string } | undefined | any;
  filename?: string;
};

// eslint-disable-next-line func-names
const ApiInstance = (function () {
  const get = async (payload: T): Promise<any> => {
    return apiClient.get(payload.path, {
      headers: {
        'Content-type': 'Application/json',
        Authorization: payload.token ?? '',
      },
      params: payload.params,
    });
  };

  const post = async (payload: T): Promise<any> => {
    return apiClient.post(payload.path, payload.body, {
      headers: {
        'Content-type': 'Application/json',
        Authorization: payload.token ?? '',
      },
    });
  };

  const put = async (payload: T): Promise<any> => {
    return apiClient.put(payload.path, payload.body, {
      headers: {
        'Content-type': 'Application/json',
        Authorization: payload.token ?? '',
      },
    });
  };

  const remove = async (payload: T): Promise<any> => {
    return apiClient.delete(payload.path, {
      headers: {
        'Content-type': 'Application/json',
        Authorization: payload.token ?? '',
      },
    });
  };

  return {
    post,
    get,
    put,
    remove,
  };
})();

export default ApiInstance;
