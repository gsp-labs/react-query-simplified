import {useCallback, useEffect} from "react";
import {ApiResponse} from "../../services/json-api-client";
import {UseJsonApi} from "../useJsonApi";

const useJsonApiOnLoad = <T extends UseJsonApi>(useJsonApi: T, input: RequestInfo, init?: RequestInit): ApiResponse & Omit<T, keyof UseJsonApi> => {
  const { callApi, metadata, body, ...rest } = useJsonApi

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedApi = useCallback(() => callApi(input, init), [])

  useEffect(() => {
    (async function fetchData() {
      await memoizedApi()
    })()
  }, [memoizedApi]);

  return {
    metadata,
    body,
    ...rest
  }
}

export default useJsonApiOnLoad