import {Api, ApiResponse} from "../json-api";

type RetryUntil = (apiResponse: ApiResponse) => boolean

const retriableJsonApi = (duration: number, retryCount: number, retryUntil: RetryUntil) => (api: Api): Api => {

  const retryApi = async (count: number) => {
    const response = await api.invoke()
    if(count < retryCount && retryUntil(response)) {
      setTimeout(() => retryApi(count + 1), duration)
    }
    return response
  }

  return {
    invoke: () => retryApi(1),
  }
}

export default retriableJsonApi