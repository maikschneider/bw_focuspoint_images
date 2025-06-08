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

declare type TYPO3 = {
  lang: {[K in string]: string};
  settings: {
    ajaxUrls: {[K in string]: string};
  };
  Modal: {
    dismiss(): void;
  };
};

declare const TYPO3: TYPO3;

interface Window {
  TYPO3: TYPO3;
  list_frame: Window;
}

interface Document {

  addEventListener(event: `${string}-wizard-update`, listener: (event: FocuspointWizardUpdateEvent) => void): void;

  removeEventListener(event: `${string}-wizard-update`, listener: (event: FocuspointWizardUpdateEvent) => void): void;

  addEventListener(event: `${string}-link-selected`, listener: (event: FocuspointLinkSelectedEvent) => void): void;

  removeEventListener(event: `${string}-link-selected`, listener: (event: FocuspointLinkSelectedEvent) => void): void;
}
