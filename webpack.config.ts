import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";

import { Configuration as DevServerConfiguration } from "webpack-dev-server";

type WebpackConfig = webpack.Configuration & {
  devServer?: DevServerConfiguration;
};

type EnvironmentRecord = { mode: "production" | "development"; port: number };

export default (env: EnvironmentRecord) => {
  const config: WebpackConfig = {
    // настройка переменной окружения. В дев режиме бандл будет читабельный, в проде - максимально сжатый
    mode: env.mode ?? "development",
    // точка входа, откуда вебпак будет брать исходный код
    entry: path.resolve(__dirname, "src", "index.ts"),
    // точка выхода куда вебпак будет все выгружать финальную сборку
    output: {
      path: path.resolve(__dirname, "dist"),
      // название файла будет каждый раз новое, чтобы браузер обновлял кэш. contenthash - шаблон.
      filename: "[name].[contenthash].js",
      // флаг который просто стирает старые файлы каждый билд
      clean: true,
    },
    plugins: [
      // плагин который отвечает за обработку html. Он подставляет скрипты в финальную HTML
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      // бестолковый плагин который в терминале показывает % готовности бандла. Сильно тормозит сборку. Использовать только на "development"
      new webpack.ProgressPlugin(),
    ],
    // Настройка лоудеров. Нужно чтобы вебпак работал с расширениями помимо JS
    module: {
      // настройка TS
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      // настройка TS
      extensions: [".tsx", ".ts", ".js"],
    },
    devtool: "inline-source-map",
    // настройка сервера. Смотрим в лайв режиме за изменениями
    devServer: {
      port: env.port ?? 5000,
      open: true,
    },
  };
  return config;
};
