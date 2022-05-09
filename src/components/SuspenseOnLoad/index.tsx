import {Api, ApiResponse} from "../../services/json-api";
import React from "react";
import useJsonApi from "../../hooks/useJsonApi";
import useJsonApiStates from "../../hooks/useJsonApiStates";
import useJsonApiOnLoad from "../../hooks/useJsonApiOnLoad";

type Props = {
  api: Api;
  LoadingComponent: React.ElementType
  Component: (props: ApiResponse) => React.ReactElement;
}

const SuspenseOnLoad = ({ api, LoadingComponent, Component }: Props) => {
  const {body, loading, metadata} = useJsonApiOnLoad(useJsonApiStates(useJsonApi(api)))

  return (
      <>
        {loading && <LoadingComponent />}
        {body && <Component body={body} metadata={metadata}/>}
      </>
  );
}

export default SuspenseOnLoad