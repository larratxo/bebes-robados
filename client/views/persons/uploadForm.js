/* global Template ReactiveVar success $ _ moment filesize Photos Meteor */
Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});
Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});
Template.uploadForm.onCreated(function () {
  this.error = new ReactiveVar(false);
  this.uploadInstance = new ReactiveVar(false);
  this.initiateUpload = function () {
    success('En desarrollo');
  };
  return this.initiateUpload2 = function (event, files, template) {
    var cleanUploaded, created_at, i, len, radio, ref, uploads;
    if (!files.length) {
      template.error.set('Please select a file to upload');
      return false;
    }
    if (files.length > 6) {
      template.error.set('Please select up to 6 files');
      return;
    }
    cleanUploaded = function (current) {
      var _uploads;
      _uploads = _.clone(template.uploadInstance.get());
      if (_.isArray(_uploads)) {
        _.each(_uploads, function (upInst, index) {
          if (upInst.file.name === current.file.name) {
            _uploads.splice(index, 1);
            if (_uploads.length) {
              template.uploadInstance.set(_uploads);
            } else {
              template.uploadInstance.set(false);
            }
          }
        });
      }
    };
    var transport = 'ddp'; // http (faster but only works with sticky sessions)
    created_at = +(new Date());
    uploads = [];
    return _.each(files, function (file) {
      return Photos.insert({
        file: file,
        meta: {
          created_at: created_at
            // person: template.person_id
        },
        streams: 'dynamic',
        chunkSize: 'dynamic',
        transport: transport
      }, false).on('end', function (error, fileObj) {
        if (!error && files.length === 1) {
          // FlowRouter.go('file', {
          //   _id: fileObj._id
          // });
        }
        cleanUploaded(this);
      }).on('abort', function () {
        cleanUploaded(this);
      }).on('error', function (error) {
        template.error.set((error != null ? error.reason : void 0) || error);
        Meteor.setTimeout(function () {
          return template.error.set(false);
        }, 5000);
        cleanUploaded(this);
      }).on('start', function () {
        uploads.push(this);
        template.uploadInstance.set(uploads);
      }).start();
    });
  };
});
Template.registerHelper('filesize', function (size) {
  if (size == null) {
    size = 0;
  }
  return filesize(size);
});
Template.uploadForm.helpers({
  error: function () {
    return Template.instance().error.get();
  },
  uploadInstance: function () {
    return Template.instance().uploadInstance.get();
  },
  estimateBitrate: function () {
    return filesize(this.estimateSpeed.get(), {
      bits: true
    }) + '/s';
  },
  estimateDuration: function () {
    var duration;
    var hours;
    var minutes;
    var seconds;
    duration = moment.duration(this.estimateTime.get());
    hours = '' + (duration.hours());
    if (hours.length <= 1) {
      hours = '0' + hours;
    }
    minutes = '' + (duration.minutes());
    if (minutes.length <= 1) {
      minutes = '0' + minutes;
    }
    seconds = '' + (duration.seconds());
    if (seconds.length <= 1) {
      seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
  }
});
Template.uploadForm.events({
  'click #pause': function () {
    return this.pause();
  },
  'click #abort': function () {
    return this.abort();
  },
  'click #continue': function () {
    return this['continue']();
  },
  'dragenter #uploadFile, dragstart #uploadFile': function (e, template) {
    $(e.currentTarget).addClass('file-over');
  },
  'dragleave #uploadFile, dragend #uploadFile': function (e, template) {
    $(e.currentTarget).removeClass('file-over');
  },
  'dragover #uploadFile': function (e, template) {
    e.preventDefault();
    $(e.currentTarget).addClass('file-over');
    e.originalEvent.dataTransfer.dropEffect = 'copy';
  },
  'drop #uploadFile': function (e, template) {
    e.preventDefault();
    template.error.set(false);
    $(e.currentTarget).removeClass('file-over');
    template.initiateUpload(e, e.originalEvent.dataTransfer.files, template);
    return false;
  },
  'change input[name="userfile"]': function (e, template) {
    return template.$('form#uploadFile').submit();
  },
  'submit form#uploadFile': function (e, template) {
    e.preventDefault();
    template.error.set(false);
    template.initiateUpload(e, e.currentTarget.userfile.files, template);
    return false;
  }
});
