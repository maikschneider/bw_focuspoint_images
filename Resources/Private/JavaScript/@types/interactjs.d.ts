declare module "interactjs" {

  declare type Chainable = {
    resizable(config: {}): Chainable;
    draggable(config: {}): Chainable;
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
