/* global Comments Meteor Email Persons */

var sendNotif = function (userId, comment) {
  // console.log(comment);
  var p = Persons.find({_id: comment.referenceId}).fetch();
  // Podemos hacer comentarios en personas y usuarios tb
  var user = Meteor.users.findOne({_id: p.length > 0 ? p[0].familiar : comment.referenceId});
  // console.log(user);
  if (typeof user !== 'undefined') {
    var email = user.emails[0];
    var commenter = Meteor.users.findOne({_id: userId});
    if (email.verified) {
      Email.send({
        from: 'Bebes Robados <noreply@comunes.org>',
        to: email.address,
        subject: 'Tienes un nuevo comentario de ' + commenter.username,
        text: comment.content + '\n\n(...)\n\Continua leyendo en: ' + process.env.ROOT_URL
      });
    } else {
      console.log('Correo no verificado, no puedo enviar la notificación');
    }
  } else {
    console.log('Por alguna razón, no puedo enviar la notificación por correo');
  }
};

// https://github.com/matb33/meteor-collection-hooks
Comments.getCollection().after.update(function (userId, comment) {
  sendNotif(userId, comment);
});

Comments.getCollection().after.insert(function (userId, comment) {
  sendNotif(userId, comment);
});
