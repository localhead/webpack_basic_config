import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack, { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { BuildOptions } from "./types/types";
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const { mode, paths, analyzer, platform } = options;

  const isDev = mode === "development";
  const isProd = mode === "production";

  const plugins: Configuration["plugins"] = [
    // плагин который отвечает за обработку html. Он подставляет скрипты в финальную HTML
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    // Плагин который дает возможность пользоваться переменными окружения в проекте.
    new webpack.DefinePlugin({
      __MODE__: JSON.stringify(mode),
      __PLATFORM__: JSON.stringify(platform),
    }),
  ];

  // ProgressPlugin -бестолковый плагин который в терминале показывает % готовности бандла. Сильно тормозит сборку. Использовать только на "development"
  // ReactRefreshWebpackPlugin - Плагин который не будет рефрешить стр. при каждом чихе. Есть еще надстройка в ts-loader
  if (isDev) {
    plugins.push(new webpack.ProgressPlugin(), new ReactRefreshWebpackPlugin());
  }

  if (isProd && analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (isProd) {
    // плагины для прод режима
  }

  return plugins;
}
