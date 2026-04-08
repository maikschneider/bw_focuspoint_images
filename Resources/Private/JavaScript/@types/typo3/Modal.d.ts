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

  export interface ModalHiddenEvent extends Event {
    type: "typo3-modal-hidden";
  }

  export interface LinkBrowserSetLinkEvent extends Event {
    type: "typo3:form-engine:link-browser:set-link";
    value: string;
  }

  export interface ModalEventMap {
    "typo3-modal-hidden": ModalHiddenEvent;
    "typo3:form-engine:link-browser:set-link": LinkBrowserSetLinkEvent;
  }

  export declare interface Modal {
    addEventListener<K extends keyof ModalEventMap>(
      event: K,
      listener: (event: ModalEventMap[K]) => void
    ): void;

    addEventListener(
      event: string,
      listener: (event: Event) => void
    ): void;

    hideModal(): void;
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
    type?: types;
  }): Modal;
}
