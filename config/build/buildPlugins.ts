import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack, { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const { mode, paths } = options;

  const isDev = mode === "development";
  const isProd = mode === "production";

  return [
    // плагин который отвечает за обработку html. Он подставляет скрипты в финальную HTML
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    // бестолковый плагин который в терминале показывает % готовности бандла. Сильно тормозит сборку. Использовать только на "development"
    isDev && new webpack.ProgressPlugin(),
  ];
}
