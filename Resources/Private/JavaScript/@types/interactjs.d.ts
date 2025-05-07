declare module "interactjs" {

  declare type Chainable = {
    resizable(config: {}): Chainable;
    draggable(config: {}): Chainable;
    unset(): void;
  };

  declare interface Interact {
    (selector: string): Chainable;

    modifiers: {
      restrictEdges(config: {}): void;
      restrictRect(config: {}): void;
    }
  };

  declare const interact: Interact;

  export default interact;
}
