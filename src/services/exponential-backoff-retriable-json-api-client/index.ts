import {RetryUntil} from "../retriable-json-api-client";
import {Client, ApiResponse} from "../json-api-client";

const exponentialBackoffRetriableJsonApiClient = (start: number, retryCount: number, retryUntil: RetryUntil) => (api: Client): Client  => {

  const retryApi = async (attempt: number, resolve: (value: (PromiseLike<ApiResponse> | ApiResponse)) => void, input: RequestInfo, init?: RequestInit) => {
    const response = await api.invoke(input, init)
    if(attempt < retryCount - 1 && retryUntil(response)) {
      setTimeout(() => retryApi(attempt + 1, resolve, input, init), Math.pow(2, attempt) * start)
    } else {
      resolve(response)
    }
  }

  return {
    invoke: (input: RequestInfo, init?: RequestInit) => new Promise<ApiResponse>(resolve => retryApi(0, resolve, input, init)),
  }
}

export default exponentialBackoffRetriableJsonApiClient
