import { BuildOptions } from "./types/types";

export function buildDevServers(options: BuildOptions) {
  return {
    port: options.port ?? 5000,
    open: true,
    historyApiFallback: true, // This line is important for React Router
    hot: true,
  };
}
