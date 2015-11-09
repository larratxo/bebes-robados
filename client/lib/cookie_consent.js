var options = {
  cookieTitle: "Uso de Cookies",
  cookieMessage: "Usamos cookies para asegurar un mejor uso de nuestra web.",
  // cookieMessageImply: "Al continuar usando nuestra web sin cambiar la configuración, estas aceptando que usemos estas cookies.",
  showLink: false,
  position: 'top',
  linkText: "Lee más",
  linkRouteName: "/",
  acceptButtonText: "Aceptar",
  html: false,
  expirationInDays: 70
};

// CookieConsent.init();
CookieConsent._config = options;
