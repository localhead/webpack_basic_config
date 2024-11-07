import { ModuleOptions } from "webpack";
import { Options } from "./types";

export function buildLoaders(options: Options): ModuleOptions["rules"] {
  return [
    {
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },
  ];
}
