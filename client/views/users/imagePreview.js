Template.imagePreview.events( {
  "keyup .photo-desc": function (event, template) {
    // console.log(event.target.value);
    var img = Images.findOne({_id: event.target.id});
    img.name(event.target.value, {store: 'images'});
    img.name(event.target.value, {store: 'thumbs'});
  }
});
