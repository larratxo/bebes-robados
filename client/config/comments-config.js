/* global Comments TAPi18n */

Comments.ui.setContent({
  title: TAPi18n.__('Comentarios'),
  save: TAPi18n.__('Guardar'),
  reply: TAPi18n.__('Responder'),
  edit: TAPi18n.__('Editar'),
  remove: TAPi18n.__('Borrar'),
  'placeholder-textarea': TAPi18n.__('Aquí puede comentar y añadir alguna información sobre esta persona'),
  'add-button-reply': TAPi18n.__('Añadir una respuesta'),
  'add-button': TAPi18n.__('Añadir comentario'),
  'you-need-to-login': TAPi18n.__('Necesitas iniciar sesión para'),
  'add comments': TAPi18n.__('añadir comentarios'),
  'like comments': TAPi18n.__('puntuar comentarios'),
  'rate comments': TAPi18n.__('puntuar comentarios'),
  'add replies': TAPi18n.__('responder'),
  'load-more': TAPi18n.__('Más comentarios')
});

/* This in client side */
Comments.ui.config({
  limit: 20, // default 10
  loadMoreCount: 20, // default 20
  generateAvatar: function (user, isAnonymous) {
    return user.profile.username;
  },
  template: 'bootstrap', // default 'semantic-ui'
  // default 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  defaultAvatar: '/images/default-avatar.png',
  markdown: false
});
