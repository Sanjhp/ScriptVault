import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) {
    return res.status(403).send("A token is required for authentication");
  }

  const token = authHeader.replace("Bearer ", ""); // Remove 'Bearer ' prefix

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    console.log('err', err)
    return res.status(401).send("Invalid Token");
  }
};

export default verifyToken;
