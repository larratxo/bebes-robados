Meteor.publish('images', function () {
    // FIXME: improve this to be more efficient
    return Images.find();
});
