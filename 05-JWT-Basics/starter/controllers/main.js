const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors/index");

const login = async (req, res) => {
  const id = new Date().getDate(); //just for demo, normally provided by Mongoose
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // @ts-ignore
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d", //keeping payload small=better UX
  });

  // console.log("Username: ", username,"Password: ", password);
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}.`,
    secret: `Access Successful. Your data is: Lucky Number ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
