import path from "path";
import webpack from "webpack";

import { buildDevServers } from "./buildDevServers";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { Options } from "./types";

export function buildWebpack(options: Options): webpack.Configuration {
  const isDev = options.env.mode === "development";
  const isProd = options.env.mode === "production";

  return {
    // настройка переменной окружения. В дев режиме бандл будет читабельный, в проде - максимально сжатый
    mode: options.env.mode ?? "development",
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
    plugins: buildPlugins(options),
    // Настройка лоудеров. Нужно чтобы вебпак работал с расширениями помимо JS
    module: {
      // настройка TS. Это loader-TS умеет обрабатывать так же и JSX. Но если бы писали без TS - то пришлось бы ставить babel-loader
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev && "inline-source-map",
    // настройка сервера. Смотрим в лайв режиме за изменениями. Он нужен только isDev сборке.
    devServer: isDev ? buildDevServers(options) : undefined,
  };
}
