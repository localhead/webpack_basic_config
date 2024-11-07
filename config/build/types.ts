export interface Options {
  env: EnvironmentRecord;
}

export type EnvironmentRecord = {
  mode: "production" | "development";
  port: number;
};
