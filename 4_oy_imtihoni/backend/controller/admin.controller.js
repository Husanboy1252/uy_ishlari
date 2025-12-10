const { read_file, write_file } = require("../fs/file-manager");

// admin tayinlash

const SuperAdmin = async (req, res) => {
  try {
    const malumot = read_file("user.json");
    const { id } = req.params;

    const topilgan_Shaxs = malumot.find((bolak) => bolak.id === id);
    const { role } = req.body;

    if (!topilgan_Shaxs) {
      return res.status(404).json({
        message: "ID bo'yicha malumot topilmadi",
      });
    }

    if (!role) {
      return res.status(404).json({
        message: "Malumot topilmadi",
      });
    }

    malumot.forEach((bolak) => {
      if (bolak.id === id) {
        bolak.role = role ? role : bolak.role;
      }
    });

    write_file("user.json", malumot);
    res.status(201).json({
      message: "Adminga tayinlandid",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
    SuperAdmin
}