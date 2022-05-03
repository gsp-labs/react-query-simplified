import {useCallback, useState} from "react";

export type JsonApi = {
  callApi: () => Promise<void>;
  responseBody: any;
  metadata?: Response
}

type UseApi = (input: RequestInfo, init?: RequestInit) => JsonApi

const useJsonApi: UseApi = (input: RequestInfo, init?: RequestInit) => {
  const [responseBody, setResponseBody] = useState<any>()
  const [metadata, setMetadata] = useState<Response>()

  const callApi = async () => {
      const response: Response = await fetch(input, init)
      const responseBody = await response.json()
      setResponseBody(responseBody)
      setMetadata(response)
  }

  return {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    callApi: useCallback(() => callApi(), []),
    responseBody,
    metadata,
  }
}

export default useJsonApi