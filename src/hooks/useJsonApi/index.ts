import {useState} from "react";
import {Client, ApiResponse} from "../../services/json-api-client";

export type CallApi = {
  callApi: (input: RequestInfo, init?: RequestInit) => Promise<void>;
}

export type UseJsonApi = CallApi & ApiResponse

const useJsonApi = (api: Client): UseJsonApi => {
  const [responseBody, setResponseBody] = useState<any>()
  const [metadata, setMetadata] = useState<Response>()

  const callApi = async (input: RequestInfo, init?: RequestInit) => {
    setResponseBody(undefined)
    setMetadata(undefined)
    const response = await api.invoke(input, init)
    setResponseBody(response.body)
    setMetadata(response.metadata)
  }

  return {
    callApi: callApi,
    body: responseBody,
    metadata,
  }
}

export default useJsonApi