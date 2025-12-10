const { read_file, write_file } = require("../fs/file-manager");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken")

// get

const get_all_Todo = async (req, res) => {
  try {
    const fileData = read_file("todo.json");

    //     const bearerToken = req.headers.authorization;
    // const token = bearerToken.split(" ");
    // const decode = jwt.verify(token[1], process.env.SECRET_KEY);

    // console.log(decode.username, "get all todo ichidan");

    res.status(200).json(fileData);
  } catch (error) {
    console.log(error.message, "b>C>td>get_all_t");
  }
};

// get one

const get_one_Todo = async (req, res) => {
  try {
    const { id } = req.params;
    const fielData = read_file("todo.json");

    const foundedTodo = fielData.find((item) => item.id === id);
    if (!foundedTodo) {
      return res.status(404).json({
        message: "Malumot topilmadi",
      });
    }
    res.status(200).json(foundedTodo);
  } catch (error) {
    console.log(error.message, "b>C>td>get_one_t");
  }
};

// add

const add_Todo = async (req, res) => {
  try {
    const { todo_item } = req.body;
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ");
    const decode = jwt.verify(token[1], process.env.SECRET_KEY);
    // console.log(decode.id, "addni ichidan");
    
    
    const fileData = read_file("todo.json");

    const foundedUserId = fileData.find((item) => item.id === decode.id)
    if (!foundedUserId) {
      return res.status(404).json({
        message: "Iltimos login qiling"
      })
    } 
    // console.log(foundedUserId.todo_list, "addning ichidan");
    

    foundedUserId.todo_list.push({
      id: v4(),
      todo_item,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    });
    write_file("todo.json", fileData);
    res.status(201).json({
      message: "Yangi malumot qo'shildi",
    });
  } catch (error) {
    console.log(error.message, "b>C>td>add_t");
  }
};

// update
const update_Todo = async (req, res) => {
  try {
    const { id } = req.params;
    const { todo_item } = req.body;

    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ");
    const decode = jwt.verify(token[1], process.env.SECRET_KEY);

    const fileData = read_file("todo.json");

    const user = fileData.find(u => u.id === decode.id);

    if (!user) {
      return res.status(404).json({
        message: "Iltimos login qiling"
      });
    }

    const todo = user.todo_list.find(t => t.id === id);

    if (!todo) {
      return res.status(404).json({
        message: "bu siznig Todoingiz emas"
      });
    }

    todo.todo_item = todo_item || todo.todo_item;
    todo.time = `${new Date().getHours()}:${new Date().getMinutes()}`;

    write_file("todo.json", fileData);

    res.status(201).json({
      message: "Todo qayta yangilandi"
    });

  } catch (error) {
    console.log(error.message, "b>C>td>upd_t");
  }
};

// delete

const delete_Todo = async (req, res) => {
  try {
    const { id } = req.params; 

    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ");
    const decode = jwt.verify(token[1], process.env.SECRET_KEY);

    const fileData = read_file("todo.json");

    const user = fileData.find(u => u.id === decode.id);

    if (!user) {
      return res.status(404).json({
        message: "Iltimos login qiling"
      });
    }

    const todoIndex = user.todo_list.findIndex(t => t.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({
        message: "bu siznig Todoingiz emas"
      });
    }

    user.todo_list.splice(todoIndex, 1);

    write_file("todo.json", fileData);

    res.status(200).json({
      message: "Todo o'chirildi"
    });

  } catch (error) {
    console.log(error.message, "delete_todo_error");
  }
};


module.exports = {
  get_all_Todo,
  get_one_Todo,
  add_Todo,
  update_Todo,
  delete_Todo,
};
