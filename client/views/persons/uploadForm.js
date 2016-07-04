/* global Template ReactiveVar $ _ moment filesize aFilesCollection Meteor AutoForm alertMessage */

AutoForm.addInputType('multiFileUpload', {
  template: 'uploadForm',
  valueOut: function () {
    var value = typeof this.val() === 'string' ? this.val().split(',') : [];
    // console.log(value);
    return value;
  },
  contextAdjust: function (context) {
    context.atts['class'] = (context.atts['class'] || '') + ' multiFileUpload-field';
    return context;
  }
});

Template.uploadForm.onCreated(function () {
  // this.currentUpload = new ReactiveVar(false);
  this.value = new ReactiveVar([]);
});

Template.uploadForm.onCreated(function () {
  var self = this;
  // console.log(self);
  this.error = new ReactiveVar(false);
  this.uploadInstance = new ReactiveVar(false);
  this.allImages = new ReactiveVar(0); // true if > 0
  this.collectionVar = new ReactiveVar(aFilesCollection[self.data.atts.collection]);
  return this.initiateUpload = function (event, files, template) {
    var cleanUploaded, created_at, i, len, radio, ref, uploads;
    if (!files.length) {
      template.error.set('Por favor, selecciona un fichero para subir');
      return false;
    }
    if (files.length > 10) {
      template.error.set('Por favor, selecciona hasta diez ficheros');
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
    // console.log(self.data);
    var collection = self.collectionVar.get();
    return _.each(files, function (file) {
      return collection.insert({
        file: file,
        meta: {
          created_at: created_at
        },
        streams: 'dynamic',
        chunkSize: 'dynamic',
        transport: transport
      }, false).on('end', function (error, fileObj) {
        if (error) {
          alertMessage(error);
        } else {
          if (/png|jpg|jpeg/i.test(fileObj.extension)) {
            template.allImages.set(template.allImages.get() + 1);
          } else {
            template.allImages.set(template.allImages.get() - 100);
          }
          template.value.get().push(fileObj._id);
          self.data.value = template.value.get();
          // console.log(template.value.get());
          cleanUploaded(this);
        }
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
  hasPhotos: function () {
    // console.log('All images ' + Template.instance().allImages.get());
    return Template.instance().allImages.get() > 0;
  },
  collection: function () {
    // console.log(Template.instance().collectionVar.get().collectionName);
    return Template.instance().collectionVar.get().collectionName;
  },
  value: function () {
    // console.log(Template.instance().value.get());
    return Template.instance().value.get();
  },
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
  onPause: function () {
    // console.log(this.onPause.get());
    return this.onPause.get();
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
