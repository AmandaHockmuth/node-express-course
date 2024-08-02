require("dotenv");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const logon = async (req, res) => {
  const id = new Date().getDate(); //just for demo, normally provided by Mongoose
  const { name, password } = req.body;
  if (!name || !password) {
    throw new Error(
      `Please provide a name and a password: Status Code ${StatusCodes.BAD_REQUEST}`
    );
  }
  // @ts-ignore
  const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: `User ${req.body.name} Created Successfully.`, token });
};

const hello = async (req, res) => {
  res.send(`Hello ${req.user.name}! This is a Sandbox to play in.`);
};

module.exports = {
  logon,
  hello,
};
