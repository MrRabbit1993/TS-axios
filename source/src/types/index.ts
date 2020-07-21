//项目工程  所有公共的类型定义文件

export type Method = 'get' | 'GET' | 'post' | 'POST' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'put' | 'PUT' | 'patch' | 'PATCH'  //约束methosd

export interface AxixosRequestConfig {
    url: string
    method?: Method
    data?: any
    params?: any
}