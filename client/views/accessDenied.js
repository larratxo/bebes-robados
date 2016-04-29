Template.accessDenied.helpers({
    "alert": function () {
	var msgBase = "Inicia sesión o regístrate en este sitio para participar."
	var other = Meteor.settings.public.isProduction? "": " También puedes usar el usuario de pruebas 'test' con contraseña 'testtest'.";
	return msgBase + other;
    }
});
