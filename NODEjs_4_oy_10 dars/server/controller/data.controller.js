const { read_file, write_file } = require("../fs/file-manager");
const {v4} = require("uuid")


const get_All_data = async (req, res) => {
  try {
    const fileData = read_file("data.json")
    res.satus(200).json(fileData)
  } catch (error) {
    console.log(error.message);
  }
};

const add_Data = async (req, res) => {
  try {
    const { titel,price,count} =req.body
     const fileData = read_file("data.json")

     fileData.push({
        id: v4(),
        titel,
        price,
        count
     })

     write_file("data.json", fileData)
     res.satus(201).json({
        mesagge: "Addeed new data"
     })
  } catch (error) {
    console.log(error.message);
  }
};

const get_one_data = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};

const update_data = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};

const delete_data = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  get_All_data,
  add_Data,
  get_one_data,
  update_data,
  delete_data,
};
