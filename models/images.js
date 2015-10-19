Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/bebe-uploads"})]
});

Images.allow({
    insert: function (userId, doc) {
 /*     if (user._id !== userId)
	return false;
	console.log(doc); */
      return true;
    },
    update: function () {
    },
    download: function () {
	return true;
    }
});
