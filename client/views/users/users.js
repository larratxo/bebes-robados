/* global personLabelHack:true Session $ Router alert success Meteor */

// http://docs.meteor.com/#accounts_oncreateuser

personLabelHack = function () {
  $(".autoform-array-item-body > .form-group > label.control-label").text("");
  $(".autoform-array-item-body > .form-group > div .panel-default")
     .removeClass("panel");
  $(".autoform-add-item").addClass("btn-xs");
  $(".autoform-remove-item").addClass("btn-xs");
  $(".autoform-array-item-body > .form-group label.control-label").remove();
};

commentsHack = function () {
  var commentsHead = $('h4.media-heading');
  for (var i = 0; i < commentsHead.length; i++) {
    var headSplit = commentsHead[i].innerHTML.split(' <small>');
    var name = headSplit[0];
    var time = headSplit[1].split('<')[0];
    var url = Router.path('viewUser', {_id: name});
    commentsHead.eq(i).html('<h4 class=\'media-heading\'><a href=\'' + url + '\'>' + name + '</a>' +
                         ' <small>' + time + '</small>');
  }
};

var getUser = function (param) {
  if (typeof param.data === "string") {
    user = Meteor.users.findOne({_id: param.data });
  }
  else {
    user = param;
  }
  // console.log(user);
  return user;
};

Template.userGallery.helpers({
  images: function () {
    return userImages(getUser(this));
  },
  tieneFotos: function () {
    var imagenes = getUser(this).profile.imagenes;
    return _.isArray(imagenes) && imagenes.length > 0;
  }
});

Template.usersForm.helpers({
  isEqual: function (type, otherType) {
    return type === otherType;
  }
});

Template.viewUser.events({
  'click #report-abuser': function (e, t) {
    e.preventDefault();
    Router.go('abuseAdd', { username: t.data.username });
  }
});

Template.viewUser.onRendered( function () {
  var who = typeof this.data.profile.name == 'undefined' ? this.data.username : this.data.profile.name;
  Session.set('DocumentTitle', 'Datos sobre ' + who);
  personLabelHack();
  $(".autoform-add-item").click(personLabelHack());

  $('input[disabled][type=\'url\']')
    .attr('onClick', 'var win = window.open(this.value, \'_blank\'); win.focus();')
    .attr('disabled', false)
    .attr('readonly', true);

  $('#links').onclick = function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement,
        link = target.src ? target.parentNode : target,
        options = {index: link, event: event},
        links = this.getElementsByTagName('a');
    blueimp.Gallery(links, options);
  };

  setTimeout(commentsHack, 2000);
});

Template.userUpdate.helpers({
  omitFields: function() {
    return Meteor.user() && Meteor.user().services && Meteor.user().services.google? "emails, profile.name": "emails.$.verified";
  }
});

Template.userUpdate.onRendered( function() {
  personLabelHack();
  $(".autoform-add-item").click(personLabelHack());
});

AutoForm.hooks({
  editUserForm: {
    after: {
      update: function(error) {
        if (typeof error === "undefined") {
          success('Guardado');
          // Router.go('home');
        } else {
          alertMessage(error);
          console.log("Error updating " + error);
        }
      }
    }
  }
});
