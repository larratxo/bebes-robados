Accounts.emailTemplates.siteName = "Registro de Bebes Robados";
Accounts.emailTemplates.from = "noreply@comunes.org";

Accounts.emailTemplates.enrollAccount.subject = function (user) {
  return "Bienvenido/a " + user.profile.name + ",";
};
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
  return "¡Gracias por participar en nuestra red!"
       + " Para activar tu cuenta, simplemente pulsa en el link de abajo::\n\n"
       + url;
};

Accounts.emailTemplates.resetPassword.subject = function (user) {
  return "Resetea tu contraseña en " + Accounts.emailTemplates.siteName;
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
  return "Muy buenas " + user.profile.username + ",\n\n"
         + "Pulsa en el siguiente enlace para restablecer tu nueva contraseña:\n" +
         url + "\n\n" +
         "¡Por favor, no la vuelvas a olvidar!\n\n\n" +
         "Un saludo\n";
};

Accounts.emailTemplates.verifyEmail.subject = function (user) {
  return "Verifica tu correo electrónico en " + Accounts.emailTemplates.siteName;
};
Accounts.emailTemplates.verifyEmail.text = function (user, url) {
  return "Muy buenas,\n\n"
       + "Para verificar tu cuenta, simplemente pulsa en el siguiente enlace:\n\n"
       + url + "\n\n¡Gracias!";
};
