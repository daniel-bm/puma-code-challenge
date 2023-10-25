// controller/userController.js
const userService = require('../service/userService');

const addUser = async (req, res) => {
  const { username } = req.body;
  const result = await userService.addUser(username);
  if (result.error) {
    res.status(400).json({ error: result.error });
  } else {
    res.status(201).json(result);
  }
};

const getAllUsers = (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
};

const deleteUser = (req, res) => {
  const { username } = req.params;
  const result = userService.deleteUser(username);
  if (result.error) {
    res.status(400).json({ error: result.error });
  } else {
    res.status(200).json(result);
  }
};

const toggleStar = (req, res) => {
  const { username } = req.params;
  const result = userService.toggleStar(username);
  if (result.error) {
    res.status(400).json({ error: result.error });
  } else {
    res.json(result);
  }
};

module.exports = {
  addUser,
  getAllUsers,
  deleteUser,
  toggleStar,
};
