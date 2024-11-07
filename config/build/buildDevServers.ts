import { Options } from "./types";

export function buildDevServers(options: Options) {
  return {
    port: options.env.port ?? 5000,
    open: true,
  };
}
