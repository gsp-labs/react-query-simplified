import {Client} from "../json-api-client";

const jsonApiLoggerClient = (api: Client): Client => {

  const loggableApi = async (input: RequestInfo, init?: RequestInit) => {
    console.log('[Request]', input, init)
    const response = await api.invoke(input, init)
    console.log('[Response metadata]', response.metadata)
    console.log('[Response body]', response.body)
    return response;
  }

  return {
    invoke: (input: RequestInfo, init?: RequestInit) => loggableApi(input, init),
  }
}

export default jsonApiLoggerClient