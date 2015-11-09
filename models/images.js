var createThumb = function(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  // TODO check gm.isAvailable
  gm(readStream, fileObj.name()).resize('100', '100').stream().pipe(writeStream);
};

if (Meteor.isServer) {
  // https://github.com/CollectionFS/Meteor-CollectionFS/blob/master/packages/standard-packages/ADVANCED.md
  FS.TempStore.Storage = new FS.Store.FileSystem("_tempstore", {
    internal :  true,
    path : '/opt/bebes-uploads/tmp',
  });
};

// Patched mupx: /usr/lib/node_modules/mupx/templates/linux/start.sh
// https://stackoverflow.com/questions/31901697/meteor-up-docker-and-graphicsmagick
Images = new FS.Collection("images", {
  stores: [
    // other paths can use .metor/local and delete on each build
    new FS.Store.FileSystem("thumbs", { path: "/opt/bebes-uploads/uploads-thumbs",  transformWrite: createThumb }),
    new FS.Store.FileSystem("images", { path: "/opt/bebes-uploads/uploads"})],
  filter: {
    maxSize: 7340032, // 5242880,
    allow: {
      contentTypes: ['image/*'] //allow only images in this FS.Collection
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

userImages = function(user) {
  // Busca imagenes con esos ids
  var imagenes = user.profile.imagenes;
  if (_.isArray(imagenes) && imagenes.length > 0)
    return Images.find( { _id : { $in : imagenes } });
  else
    // empty cursor
    return Images.find({limit: 0 });
};

Images.allow({
  insert:function(userId,doc){
    return true;
  },
  update:function(userId,doc,fields,modifier){
    return true;
  },
  remove:function(userId,doc){
    return true;
  },
  download:function(){
    return true;
  }
});
