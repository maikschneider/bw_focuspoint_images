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
