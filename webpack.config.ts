import { buildWebpack } from "@config/buildWebpack";
import { EnvironmentRecord } from "@config/types";

import webpack from "webpack";

import { Configuration as DevServerConfiguration } from "webpack-dev-server";

type WebpackConfig = webpack.Configuration & {
  devServer?: DevServerConfiguration;
};

export default (env: EnvironmentRecord) => {
  const isDev = env.mode === "development";
  const isProd = env.mode === "production";

  const config: WebpackConfig = buildWebpack({ env: env });
  return config;
};
