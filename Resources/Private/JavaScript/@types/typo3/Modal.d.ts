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
