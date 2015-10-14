/*global undef:true,noUndef:true,defaultCreatedAt:true,
   defaultUpdateAt:true,isValidLatLng:true, lastWeek:true, calcShowAll:true,
   lastDays: true, lastDay:true, initYear:true, thisYear:true */

undef = function(obj) {
  return typeof obj === 'undefined' || obj === null;
};

noUndef = function(obj) {
  return !undef(obj);
};

defaultCreatedAt = {
  type: Date,
  autoform: { type: 'hidden' },
  autoValue: function() {
    if (this.isInsert) {
      return new Date();
    } else if (this.isUpsert) {
      return {$setOnInsert: new Date()};
    } else {
      this.unset();  // Prevent user from supplying their own value
    }
  }
};

defaultUpdateAt = {
  type: Date,
  autoform: { type: 'hidden' },
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
  return (typeof l === 'number' && !isNaN(l)) ||
         (typeof l === "string" && l.length > 0 && !isNaN(l));
};

lastWeek = function () {
  return lastDays(7);
};

lastDay = function () {
  return lastDays(1);
};

lastDays = function (days) {
  var today = new Date();
  var lastWeek = new Date(today.getFullYear(),
                          today.getMonth(), today.getDate() - days);
  return lastWeek ;
};

initYear = 1939;
thisYear = new Date().getFullYear();
calcShowAll = null;

if (Meteor.isClient) {
  Session.setDefault("minBornYear", initYear);
  Session.setDefault("maxBornYear", thisYear);
  calcShowAll = function() {
    return Session.get("minBornYear") === initYear &&
      Session.get("maxBornYear") === thisYear;
  };
}
