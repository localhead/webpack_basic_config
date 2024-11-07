import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";

import { Configuration as DevServerConfiguration } from "webpack-dev-server";

type WebpackConfig = webpack.Configuration & {
  devServer?: DevServerConfiguration;
};

type EnvironmentRecord = { mode: "production" | "development"; port: number };

export default (env: EnvironmentRecord) => {
  const isDev = env.mode === "development";
  const isProd = env.mode === "production";

  const config: WebpackConfig = {
    // настройка переменной окружения. В дев режиме бандл будет читабельный, в проде - максимально сжатый
    mode: env.mode ?? "development",
    // точка входа, откуда вебпак будет брать исходный код
    entry: path.resolve(__dirname, "src", "index.tsx"),
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
      isDev && new webpack.ProgressPlugin(),
    ],
    // Настройка лоудеров. Нужно чтобы вебпак работал с расширениями помимо JS
    module: {
      // настройка TS. Это loader-TS умеет обрабатывать так же и JSX. Но если бы писали без TS - то пришлось бы ставить babel-loader
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
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      alias: {
        "@pages": path.resolve(__dirname, "src/pages"), // Adjust this path to match your project structure
        "@utils": path.resolve(__dirname, "src/utils"), // Example for components
      },
    },
    devtool: isDev && "inline-source-map",
    // настройка сервера. Смотрим в лайв режиме за изменениями. Он нужен только isDev сборке.
    devServer: isDev
      ? {
          port: env.port ?? 5000,
          open: true,
        }
      : undefined,
  };
  return config;
};
