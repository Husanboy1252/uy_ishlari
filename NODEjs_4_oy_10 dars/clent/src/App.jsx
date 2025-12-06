import { useState, useEffect } from "react";

function App() {
  // huc, ilmoq
  const [data, setData] = useState([]);
  const [title, setTitel] = useState("");
  const [price, setprice] = useState("");
  const [count, setcount] = useState("");

  const getData = () => {
    fetch("http://localhost:3003/get_All_data")
      .then((res) => res.json())
      .then((info) => setData(info));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <h1>Add date</h1>
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="title..."
          value={title}
          
        />
        <input
          type="number"
          className="form-control"
          placeholder="price..."
          value={price}
        />
        <input
          type="number"
          className="form-control"
          placeholder="count..."
          value={count}
        />
        <button className="btn btn primary" typeof="submit">
          Send
        </button>
      </form>
      <h1>Data list</h1>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              <title></title>
            </th>
            <th scope="col">price</th>
            <th scope="col">count</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      {data.map((item, index) => (
        <tr scope="row" key={index}>
          <th>{}index + 1</th>
          <td>{item.title}</td>
          <td>{item.price}</td>
          <td>{item.count}</td>
        </tr>
      ))}
    </div>
  );
}

export default App;
