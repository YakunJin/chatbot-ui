/* eslint-disable */


export const requestInterceptor = function(config) {
  return config
}

export const requestInterceptorError = function(error) {
  return Promise.reject(error)
}

export const responseInterceptor = function(response) {
  const data = response.data || { code: undefined }
  const code = data.code
  // if (code && code !== BusinessCode.Success) {
  //   throw new Error(data.msg)
  // }

  return response
}
export const responseInterceptorError = function(error) {
  return Promise.reject(error)
}
