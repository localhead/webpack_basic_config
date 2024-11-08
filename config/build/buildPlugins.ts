import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack, { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { BuildOptions } from "./types/types";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const { mode, paths, analyzer } = options;

  const isDev = mode === "development";
  const isProd = mode === "production";

  const plugins: Configuration["plugins"] = [
    // плагин который отвечает за обработку html. Он подставляет скрипты в финальную HTML
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
  ];

  // ProgressPlugin -бестолковый плагин который в терминале показывает % готовности бандла. Сильно тормозит сборку. Использовать только на "development"
  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
  }

  if (isProd && analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (isProd) {
    // плагины для прод режима
  }

  return plugins;
}
