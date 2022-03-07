const logger = require("./logger");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const hasValidToken = (request) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return null;
  }
  return decodedToken;
};

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === "CastError") return response.status(400).send({ error: "malformatted id" });
  if (error.name === "ValidationError") return response.status(400).json({ error: "content missing" });
  if (error.name === "JsonWebTokenError") return response.status(401).json({ error: "token missing or invalid" });
  if (error.name === "TokenExpiredError") return response.status(401).json({ error: "token expired" });
  next(error);
};

module.exports = {
  hasValidToken,
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
