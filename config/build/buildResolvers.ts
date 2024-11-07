import path from "path";
import { Configuration } from "webpack";
import { Options } from "./types";

export function buildResolvers(options: Options): Configuration["resolve"] {
  return {
    // настройка TS
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@config": path.resolve(__dirname, "config/build"),
    },
  };
}
