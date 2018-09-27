const HAS_WINDOW: boolean = window !== undefined && window !== null;
const HAS_URL: boolean =
  HAS_WINDOW && window.URL !== undefined && window.URL !== null;
//
export class UIManager {
  public static createUrl(blob: Blob): string {
    let sRet: string = "";
    if (HAS_URL && blob !== undefined && blob !== null) {
      try {
        sRet = window.URL.createObjectURL(blob);
      } catch (e) {
        console.log(e.toString());
      }
    }
    return sRet;
  }
  public static revokeUrl(url: string): void {
    if (HAS_URL && url !== undefined && url !== null && url.length > 0) {
      try {
        window.URL.revokeObjectURL(url);
      } catch (e) {
        console.log(e.toString());
      }
    }
  } // revokeUrl
} // class UIManager
