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
      search: "Search",
      filter: "Filter",
      next: "Next",
      previous: "Previous",
      submit: "Sumbit",
      last_page: "Last Page",
      first_page: "First Page"
    },
    field: {
      na: "N/A",
      readonly: "Read-only",
      yes: "Yes",
      no: "No",
    },
    error: {
      server_error: "System Error. Please contact an administrator.",
    },
  },
  welcome: {
    title: "Welcome {username}! Ready to compete?",
    title_short: "Join the Battle – Compete, Win, Repeat!",
    description: "🔥 Compete in thrilling challenges, climb the leaderboard, and claim victory! Choose your battle and join now! 🚀",
    search_placeholder: "Search for tournaments and battles...",
  },
  app_title: "Wishmasters – Compete. Win. Rise. 🏆",
  no_data_available: "No Data Available!",
  default: "Default",
  active: "Active",
  inactive: "Inactive",
  copied: "Copied to clipboard",
  uncopied: "Unable to copy item",
}));
