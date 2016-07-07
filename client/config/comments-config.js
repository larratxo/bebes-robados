/* global Comments */

Comments.ui.setContent({
  title: 'Comentarios',
  save: 'Guardar',
  reply: 'Responder',
  edit: 'Editar',
  remove: 'Borrar',
  'placeholder-textarea': 'Aquí puede comentar y añadir alguna información sobre esta persona',
  'add-button-reply': 'Añadir una respuesta',
  'add-button': 'Añadir comentario',
  'you-need-to-login': 'Necesitas iniciar sesión para',
  'add comments': 'añadir comentarios',
  'like comments': 'puntuar comentarios',
  'rate comments': 'puntuar comentarios',
  'add replies': 'responder',
  'load-more': 'Más comentarios'
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
