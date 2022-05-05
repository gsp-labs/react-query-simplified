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

export type Api = {
  invoke: () => Promise<ApiResponse>
}

const jsonApi = (input: RequestInfo, init?: RequestInit): Api => ({
  invoke: () => makeApiCall(input, init)
})

export default jsonApi