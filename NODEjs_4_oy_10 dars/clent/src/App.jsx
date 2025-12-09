import { useState, useEffect } from "react";
import "./index.css"
function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setprice] = useState("");
  const [count, setcount] = useState("");
 const [editId, setEditId] =useState(null)
  
// get
  const getData = () => {
    fetch("http://localhost:3000/get_All_data")
      .then((res) => res.json())
      .then((info) => setData(info))
      .catch((error) => console.log(error.message));
  }

  // delete

  
const deletData = (id) =>{
     fetch("http://localhost:8000/delete_data", {
      method: "DELETE",
       headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((info) => {
        alert(info.message)
        getData()
      })
      .catch((error) => console.log(error.message));
}
//add 
  const addData = (event) => {
    event.preventDefault()
   if(editId) {
 fetch("http://localhost:8000/update_data/" +editId,{
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        count,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        alert(info.message)
        getData()
      })
      .catch((error) => console.log(error.message));
   }else{
     fetch("http://localhost:8000/add_data", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        count,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        alert(info.message)
        getData()
      })
      .catch((error) => console.log(error.message));
   }
  }

  useEffect(() => {
    getData();
  }, []);


  // edit
const handleEdit =(item) => {
setEditId(item.id)
  setTitle(item.title)
  setprice(item.price)
  setcount(item.count)
}
const reset =() =>{
  setEditId(null)
  setTitle("")
  setprice("")
  setcount("")
}
  return (
    <div className="container">
      <h1 className="mt-5 mb-5">Add date</h1>
      <form className="mt-5 mb-5" onSubmit={addData}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-3"
          placeholder="price..."
          value={price}
          onChange={(e) => setprice(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          placeholder="count..."
          value={count}
          onChange={(e) => setcount(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
        {editId ?"Updete":"Send"}
        </button>
        <button className="btn btn-primary" type="button"onClick={()=>reset()}>
        RESET
        </button>
      </form>
      <h1>Data list</h1>

      <table className="table mb-5 pb-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">price</th>
            <th scope="col">count</th>
              <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr scope="row" key={index} className="tr">
              <th>{index + 1}</th>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.count}</td>
              <td><button className="btn btn-worning" onClick={()=> handleEdit (item)}>edit</button></td>
              <td><button className="btn btn-danger" onClick={() =>deletData(item.id)}>delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;