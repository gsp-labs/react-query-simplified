import {Client, ApiResponse} from "../json-api-client";

export type RetryUntil = (apiResponse: ApiResponse) => boolean

const retriableJsonApiClient = (duration: number, retryCount: number, retryUntil: RetryUntil) => (api: Client): Client => {

  const retryApi = async (count: number, resolve: (value: (PromiseLike<ApiResponse> | ApiResponse)) => void, input: RequestInfo, init?: RequestInit) => {
    const response = await api.invoke(input, init)
    if(count < retryCount && retryUntil(response)) {
      setTimeout(() => retryApi(count + 1, resolve, input, init), duration)
    } else {
      resolve(response)
    }
  }

  return {
    invoke: (input: RequestInfo, init?: RequestInit) => new Promise<ApiResponse>(resolve => retryApi(1, resolve, input, init)),
  }
}

export default retriableJsonApiClient