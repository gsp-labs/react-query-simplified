import React from 'react';
import logo from './logo.svg';
import './App.css';
import useJsonApi from "./hooks/useJsonApi";

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

  const {callApi, responseBody} = useJsonApi("https://reqres.in/api/users?delay=2&page=1")

  // const {responseBody} = useJsonApiOnLoad(useJsonApi("https://reqres.in/api/users?delay=2&page=1"))

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
