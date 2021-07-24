import React, { useState } from "react";
import { useToasts, ToastProvider } from "react-toast-notifications";
import { nanoid } from "nanoid";
import "./add.css";

const Add = ({ reload }) => {
  const [text, setText] = useState("");

  const { addToast } = useToasts();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      addToast("Field is empty please add some data", {
        appearance: "info",
        autoDismissTimeout: 5000,
        autoDismiss: true,
      });
      return;
    }

    if (window.localStorage && window.localStorage.getItem("list")) {
      let list = JSON.parse(window.localStorage.getItem("list"));
      list[nanoid()] = { text, completed: false };
      window.localStorage.setItem("list", JSON.stringify(list));
    } else {
      if (window.localStorage) {
        let data = {};
        data[nanoid()] = { text, completed: false };
        window.localStorage.setItem("list", JSON.stringify(data));
      }
    }

    addToast("Todo Successfully Added", {
      appearance: "success",
      autoDismissTimeout: 5000,
      autoDismiss: true,
    });

    setText("");

    reload();
  };

  return (
    <ToastProvider>
      <section className="addFormSection">
        <h4 className="heading">Add Item</h4>
        <form onSubmit={formSubmitHandler} className="addForm">
          <input
            className="addInput"
            value={text}
            placeholder="Enter Task"
            onChange={(e) => setText(e.target.value)}
          />
          <button className="addButton" type="submit">
            +
          </button>
        </form>
      </section>
    </ToastProvider>
  );
};

export default Add;
