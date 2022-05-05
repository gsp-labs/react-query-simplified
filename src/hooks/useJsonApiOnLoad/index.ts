import {UseJsonApi} from "../useJsonApi";
import {useCallback, useEffect} from "react";

const useJsonApiOnLoad = (useJsonApi: UseJsonApi): UseJsonApi => {
  const { callApi, responseBody, metadata } = useJsonApi

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedApi = useCallback(() => callApi(), [])

  useEffect(() => {
    (async function fetchData() {
      await memoizedApi()
    })()
  }, [memoizedApi]);

  return {
    callApi,
    responseBody,
    metadata
  }
}

export default useJsonApiOnLoad