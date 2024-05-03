import { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddUser from "./add-user";
import Users from "./users";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<AddUser />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Fragment>
  );
}

export default App;
