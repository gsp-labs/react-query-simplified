import {UseJsonApi} from "../useJsonApi";
import {useState} from "react";

export type ApiStates = {
  loading: boolean;
}

const useJsonApiStates = (useJsonApi: UseJsonApi): ApiStates & UseJsonApi => {
  const {callApi, body, metadata} = useJsonApi
  const [loading, setLoading] = useState(false)

  const callApiWithStates = async (input: RequestInfo, init?: RequestInit) => {
    setLoading(true)
    await callApi(input, init)
    setLoading(false)
  }

  return {
    callApi: (input: RequestInfo, init?: RequestInit) => callApiWithStates(input, init),
    body,
    metadata,
    loading,
  }
}

export default useJsonApiStates