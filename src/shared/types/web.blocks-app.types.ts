export interface BlocksConfig {
  devBuild?: {
    srcCodeFolder?: string;
    entryFileName?: string;
    devServer?: {
      port?: number;
      open?: boolean;
    };
  };
}
