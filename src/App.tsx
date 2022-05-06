import React from 'react';
import logo from './logo.svg';
import './App.css';
import useJsonApi from "./hooks/useJsonApi";
import jsonApi from "./services/json-api";
import useJsonApiOnLoad from "./hooks/useJsonApiOnLoad";
import retriableJsonApi from "./services/retriable-json-api";
import jsonApiResponseLogger from "./services/json-api-response-logger";

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

const App = () => {

  // const {callApi, responseBody} = useJsonApi(jsonApi("https://reqres.in/api/users?delay=2&page=1"))

  // const retriableApi = retriableJsonApi(2000, 5, (response) => !!response.metadata?.ok)
  // const {callApi, responseBody} = useJsonApi(retriableApi(jsonApi('https://reqres.in/api/users?delay=2&page=1')))
  // const {responseBody} = useJsonApiOnLoad(useJsonApi(retriableApi(jsonApi('https://reqres.in/api/users?delay=2&page=1'))))

  // const {responseBody} = useJsonApiOnLoad(useJsonApi(jsonApi("https://reqres.in/api/users?delay=2&page=1")))

  const {callApi, responseBody} = useJsonApi(jsonApiResponseLogger(jsonApi("https://reqres.in/api/users?delay=2&page=1")))

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Users
          </p>
          <button onClick={callApi}>Fetch users</button>
          {
            (responseBody as Response)?.data?.map(u => {
              return (
                  <div key={u.id}>
                    <p>Name: {u.first_name} {u.last_name}</p>
                    <p>Email: {u.email}</p>
                  </div>
              )
            })
          }
        </header>
      </div>
  );
}

export default App;
