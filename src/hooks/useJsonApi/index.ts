import {useState} from "react";
import {Api, ApiResponse} from "../../services/json-api";

type CallApi = {
  callApi: () => Promise<void>;
}

export type UseJsonApi = CallApi & ApiResponse

const useJsonApi = (api: Api): UseJsonApi => {
  const [responseBody, setResponseBody] = useState<any>()
  const [metadata, setMetadata] = useState<Response>()

  const callApi = async () => {
      const response = await api.invoke()
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