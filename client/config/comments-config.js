Comments.ui.config({
  limit: 20, // default 10
  loadMoreCount: 20, // default 20
  template: 'bootstrap', // default 'semantic-ui'
  defaultAvatar: '/images/default-avatar.png' // default 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
});

Comments.ui.setContent({
  title: 'Comentarios',
  save: 'Guardar',
  reply: 'Responder',
  edit: 'Editar',
  'placeholder-textarea': 'Aquí puede comentar y añadir alguna información sobre este bebe',
  'add-button-reply': 'Añadir una respuesta',
  'add-button': 'Añadir comentario',
  'load-more': 'Más comentarios'
});
