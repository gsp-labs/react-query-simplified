import {RetryUntil} from "../retriable-json-api";
import {Api, ApiResponse} from "../json-api";

const exponentialBackoffRetriableJsonApi = (start: number, retryCount: number, retryUntil: RetryUntil) => (api: Api): Api  => {

  const retryApi = async (attempt: number, resolve: (value: (PromiseLike<ApiResponse> | ApiResponse)) => void) => {
    const response = await api.invoke()
    if(attempt < retryCount && retryUntil(response)) {
      setTimeout(() => retryApi(attempt + 1, resolve), Math.pow(2, attempt) * start)
    } else {
      resolve(response)
    }
  }

  return {
    invoke: () => new Promise<ApiResponse>(resolve => retryApi(0, resolve)),
  }
}

export default exponentialBackoffRetriableJsonApi
