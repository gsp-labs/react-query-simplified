import {UseJsonApi} from "../useJsonApi";

const useAuthorisedJsonApi = (useJsonApi: UseJsonApi): UseJsonApi => {
  const { callApi, metadata, body } = useJsonApi

  // Fetch auth headers from some hook or local storage
  const authHeader = {
    "X_AUTH": "TOKEN_12345"
  }

  const authorisedCallApi = async (input: RequestInfo, init?: RequestInit) => {
    await callApi(input, {
      ...init,
      headers: {
        ...init?.headers,
        ...authHeader
      }
    })
  }

  return {
    callApi: authorisedCallApi,
    metadata,
    body,
  }
}

export default useAuthorisedJsonApi