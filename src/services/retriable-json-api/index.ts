import {Api, ApiResponse} from "../json-api";

export type RetryUntil = (apiResponse: ApiResponse) => boolean

const retriableJsonApi = (duration: number, retryCount: number, retryUntil: RetryUntil) => (api: Api): Api => {

  const retryApi = async (count: number, resolve: (value: (PromiseLike<ApiResponse> | ApiResponse)) => void) => {
    const response = await api.invoke()
    if(count < retryCount && retryUntil(response)) {
      setTimeout(() => retryApi(count + 1, resolve), duration)
    } else {
      resolve(response)
    }
  }

  return {
    invoke: () => new Promise<ApiResponse>(resolve => retryApi(1, resolve)),
  }
}

export default retriableJsonApi