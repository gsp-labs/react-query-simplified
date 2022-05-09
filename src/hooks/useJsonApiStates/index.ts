import {UseJsonApi} from "../useJsonApi";
import {useState} from "react";

export type ApiStates = {
  loading: boolean;
}

const useJsonApiStates = (useJsonApi: UseJsonApi): ApiStates & UseJsonApi => {
  const {callApi, body, metadata} = useJsonApi
  const [loading, setLoading] = useState(false)

  const callApiWithStates = async () => {
    setLoading(true)
    await callApi()
    setLoading(false)
  }

  return {
    callApi: () => callApiWithStates(),
    body,
    metadata,
    loading,
  }
}

export default useJsonApiStates