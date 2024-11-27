import { RendererColorPattern, RendererColorGradient } from "src/types";

export type LibraryConfigType = {
  imageWidth: number;
  imageHeight: number;
  imageColor: string | RendererColorGradient | RendererColorPattern;
};

class LibraryConfig {
  private static instance: LibraryConfig;
  private config: LibraryConfigType = {
    imageWidth: 0,
    imageHeight: 0,
    imageColor: "",
  };
  private constructor() {}
  public static getInstance(): LibraryConfig {
    if (!LibraryConfig.instance) {
      LibraryConfig.instance = new LibraryConfig();
    }
    return LibraryConfig.instance;
  }
  public setConfig(config: LibraryConfigType): void {
    this.config = {
      imageColor: config.imageColor,
      imageHeight: config.imageHeight,
      imageWidth: config.imageWidth,
    };
  }
  public getConfig<T extends keyof LibraryConfigType>(
    key: T
  ): LibraryConfigType[T] {
    return this.config[key];
  }

  public resetConfig(): void {
    this.config = {
      imageColor: "",
      imageHeight: 1080,
      imageWidth: 1920,
    };
  }

  public getAllConfig(): LibraryConfigType {
    return this.config;
  }
}

export const configManager = LibraryConfig.getInstance();
