import * as Localization from "expo-localization";
import i18n from "i18n-js";
import en from "../translations/en.json";
import pl from "../translations/pl.json";
import de from "../translations/de.json";

i18n.translations = {
    en,
    pl,
    de,
};

i18n.locale = Localization.locale;

i18n.fallbacks = true;

export default i18n;
