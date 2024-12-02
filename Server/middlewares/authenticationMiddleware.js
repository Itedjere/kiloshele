import jwt from "jsonwebtoken";

export const authenticationMiddleware = (req, res, next) => {
  //   Get the authorization header
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  // Get the token from the authorization header
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodedToken = null;
  try {
    decodedToken = jwt.verify(token, process.env.JWTPRIVATEKEY);
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
