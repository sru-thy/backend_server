import { createLogger, transports, format } from "winston";

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      dirname: "logs",
      filename: "errors.log",
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf(({ timestamp, level, message, service }) => {
      return `[${timestamp}] ${service} ${level}: ${message}`;
    })
  ),
  defaultMeta: {
    service: "WinstonService",
  },
});

export default logger;
