type InteractjsDragEvent = {
  dx: number;
  dy: number;
  clientX: number;
  clientY: number;
  target: Element;
};

declare module "interactjs" {
  type Modifier = Record<string, unknown>;

  type DragConfig = {
    modifiers?: Modifier[];
    autoScroll?: boolean;
    listeners?: {
      start?: (event: InteractjsDragEvent) => void;
      move?: (event: InteractjsDragEvent) => void;
      end?: (event: InteractjsDragEvent) => void;
    };
    axis?: "x" | "y";
  };

  type Chainable = {
    resizable(config: Record<string, unknown>): Chainable;
    draggable(config: DragConfig): Chainable;
    unset(): void;
  };

  interface Interact {
    (selector: string): Chainable;
    modifiers: {
      restrictEdges(config: Record<string, unknown>): Modifier;
      restrictRect(config: Record<string, unknown>): Modifier;
    };
  }

  const interact: Interact;
  export default interact;
}
