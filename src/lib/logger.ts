type LogLevel = "info" | "warn" | "error" | "debug";

const format = (level: LogLevel, message: string, meta?: unknown) => {
  const payload = [
    `[${new Date().toISOString()}]`,
    level.toUpperCase(),
    message,
  ].join(" ");

  if (meta) {
    return `${payload} ${JSON.stringify(meta)}`;
  }

  return payload;
};

const log = (level: LogLevel) => (message: string, meta?: unknown) => {
  const output = format(level, message, meta);

  switch (level) {
    case "error":
      console.error(output);
      break;
    case "warn":
      console.warn(output);
      break;
    case "debug":
      if (process.env.NODE_ENV !== "production") {
        console.debug(output);
      }
      break;
    default:
      console.log(output);
  }
};

export const logger = {
  info: log("info"),
  warn: log("warn"),
  error: log("error"),
  debug: log("debug"),
};
