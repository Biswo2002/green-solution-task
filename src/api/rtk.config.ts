import type { AxiosRequestConfig, AxiosError } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import HOSTS from './hosts';
import { AppConfig } from '~/configs/config';
import { apiClient } from '~/api/apiClient';
import { appStorageReady } from '~/utils/AppStorage';

type AxiosBaseQueryArgs = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: any;
  body?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  formData?: boolean;
};

type AxiosBaseQueryError = {
  status: number;
  data: unknown;
};

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> =>
  async ({
    url,
    method = 'GET',
    data,
    body,
    params,
    headers,
    formData: useForm,
  }: AxiosBaseQueryArgs) => {
    await appStorageReady;
    const payload = typeof data !== 'undefined' ? data : body;

    const baseUrl = `${HOSTS?.MAIN ?? ''}${url}`;
    const fullUrl = params && Object.keys(params).length > 0
      ? `${baseUrl}?${new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString()}`
      : baseUrl;

    const config: AxiosRequestConfig = {
      url: baseUrl,
      method,
      data: payload,
      params,
      headers: headers ?? {},
    };

    if (useForm) {
      config.headers = {
        ...(config.headers ?? {}),
        'Content-Type': 'multipart/form-data',
      };
    }

    try {
      const response = await apiClient.request(config);      
      return { data: response.data };
    } catch (error) {
      const err = error as AxiosError;     // Log API error     
      return {
        error: {
          status: err.response?.status ?? 500,
          data: err.response?.data ?? err.message,
        },
      };
    }
  };

export const SPORTUP_CLIENT_QUERY = axiosBaseQuery();

export const SPORTUP_CLIENT_QUERY_PUBLIC = () =>
  fetchBaseQuery({
    baseUrl: HOSTS?.MAIN,
    timeout: AppConfig.REQUEST_TIMEOUT,
    prepareHeaders: (headers: Headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  });