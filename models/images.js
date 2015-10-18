Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

Images.allow({
    insert: function (userId, doc) {
 /*     if (user._id !== userId)
	return false; */
	console.log(doc);
      return true;
    },
    download: function () {
	return true;
    }
});
