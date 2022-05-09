import {Api, ApiResponse} from "../../services/json-api";
import React from "react";
import useJsonApiStates, {ApiStates} from "../../hooks/useJsonApiStates";
import useJsonApi, {CallApi} from "../../hooks/useJsonApi";

type Props = {
  api: Api;
  LoadingComponent: React.ElementType
  Component: (props: ApiResponse) => React.ReactElement;
  Trigger: (props: CallApi & ApiStates) => React.ReactElement;
}

const SuspenseOnTrigger = ({api, LoadingComponent, Component, Trigger}: Props) => {

  const {callApi, body, loading, metadata} = useJsonApiStates(useJsonApi(api))

  return (
      <>
        <Trigger callApi={callApi} loading={loading}/>
        {loading && <LoadingComponent />}
        {body && <Component body={body} metadata={metadata}/>}
      </>
  );
}

export default SuspenseOnTrigger