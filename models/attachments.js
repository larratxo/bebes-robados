/* global Meteor, gm, FS, Attachs:true, personAttachs:true, _, $ */

// Patched mupx: /usr/lib/node_modules/mupx/templates/linux/start.sh
// https://stackoverflow.com/questions/31901697/meteor-up-docker-and-graphicsmagick
Attachs = new FS.Collection('attachs', {
  stores: [
    new FS.Store.FileSystem('attachs', { path: '/opt/bebes-uploads/attachs'})],
  filter: {
    maxSize: 10485760, // 10M
    allow: {
      contentTypes: [
        'application/pdf',
        'application/msword',
        'text/plain',
        'application/vnd.oasis.opendocument.text'
      ]
    }
  },
  onInvalid: function (message) {
    if (Meteor.isClient) {
      console.log(message);
      $.bootstrapGrowl(message, {type: 'danger', align: 'center'} );
    } else {
      console.log(message);
    }
  }
});

personAttachs = function (person) {
  var attachs = person.attachs;

  if (_.isArray(attachs) && attachs.length > 0) {
    return Attachs.find({ _id: { $in: attachs } });
  } else {
    // empty cursor
    return Attachs.find({ limit: 0 });
  }
};

Attachs.allow({
  // TODO: more perms here
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
  download: function () {
    return true;
  }
});
