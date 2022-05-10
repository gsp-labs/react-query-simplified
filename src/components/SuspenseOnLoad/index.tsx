import {Client, ApiResponse, ApiParams} from "../../services/json-api-client";
import React from "react";
import useJsonApi from "../../hooks/useJsonApi";
import useJsonApiStates from "../../hooks/useJsonApiStates";
import useJsonApiOnLoad from "../../hooks/useJsonApiOnLoad";

type Props = {
  client: Client;
  LoadingComponent: React.ElementType
  Component: (props: ApiResponse) => React.ReactElement;
}

const SuspenseOnLoad = ({ client, input, init, LoadingComponent, Component }: Props & ApiParams) => {
  const {body, loading, metadata} = useJsonApiOnLoad(useJsonApiStates(useJsonApi(client)), input, init)

  return (
      <>
        {loading && <LoadingComponent />}
        {body && <Component body={body} metadata={metadata}/>}
      </>
  );
}

export default SuspenseOnLoad