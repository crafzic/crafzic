export interface ElementInterface {
  below(instance: ElementInterface, height: number): this;
  getPosition(): {
    x: number;
    y: number;
  };
}
