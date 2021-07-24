import React, { useEffect, useState } from "react";
import { useToasts, ToastProvider } from "react-toast-notifications";
import "./edit.css";

const Edit = ({ reload, id, resetEdit }) => {
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(null);

  const { addToast } = useToasts();

  const markComplete = (status) => {
    setCompleted(status);
  };

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
      list[id] = { text, completed };
      window.localStorage.setItem("list", JSON.stringify(list));
    }

    addToast("Todo Successfully Updated", {
      appearance: "success",
      autoDismissTimeout: 5000,
      autoDismiss: true,
    });

    setText("");

    resetEdit();

    reload();
  };

  useEffect(() => {
    if (window.localStorage && window.localStorage.getItem("list")) {
      let list = JSON.parse(window.localStorage.getItem("list"));

      setText(list[id].text);
      setCompleted(list[id].completed);
    }
  }, [id]);

  return (
    <ToastProvider>
      <section className="addFormSection">
        <h4 className="heading">Update Item</h4>
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
        <div className="editCompleted">
          <p className="completedText">Completed :</p>
          <button
            className={
              completed === false
                ? "buttonEdit disabledComplete"
                : "buttonEdit activeComplete"
            }
            disabled={completed === true ? true : false}
            onClick={() => {
              markComplete(true);
            }}
          >
            Completed
          </button>
          <button
            className={
              completed === true
                ? "buttonEdit disabledIncomplete"
                : "buttonEdit activeIncomplete"
            }
            disabled={completed === false ? true : false}
            onClick={() => {
              markComplete(false);
            }}
          >
            Incomplete
          </button>
        </div>
      </section>
    </ToastProvider>
  );
};

export default Edit;
