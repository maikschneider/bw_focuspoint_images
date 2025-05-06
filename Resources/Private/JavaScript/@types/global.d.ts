declare type FocuspointWizardUpdateEvent = {
  detail: {
    focuspoints: any[];
  };
};

declare type FocuspointLinkSelectedEvent = {
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

interface Window {
  TYPO3: {
    Modal: {
      dismiss(): void;
    }
  }
  list_frame: Window;
}

interface Document {

  addEventListener(event: `${string}-wizard-update`, listener: (event: FocuspointWizardUpdateEvent) => void): void;

  removeEventListener(event: `${string}-wizard-update`, listener: (event: FocuspointWizardUpdateEvent) => void): void;

  addEventListener(event: `${string}-link-selected`, listener: (event: FocuspointLinkSelectedEvent) => void): void;

  removeEventListener(event: `${string}-link-selected`, listener: (event: FocuspointLinkSelectedEvent) => void): void;
}
