
// Import the logger instance from log.js
import logger from "../logging/log.js";

// Middleware for logging request
const logMiddleware = (req, res, next) => {  
  const start = new Date();


  const originalEnd = res.end;

  // Override the response 
  res.end = function (_chunk, _encoding) {
    // Call the original end method to complete the response
    originalEnd.apply(res, arguments);

    // duration request processing
    const ms = new Date() - start;

    // Get the current date and time for logging
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    
    const logMessage = {
      message: `Timestamp: ${currentDate}, ${currentTime} Method: ${req.method} ${req.originalUrl}. Status: ${res.statusCode}. Duration: ${ms} ms`,
      
    };

    
    logger.info(logMessage);
  };

  // Continue passing the request to the next middleware 
  next();
};


export default logMiddleware;

