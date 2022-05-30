import React from 'react';
import logo from './logo.svg';
import './App.css';
import useJsonApi from "./hooks/useJsonApi";
import useJsonApiOnLoad from "./hooks/useJsonApiOnLoad";
import retriableJsonApiClient from "./services/retriable-json-api-client";
import jsonApiLoggerClient from "./services/json-api-logger-client";
import useJsonApiStates from "./hooks/useJsonApiStates";
import SuspenseOnTrigger from "./components/SuspenseOnTrigger";
import SuspenseOnLoad from "./components/SuspenseOnLoad";
import exponentialBackoffRetriableJsonApiClient from "./services/exponential-backoff-retriable-json-api-client";
import jsonApiClient from "./services/json-api-client";
import useAuthorisedJsonApi from "./hooks/useAuthorisedJsonApi";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

type Response = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

const UserData = ({body}: {body?: Response}) => {
  return (
      <>
        {
          body?.data?.map(u => {
            return (
                <div key={u.id}>
                  <p>Name: {u.first_name} {u.last_name}</p>
                  <p>Email: {u.email}</p>
                </div>
            )
          })
        }
      </>
  )
}

const App = () => {

  // const {callApi, body} = useJsonApi(jsonApiClient())

  const expoBackoffRetriableApi = exponentialBackoffRetriableJsonApiClient(100, 5,(response) => !!response.metadata?.ok)
  const {callApi, body} = useJsonApi(expoBackoffRetriableApi(jsonApiClient()))
  // const {body} = useJsonApiOnLoad(useJsonApi(jsonApiLoggerClient(expoBackoffRetriableApi(jsonApiClient()))), 'https://reqres.in/api/users?delay=2&page=1')

  // const {body} = useJsonApiOnLoad(useJsonApi(jsonApiClient()), "https://reqres.in/api/users?delay=2&page=1")

  // const {callApi, body} = useJsonApi(jsonApiLoggerClient(jsonApiClient()))

  // const {callApi, body, loading, metadata} = useJsonApiStates(useJsonApi(jsonApiClient()))
  // console.log(loading, body, metadata)

    // const {callApi, body} = useAuthorisedJsonApi(useJsonApi(jsonApiLoggerClient(jsonApiClient())))
  
  // const {body} = useJsonApiOnLoad(useAuthorisedJsonApi(useJsonApi(jsonApiLoggerClient(jsonApiClient()))), "https://reqres.in/api/users?delay=2&page=1", {
  //   headers: {
  //     "X_TEST": "VALUE"
  //   }
  // })


  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Users
          </p>
          {/*<button onClick={() => callApi("https://reqres.in/api/users?delay=2&page=1", {*/}
          {/*  headers: {*/}
          {/*    "X_TEST": "VALUE"*/}
          {/*  }*/}
          {/*})}>Fetch users</button>*/}
          {/*<UserData body={body}/>*/}

          {/*<SuspenseOnTrigger*/}
          {/*    api={retriableApi(jsonApiClient())}*/}
          {/*    LoadingComponent={() => <div>Loading users ...</div>}*/}
          {/*    Component={({body}) => <UserData body={body}/>}*/}
          {/*    Trigger={({callApi, loading}) => <button onClick={() => callApi("https://reqres.in/api/users?delay=2&page=1")} disabled={loading}>Fetch users</button>}*/}
          {/*/>*/}

          <SuspenseOnLoad
              client={jsonApiLoggerClient(expoBackoffRetriableApi(jsonApiClient()))}
              LoadingComponent={() => <div>Loading users ...</div>}
              Component={({body}) => <UserData body={body}/>}
              input="https://reqres.in/api/users?delay=2&page=1"
          />
        </header>
      </div>
  );
}

export default App;
