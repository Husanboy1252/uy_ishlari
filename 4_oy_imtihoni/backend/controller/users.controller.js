const { read_file } = require("../fs/file-manager")

// get_all_users

const getAllUsers = async (req, res) => {
  try {
    const malumot = read_file("todo.json")
    res.status(200).json(malumot)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// get one user

const getOneUser = async (req, res) => {
  try {
    const {id} = req.params
    const malumot = read_file("todo.json")

    const topilgan_Shaxs = malumot.find((bolak) => bolak.id === id)

    if (!topilgan_Shaxs) {
      return res.status(404).json({
        message: "Bu ID ostida xechkim topilmadi"
      })
    }

    res.status(200).json(topilgan_Shaxs)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  getAllUsers,
  getOneUser
};
