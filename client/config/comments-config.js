/* global Comments */

Comments.ui.config({
  limit: 20, // default 10
  loadMoreCount: 20, // default 20
  template: 'bootstrap', // default 'semantic-ui'
  defaultAvatar: '/images/default-avatar.png', // default 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  markdown: false
});

/* FIXME: No yet available
Comments.config({
  mediaAnalyzers: [
    Comments.analyzers.image,
    Comments.analyzers.youtube
  ]
});
*/

Comments.ui.setContent({
  title: 'Comentarios',
  save: 'Guardar',
  reply: 'Responder',
  edit: 'Editar',
  remove: 'Borrar',
  'placeholder-textarea': 'Aquí puede comentar y añadir alguna información sobre esta persona',
  'add-button-reply': 'Añadir una respuesta',
  'add-button': 'Añadir comentario',
  'load-more': 'Más comentarios'
});
