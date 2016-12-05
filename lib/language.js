/* global navigator getUserLanguage:true */
getUserLanguage = function () {
  // Put here the logic for determining the user language
  // https://themeteorchef.com/snippets/i18n-and-meteor/#tmc-language-switching
  return navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
};
