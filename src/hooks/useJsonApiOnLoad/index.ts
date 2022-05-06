import {useCallback, useEffect} from "react";
import {ApiResponse} from "../../services/json-api";
import {UseJsonApi} from "../useJsonApi";

const useJsonApiOnLoad = (useJsonApi: UseJsonApi): ApiResponse => {
  const { callApi, metadata, body } = useJsonApi

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedApi = useCallback(() => callApi(), [])

  useEffect(() => {
    (async function fetchData() {
      await memoizedApi()
    })()
  }, [memoizedApi]);

  return {
    metadata,
    body
  }
}

export default useJsonApiOnLoad