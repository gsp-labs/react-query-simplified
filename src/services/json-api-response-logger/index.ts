import {Api} from "../json-api";

const jsonApiResponseLogger = (api: Api): Api => {

  const loggableApi = async () => {
    const response = await api.invoke()
    console.log('[Response metadata]', response.metadata)
    console.log('[Response body]', response.body)
    return response;
  }

  return {
    invoke: () => loggableApi(),
  }
}

export default jsonApiResponseLogger