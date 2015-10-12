undef = function(obj) {
  return typeof obj === 'undefined';
}

defaultCreatedAt = {
  type: Date,
  autoValue: function() {
    if (this.isInsert) {
      return new Date;
    } else if (this.isUpsert) {
      return {$setOnInsert: new Date};
    } else {
      this.unset();  // Prevent user from supplying their own value
    }
  }
};

defaultUpdateAt = {
  type: Date,
  autoValue: function() {
    if (this.isUpdate || this.isInsert) {
      return new Date();
    }
  },
  // Commented because we want to have updateAt = createAt initialy
  // denyInsert: true,
  optional: true
};

isValidLatLng = function (l) {
  return (typeof l === 'number' && !isNaN(l)) || (typeof l === "string" && l.length > 0);
};

lastWeek = function getLastWeek () {
  return lastDays(7);
};

lastDay = function getLastWeek () {
  return lastDays(1);
};

lastDays = function getLastWeek (days) {
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - days);
    return lastWeek ;
};
