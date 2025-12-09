const { read_file, write_file } = require("../fs/file-manager");
const { v4 } = require("uuid");

const get_All_data = async (req, res) => {
  try {
    const fileData = read_file("data.json");
    res.status(200).json(fileData);
  } catch (error) {
    console.log(error.message);
  }
};

const add_data = async (req, res) => {
  try {
    const { title, price, count } = req.body;
    const fileData = read_file("data.json");

    fileData.push({
      id: v4(),
      title,
      price,
      count,
    });

    write_file("data.json", fileData);
    res.status(201).json({
      mesagge: "Addeed new data",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const get_one_data = async (req, res) => {
  try {
    const { id } = req.params;

    const fileData = read_file("data.json");
    const foundedData = fileData.find((item) => item.id === id);
    if (!foundedData) {
      return res.status(404).json({
        message: "Data not found",
      });
    }
    res.status(200).json(foundedData);
  } catch (error) {
    console.log(error.message);
  }
};

const update_data = async (req, res) => {
  try {
    const { title, price, count } = req.body;
    const { id } = req.params;

    const fileData = read_file("data.json");
    const foundedData = fileData.find((item) => item.id === id);
    if (!foundedData) {
      return res.status(404).json({
        message: "Data not found",
      });
    }

    fileData.forEach((item) => {
      if (item.id === id) {
        item.title = title ? title : item.title;
        item.price = price ? price : item.price;
        item.count = count ? count : item.count;
      }
    });
    write_file("data.json", fileData);
    res.status(201).json({
      mesagge: "Updated data",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const delete_data = async (req, res) => {
  try {
    const { id } = req.params;
    const fileData = read_file("data.json");

    const foundedData = fileData.find((item) => item.id === id);
    if (!foundedData) {
      return res.status(404).json({
        message: "Data not found",
      });
    }

    fileData.forEach((item, idx) => {
      if (item.id === id) {
     fileData.splice(idx, 1)
      }
    });
    write_file("data.json", fileData);
    res.status(201).json({
      mesagge: "Deleted data",
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  get_All_data,
  add_data,
  get_one_data,
  update_data,
  delete_data,
};
