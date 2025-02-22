import core from "./core";
import auth from "./auth";
import form from "./form";
import game from "./game";

//@ts-ignore
export default defineI18nLocale(() => ({
  auth,
  core,
  form,
  game,
  common: {
    action: {
      search: "खोजें",
      filter: "फ़िल्टर",
      next: "अगला",
      previous: "पिछला",
      submit: "जमा करें"
    },
    field: {
      na: "एन/ए",
      readonly: "केवल पढ़ने योग्य",
      yes: "हाँ",
      no: "नहीं",
    },
    error: {
      server_error: "सिस्टम त्रुटि। कृपया किसी प्रशासक से संपर्क करें।",
    },
  },
  welcome: {
    title: "स्वागत है {username}! क्या आप प्रतिस्पर्धा के लिए तैयार हैं?",
    title_short: "युद्ध में शामिल हों – प्रतिस्पर्धा करें, जीतें, दोहराएं!",
    description: "🔥 रोमांचक चुनौतियों में प्रतिस्पर्धा करें, लीडरबोर्ड पर चढ़ें और जीत हासिल करें! अपनी लड़ाई चुनें और अभी शामिल हों! 🚀",
    search_placeholder: "टूर्नामेंट और लड़ाइयों की खोज करें...",
  },
  app_title: "विशमास्टर्स – प्रतिस्पर्धा करें। जीतें। ऊपर उठें। 🏆",
  no_data_available: "कोई डेटा उपलब्ध नहीं!",
  default: "डिफ़ॉल्ट",
  active: "सक्रिय",
  inactive: "निष्क्रिय",
  copied: "क्लिपबोर्ड में कॉपी किया गया",
  uncopied: "आइटम कॉपी करने में असमर्थ",
}));
