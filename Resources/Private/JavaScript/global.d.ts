declare type WizardUpdateEvent = {
  detail: {
    focuspoints: any[];
  };
};

declare type LinkSelectedEvent = {
  detail: {
    link: string;
  };
};

declare const TYPO3: {
  lang: {[K in string]: string};
  settings: {
    ajaxUrls: {[K in string]: string};
  };
};

declare module "@typo3/core/ajax/ajax-request.js" {
  declare interface AjaxRequest {

    new(url: string): AjaxRequest;

    get(): Promise<{
      resolve(): Promise;
    }>;
  }

  declare const ajaxRequest: AjaxRequest;

  export default ajaxRequest;
}

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

declare module "@typo3/backend/modal.js" {

  export declare enum sizes {
    large,
    full
  };

  export declare enum styles {
    dark
  };

  export declare enum types {
    iframe
  }

  export function advanced(config: {
    additionalCssClasses?: string[];
    buttons?: {
      btnClass: string;
      name: string;
      icon: string;
      text: string;
      trigger(): void;
    }[]
    content?: any;
    size?: sizes;
    title?: string;
    style?: styles | null;
    staticBackdrop?: boolean;
  }): void;
}

declare module "@typo3/backend/icons.js" {
  export declare enum sizes {
    small
  };

  export function getIcon(icon: string, size: sizes): Promise<string>;
}

interface Window {
  TYPO3: {
    Modal: {
      dismiss(): void;
    }
  }
  list_frame: Window;
}

interface Document {

  addEventListener(event: `${string}-wizard-update`, listener: (event: WizardUpdateEvent) => void): void;

  removeEventListener(event: `${string}-wizard-update`, listener: (event: WizardUpdateEvent) => void): void;

  addEventListener(event: `${string}-link-selected`, listener: (event: LinkSelectedEvent) => void): void;

  removeEventListener(event: `${string}-link-selected`, listener: (event: LinkSelectedEvent) => void): void;
}
