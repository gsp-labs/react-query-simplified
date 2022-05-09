import {useCallback, useEffect} from "react";
import {ApiResponse} from "../../services/json-api";
import {UseJsonApi} from "../useJsonApi";

const useJsonApiOnLoad = <T extends UseJsonApi>(useJsonApi: T): ApiResponse & Omit<T, keyof UseJsonApi> => {
  const { callApi, metadata, body, ...rest } = useJsonApi

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedApi = useCallback(() => callApi(), [])

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