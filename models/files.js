/* global SimpleSchema FilesCollection Meteor _ personPhotos:true personAttachs:true Roles Photos:true Attachs:true */

// https://github.com/VeliovGroup/Meteor-Files/issues/99
var storePathConfig = function () {
  return Meteor.settings.public.isProduction ? '/opt/bebes-uploads/' : '/opt/bebes-uploads/dev';
};

function checkLimitAndExt (validExt, validSize, megaLimit) {
  if (validSize && validExt) {
    return true;
  } else {
    if (validSize) {
      return 'Tipo de fichero no permitido';
    } else {
      return 'Por favor, sube ficheros con un tamaño máximo de ' + megaLimit + 'MB';
    }
  }
}

Photos = new FilesCollection({
  collectionName: 'Photos',
  allowClientCode: false, // Disallow remove files from Client
  storePath: storePathConfig,
  onBeforeUpload: function (file) {

    var megaLimit = 10;
    var validExt = /png|jpg|jpeg/i.test(file.ext);
    var validSize = file.size <= megaLimit * 1024 * 1024;
    // console.log('File ext: ' + file.ext);
    return checkLimitAndExt(validExt, validSize, megaLimit);
  }
});

Attachs = new FilesCollection({
  collectionName: 'Attachs',
  allowClientCode: false, // Disallow remove files from Client
  storePath: storePathConfig,
  onBeforeUpload: function (file) {
    var megaLimit = 20;
    var validExt = /png|jpg|jpeg|pdf|doc|odf|xls/i.test(file.ext);
    var validSize = file.size <= megaLimit * 1024 * 1024;
    return checkLimitAndExt(validExt, validSize, megaLimit);
  }
});

// https://github.com/VeliovGroup/Meteor-Files/wiki/Schema
Photos.collection.attachSchema(new SimpleSchema(Photos.schema));
Attachs.collection.attachSchema(new SimpleSchema(Attachs.schema));

if (Meteor.isServer) {
  Photos.allow({
    // TODO: more perms here
    insert: function (userId, doc) {
      return true;
    },
    update: function (userId, doc, fields, modifier) {
      return true;
    },
    remove: function (userId, doc) {
      if (Roles.userIsInRole(userId, ['admin']) || doc.owner === userId) {
        return true;
      }
      return false;
    }
  });

  Attachs.allow({
    // TODO: more perms here
    insert: function (userId, doc) {
      return true;
    },
    update: function (userId, doc, fields, modifier) {
      return true;
    },
    remove: function (userId, doc) {
      if (Roles.userIsInRole(userId, ['admin']) || doc.owner === userId) {
        return true;
      }
      return false;
    }
  });
}

personPhotos = function (person) {
  var photos;
  if (person) {
    photos = person.photos;
  }
  if (_.isArray(photos) && photos.length > 0) {
    return Photos.collection.find({ _id: { $in: photos } });
  } else {
    // empty cursor
    return Photos.collection.find({ limit: 0 });
  }
};

// https://github.com/VeliovGroup/Meteor-Files/wiki/collection

personAttachs = function (person, userId) {
  var attachs = person.attachs;
  var isAdmin = Roles.userIsInRole(userId, ['admin']);
  if (isAdmin || person.familiar === userId) {
    if (_.isArray(attachs) && attachs.length > 0) {
      return Attachs.collection.find({ _id: { $in: attachs } });
    }
  }
  // empty cursor
  return Attachs.collection.find({ limit: 0 });
};

if (Meteor.isClient) {
  Meteor.subscribe('files.photos.all');
  Meteor.subscribe('files.attachs.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.photos.all', function () {
    return Photos.collection.find({});
  });
  Meteor.publish('files.attachs.all', function () {
    return Attachs.collection.find({});
  });
}
