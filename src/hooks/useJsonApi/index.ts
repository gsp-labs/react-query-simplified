import {useState} from "react";
import {Api} from "../../services/json-api";

export type UseJsonApi = {
  callApi: () => Promise<void>;
  responseBody: any;
  metadata?: Response
}

const useJsonApi = (api: Api) => {
  const [responseBody, setResponseBody] = useState<any>()
  const [metadata, setMetadata] = useState<Response>()

  const callApi = async () => {
      const response = await api.invoke()
      setResponseBody(response.body)
      setMetadata(response.metadata)
  }

  return {
    callApi: callApi,
    responseBody,
    metadata,
  }
}

export default useJsonApi