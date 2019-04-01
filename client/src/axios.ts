import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { message } from 'antd';

// 接口前缀
const BASE_URL = '';

// axios 配置实例
const getAxiosInstance = (): AxiosInstance => {
  const instance: AxiosInstance = Axios.create({
    baseURL: `${BASE_URL}`
  });
  instance.interceptors.request.use((config) => ({
    ...config,
    params: {
      // 此处注意，你的`params`应该是个对象，不能是其他数据类型
      ...(config.params || {}),
      _: +new Date()
    }
  }));

  instance.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return Promise.resolve(response);
      } else {
        return Promise.reject('response 不存在');
      }
    },
    (error) => {
      console.log('-- error --');
      console.log(error);
      console.log(error.message);
      console.log('-- error --');
      return Promise.resolve({
        data: {
          success: false,
          msg: typeof error === 'string' ? error : error.message
        }
      });
    }
  );
  return instance;
};

// 基本返回数据格式
export interface BaseResponse<T> {
  success: boolean;
  data: T;
  msg?: string;
}

// 基本 Ajax 格式
interface BaseAjax {
  get: <T>(url: string, config?: object) => Promise<BaseResponse<T>>;
  delete: <T>(url: string, config?: object) => Promise<BaseResponse<T>>;
  head: <T>(url: string, config?: object) => Promise<BaseResponse<T>>;
  options: <T>(url: string, config?: object) => Promise<BaseResponse<T>>;
  post: <T>(url: string, data?: object, config?: object) => Promise<BaseResponse<T>>;
  put: <T>(url: string, data?: object, config?: object) => Promise<BaseResponse<T>>;
  patch: <T>(url: string, data?: object, config?: object) => Promise<BaseResponse<T>>;
}

// 获取一个 Ajax 实例
const GetAxios = () => {
  const instance: AxiosInstance = getAxiosInstance();
  const request = <T>(config: AxiosRequestConfig): Promise<BaseResponse<T>> => {
    return new Promise((resolve, reject) => {
      instance.request<BaseResponse<T>>(config).then((data) => {
        const __data = data.data || {};
        if (__data.success) {
          resolve(__data);
        } else {
          if (__data.msg) {
            message.error(__data.msg);
          }
          resolve(__data);
        }
      });
    });
  };

  // Ajax 实体
  const Ajax: BaseAjax = {
    get: function<T>(url: string, config: object = {}): Promise<BaseResponse<T>> {
      return request<T>(
        Object.assign({}, config, {
          method: 'GET',
          url: url
        })
      );
    },
    delete: function<T>(url: string, config: object = {}): Promise<BaseResponse<T>> {
      return request<T>(
        Object.assign({}, config, {
          method: 'DELETE',
          url: url
        })
      );
    },
    head: function<T>(url: string, config: object = {}): Promise<BaseResponse<T>> {
      return request<T>(
        Object.assign({}, config, {
          method: 'HEAD',
          url: url
        })
      );
    },
    options: function<T>(url: string, config: object = {}): Promise<BaseResponse<T>> {
      return request<T>(
        Object.assign({}, config, {
          method: 'OPTIONS',
          url: url
        })
      );
    },
    post: function<T>(url: string, data: object = {}, config: object = {}): Promise<BaseResponse<T>> {
      return request<T>(
        Object.assign({}, config, {
          method: 'POST',
          url: url,
          data: data
        })
      );
    },
    put: function<T>(url: string, data: object = {}, config: object = {}): Promise<BaseResponse<T>> {
      return request<T>(
        Object.assign({}, config, {
          method: 'PUT',
          url: url,
          data: data
        })
      );
    },
    patch: function<T>(url: string, data: object = {}, config: object = {}): Promise<BaseResponse<T>> {
      return request<T>(
        Object.assign({}, config, {
          method: 'PATCH',
          url: url,
          data: data
        })
      );
    }
  };

  return Ajax;
};

export const Ajax: BaseAjax = GetAxios();

export default GetAxios;
