export type ApiResponse = {
  body: any;
  metadata?: Response
}

const makeApiCall = async (input: RequestInfo, init?: RequestInit): Promise<ApiResponse> => {
  const response: Response = await fetch(input, init)
  const responseBody = await response.json()

  return {
    body: responseBody,
    metadata: response
  }
}

export type ApiParams = {
  input: RequestInfo;
  init?: RequestInit
}

export type Client = {
  invoke: (input: RequestInfo, init?: RequestInit) => Promise<ApiResponse>
}

const jsonApiClient = (): Client => ({
  invoke: (input: RequestInfo, init?: RequestInit) => makeApiCall(input, init)
})

export default jsonApiClient