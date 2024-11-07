import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack, { Configuration } from "webpack";
import { Options } from "./types";

export function buildPlugins(options: Options): Configuration["plugins"] {
  const isDev = options.env.mode === "development";
  const isProd = options.env.mode === "production";

  return [
    // плагин который отвечает за обработку html. Он подставляет скрипты в финальную HTML
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    // бестолковый плагин который в терминале показывает % готовности бандла. Сильно тормозит сборку. Использовать только на "development"
    isDev && new webpack.ProgressPlugin(),
  ];
}
