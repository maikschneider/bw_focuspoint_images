declare module "@typo3/backend/icons.js" {
  export declare enum sizes {
    small
  };

  export function getIcon(icon: string, size: sizes): Promise<string>;
}
