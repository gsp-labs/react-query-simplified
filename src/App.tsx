import React from 'react';
import logo from './logo.svg';
import './App.css';
import useJsonApi from "./hooks/useJsonApi";
import jsonApi from "./services/json-api";
import useJsonApiOnLoad from "./hooks/useJsonApiOnLoad";
import retriableJsonApi from "./services/retriable-json-api";
import jsonApiResponseLogger from "./services/json-api-response-logger";
import useJsonApiStates from "./hooks/useJsonApiStates";
import SuspenseOnTrigger from "./components/SuspenseOnTrigger";
import SuspenseOnLoad from "./components/SuspenseOnLoad";

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

  // const {callApi, body} = useJsonApi(jsonApi("https://reqres.in/api/users?delay=2&page=1"))

  const retriableApi = retriableJsonApi(100, 5, (response) => !!response.metadata?.ok)
  // const {callApi, body} = useJsonApi(retriableApi(jsonApi('https://reqres.in/api/users?delay=2&page=1')))
  // const {body} = useJsonApiOnLoad(useJsonApi(retriableApi(jsonApi('https://reqres.in/api/users?delay=2&page=1'))))

  // const {body} = useJsonApiOnLoad(useJsonApi(jsonApi("https://reqres.in/api/users?delay=2&page=1")))

  // const {callApi, body} = useJsonApi(jsonApiResponseLogger(jsonApi("https://reqres.in/api/users?delay=2&page=1")))

  // const {callApi, body, loading, metadata} = useJsonApiStates(useJsonApi(jsonApi("https://reqres.in/api/users?delay=2&page=1")))
  // console.log(loading, body)

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Users
          </p>
          {/*<button onClick={callApi}>Fetch users</button>*/}
          {/*<UserData body={body}/>*/}

          {/*<SuspenseOnTrigger*/}
          {/*    api={retriableApi(jsonApi("https://reqres.in/api/users?delay=2&page=1"))}*/}
          {/*    LoadingComponent={() => <div>Loading users ...</div>}*/}
          {/*    Component={({body}) => <UserData body={body}/>}*/}
          {/*    Trigger={({callApi, loading}) => <button onClick={callApi} disabled={loading}>Fetch users</button>}*/}
          {/*/>*/}

          <SuspenseOnLoad
              api={retriableApi(jsonApi("https://reqres.in/api/users?delay=2&page=1"))}
              LoadingComponent={() => <div>Loading users ...</div>}
              Component={({body}) => <UserData body={body}/>}
          />
        </header>
      </div>
  );
}

export default App;
