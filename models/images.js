var createThumb = function(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  gm(readStream, fileObj.name()).resize('100', '100').stream().pipe(writeStream);
};

Images = new FS.Collection("images", {
  stores: [
    // other paths can use .metor/local and delete on each build
    new FS.Store.FileSystem("thumbs", { path: "~/bebe-uploads-thumbs",  transformWrite: createThumb }),
    new FS.Store.FileSystem("images", { path: "~/bebe-uploads"})],
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
