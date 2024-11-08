export type EnvironmentRecord = "production" | "development";

export type BuildOptions = {
  paths: BuildPaths;
  port: number;
  mode: EnvironmentRecord;
};

export type BuildPaths = {
  entry: string;
  html: string;
  output: string;
  alias: any;
};
