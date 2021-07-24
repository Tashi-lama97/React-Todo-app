import React, { useState, useEffect } from "react";
import { useToasts, ToastProvider } from "react-toast-notifications";
import "./list.css";

const List = ({ reloader, reload, editTodo }) => {
  const [list, setList] = useState({});

  const { addToast } = useToasts();

  const markComplete = (key) => {
    list[key].completed = !list[key].completed;
    if (window.localStorage) {
      window.localStorage.setItem("list", JSON.stringify(list));

      addToast(
        `Todo Successfully Marked ${
          list[key].completed === true ? "Completed" : "Incomplete"
        }`,
        {
          appearance: "info",
          autoDismissTimeout: 5000,
          autoDismiss: true,
        }
      );

      reload();
    }
  };

  const deleteToDo = (key) => {
    const dis = window.confirm("Are you sure you want to delete Todo");
    if (dis === true) {
      delete list[key];
      if (window.localStorage) {
        window.localStorage.setItem("list", JSON.stringify(list));

        addToast("Todo Successfully Deleted", {
          appearance: "info",
          autoDismissTimeout: 5000,
          autoDismiss: true,
        });

        reload();
      }
    }
  };

  useEffect(() => {
    if (window.localStorage && window.localStorage.getItem("list")) {
      setList(JSON.parse(window.localStorage.getItem("list")));
    }
  }, [reloader]);

  return (
    <ToastProvider>
      <section className="listSection">
        <h4 className="heading">My Todo's</h4>
        <ul className="list">
          {Object.keys(list).length === 0 ? (
            <div className="noTodo">
              <p>No Todo's, Please Add Todo's</p>
            </div>
          ) : (
            Object.keys(list).map((key) => (
              <li className="listItems" key={key}>
                <div className="item itemLeftIcon">
                  <button
                    className={
                      list[key].completed === true
                        ? "button greenIcon"
                        : "button incompleteIcon"
                    }
                    onClick={() => {
                      markComplete(key);
                    }}
                  >
                    {list[key].completed === true ? (
                      <i className="far fa-check-circle "></i>
                    ) : (
                      <i className="far fa-times-circle"></i>
                    )}
                  </button>
                </div>
                <div className="item itemText">
                  <p
                    className={
                      list[key].completed === true ? "lineThrough" : "textLine"
                    }
                  >
                    {list[key].text}
                  </p>
                </div>
                <div className="item itemRightIcon">
                  <button
                    className="button blueIcon"
                    onClick={() => {
                      editTodo(key);
                    }}
                  >
                    <i className="fas fa-edit "></i>
                  </button>
                  <button
                    className="button redIcon"
                    onClick={() => deleteToDo(key)}
                  >
                    <i className="far fa-trash-alt "></i>
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </ToastProvider>
  );
};

export default List;
