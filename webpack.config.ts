import path from "path";
import webpack from "webpack";

import { buildWebpack } from "./config/build/buildWebpack";
import { EnvironmentRecord } from "./config/build/types/types";

interface EnvVariables {
  mode: EnvironmentRecord;
  port: number;
  analyzer?: boolean;
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? "development",
    paths: {
      entry: path.resolve(__dirname, "src", "index.tsx"),
      html: path.resolve(__dirname, "public", "index.html"),
      output: path.resolve(__dirname, "build"),
      alias: {
        "@pages": path.resolve(__dirname, "src/pages"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@packages": path.resolve(__dirname, "src/packages"),
      },
    },
    port: env.port ?? 5000,
    analyzer: env.analyzer ?? false,
  });
  return config;
};
