declare module "@typo3/backend/notification.js" {

  export declare function success(title: string, message?: string, durection?: number): void;
  export declare function info(title: string, message?: string, durection?: number): void;
  export declare function warning(title: string, message?: string, durection?: number): void;
  export declare function error(title: string, message?: string, durection?: number): void;
}
