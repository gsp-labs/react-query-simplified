import {JsonApi} from "../useJsonApi";
import {useEffect} from "react";

const useJsonApiOnLoad = (jsonApi: JsonApi): JsonApi => {
  const { callApi, responseBody, metadata } = jsonApi

  useEffect(() => {
    (async function fetchData() {
      await callApi()
    })()
  }, [callApi]);

  return {
    callApi,
    responseBody,
    metadata
  }
}

export default useJsonApiOnLoad