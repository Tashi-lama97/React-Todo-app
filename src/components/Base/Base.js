import React, { useState } from "react";
import Add from "../forms/Add";
import Edit from "../forms/Edit";
import List from "../list/List";
import { ToastProvider } from "react-toast-notifications";

import "./base.css";

const Base = () => {
  const [reloader, setReloader] = useState(false);
  const [id, setId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const reload = () => {
    setReloader(!reloader);
  };

  const editTodo = (data) => {
    setId(data);
    setIsEdit(true);
  };

  const resetEdit = () => {
    setIsEdit(false);
  };

  return (
    <ToastProvider>
      <section className="container">
        <div className="componentSection">
          <List reloader={reloader} reload={reload} editTodo={editTodo} />
        </div>
        <div className="componentSection">
          {isEdit === true ? (
            <Edit reload={reload} id={id} resetEdit={resetEdit} />
          ) : (
            <Add reload={reload} />
          )}
        </div>
      </section>
    </ToastProvider>
  );
};

export default Base;
