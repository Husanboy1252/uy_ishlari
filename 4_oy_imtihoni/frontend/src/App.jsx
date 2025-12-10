import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [todo_item, setTodo_item] = useState("");
  const [editId, setEditId] = useState(null);
  const [chekt, setChekt] = useState();
  const [id_Todo, setId_Todo] = useState(null);

  // console.log(chekt);

  // reset

  const reset = () => {
    setEditId(null);
    setTodo_item("");
  };

  
  // get
  
  const getData = () => {
    fetch("http://localhost:4023/get_all_todo", {
      method: "GET",
      headers: {
        // chekts: chekt,
        authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((info) => setData(info))
      .catch((error) => console.log(error.message));
    };

    // add
    
    const addData = (event) => {
      event.preventDefault();
    if (editId) {
      fetch("http://localhost:4023/update_todo/" + editId, {
        method: "PUT",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          todo_item,
        }),
      })
        .then((res) => res.json())
        .then((info) => {
          toast(info.message);
          getData();
          reset();
        })
        .catch((error) => console.log(error.message));
      } else {
        fetch("http://localhost:4023/add_todo", {
          method: "POST",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            "Content-type": "application/json",
        },
        body: JSON.stringify({
          todo_item,
        }),
      })
        .then((res) => res.json())
        .then((info) => {
          toast(info.message);
          getData();
          reset();
        })
        .catch((error) => console.log(error.message));
      }
    };
    
  // update

  const updateTodo = (item) => {
    setEditId(item.id);
    setTodo_item(item.todo_item);
  };
  
  // delete
  
  const deleteTodo = (id) => {
    fetch("http://localhost:4023/delete_todo/" + id, {
      method: "DELETE",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((info) => {
        toast(info.message);
        getData();
      })
      .catch((error) => console.log(error.message));
    };
    
    // register
    
    const register = (event) => {
      event.preventDefault();
      fetch("http://localhost:4023/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
    .then((res) => res.json())
    .then((info) => {
      toast(info.message);
      getData();
      reset();
    })
    .catch((error) => console.log(error.message));
  };
  
  useEffect(() => {
    getData();
  }, []);
  
//   // fetch

//   const fetchTodo_Data = (id) => {
//     data.map((user) => user.todo_list.map((todo) => setId_Todo(todo.id)));
// middlwer(id)
//   };
  
//   const middlwer = (id) => {

//       chektDelete(chekt, id)
    
//   }

//   // chektDelete
  
//   const chektDelete = (chekt, id) => {
//     if (!chekt) {
//       fetch("http://localhost:4023/delete_todo/" + id, {
//         method: "DELETE",
//         headers: {
//           authorization: "Bearer " + localStorage.getItem("token"),
//           "Content-type": "application/json",
//         },
//       })
//         .then((res) => res.json())
//         .then((info) => {
//           toast(info.message);
//           getData();
//           reset();
//         })
//         .catch((error) => console.log(error.message));
//     }
//   };



  return (
    <div>
      <div className="glabal-objekt">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* register  */}
        <div className="register-login">
          {/* <button className="btn-register">Register</button> */}

          <button className="btn-register">Register</button>
          {}
          <h1 className="person-name">TODO</h1>
          <button className="btn-login">Login</button>

          {/* <button className="btn-login">Login</button> */}
        </div>
        <div className="bar-input">
          <form onSubmit={register}>
            <input
              className="input-bar"
              type="text"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input-bar-email"
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input-bar"
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-reg-log-sender">Send</button>
          </form>
        </div>
        {/* register  */}
        {/* todo list */}
        <div className="body-item">
          <h1 className="todo-list-h1">TODOLIST</h1>
          <div className="input-body">
            <form onSubmit={addData}>
              <button
                className="btn-reset-todo-list"
                type="button"
                onClick={() => reset()}
              >
                Reset
              </button>
              <input
                type="text"
                className="input-new-input"
                placeholder="what needs to be done?"
                value={todo_item}
                onChange={(e) => setTodo_item(e.target.value)}
              />
              <button type="submit" className="btn-new-input">
                {editId ? "✏️" : "+"}
              </button>
            </form>
          </div>

          {/* <div className="bottom-chekit-input-edit-delete"> */}
          {data.map((user) =>
            user.todo_list.map((todo, index) => (
              <div key={index} className="bottom-chekit-input-edit-delete">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  value={chekt}
                  onChange={(e) => setChekt(e.target.checked)}
                />
                <h1 className="input-output-windov">{todo.todo_item.slice(0, 45) + "..."}</h1>
                <button className="btn-edit" onClick={() => updateTodo(todo)}>
                  ✏️
                </button>
                <button
                  className="btn-delete"
                  onClick={() => deleteTodo(todo.id)}
                >
                  x
                </button>
              </div>
            ))
          )}
          {/* </div> */}
          <div className="output-remove-cheket">
            <output className="output-cheket">5/3</output>
            <button
              className="remove-cheket"
            >
              Remove chacked x
            </button>
          </div>
        </div>
        {/* todo list */}
      </div>
    </div>
  );
}

export default App;
