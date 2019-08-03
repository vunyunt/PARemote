import { LocalizedStrings } from "localized-strings";

class LocalizedStringsManagerClass {
  mRegisteredStrings: LocalizedStrings<{ [x: string]: string }>[] = [];
  mCurrentLang: string;

  constructor() {
    this.mCurrentLang = "en"
  }

  /**
   * Register a LocalizedStrings instance to init and update the language
   * reactively.
   *
   * @param localizedString
   */
  public registerLocalizedString(localizedString: LocalizedStrings<any>) {
    localizedString.setLanguage(this.mCurrentLang);

    this.mRegisteredStrings.push(localizedString);
  }

  public getCurrentLang() {
    return this.mCurrentLang;
  }

  public getCurrentLocale() {
    switch (this.mCurrentLang) {
      case "en":
        return "en-US";
      default:
        return this.mCurrentLang;
    }
  }
}

const LocalizedStringsManager = new LocalizedStringsManagerClass();
export default LocalizedStringsManager;
