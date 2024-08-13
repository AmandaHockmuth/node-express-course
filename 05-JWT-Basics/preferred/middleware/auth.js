require("dotenv");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error(
      `No Token Provided: Status Code ${StatusCodes.UNAUTHORIZED}`
    );
  }
  const token = authHeader.split(" ")[1];
  //console.log(`Authorization : ${token}`);
  try {
    // @ts-ignore
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, name } = decoded;
    req.user = { id, name };
    //console.log(req.user);
    next();
  } catch (error) {
    throw new Error(
      `Not Authorized to Access this Route: Status Code ${StatusCodes.UNAUTHORIZED}`
    );
  }
};

module.exports = authMiddleware;
