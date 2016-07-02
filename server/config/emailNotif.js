/* global Email Roles Meteor check Accounts process */

Meteor.methods({
  sendNotifToRole: function (role, subject, body) {
    check(role, String);
    check(subject, String);
    check(body, String);
    // This is also called from the cron (so no user is defined)
    if (typeof this.userId === 'string') {
      check(this.userId, String);
      console.log('Notificacion generada por usuario: ' + this.userId);
    }

    // console.log(comment);
    // https://alanning.github.io/meteor-roles/classes/Roles.html#method_getUsersInRole
    var admins = Roles.getUsersInRole(role);
    var verifiedEmails = [];
    for (var i = 0; i < admins.length; i++) {
      var emails = admins[i].emails;
      for (var j = 0; j < emails.length; j++) {
        if (emails[j].verified) {
          verifiedEmails.push(emails[j].address);
        }
      }
    }

    for (var k = 0; k < verifiedEmails.length; k++) {
      var email = verifiedEmails[k];
      Email.send({
        from: Accounts.emailTemplates.from,
        to: email.address,
        subject: subject,
        text: body + '\n\n(...)\n\Accede en: ' + process.env.ROOT_URL
      });
    }

    return;
  }
});
