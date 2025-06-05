// src/App.jsx
import React from "react";
import AddUser from "./pages/AddUser";
import UserList from "./pages/UserList";

function App() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <AddUser />
      <hr className="my-6" />
      <UserList />
    </div>
  );
}

export default App;
