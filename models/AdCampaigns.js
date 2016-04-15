/* global AdCampaigns:true, Mongo, Schema, SimpleSchema, currentAdCampaign */

AdCampaigns = new Mongo.Collection('AdCampaigns');

Schema = {};

Schema.AdCampaign = new SimpleSchema({
  // current campaign 1
  group: { type: Number, optional: false, autoValue: function () { return currentAdCampaign; }, autoform: {type: 'hidden'}, index: 1 },
  user: { type: String, optional: false,
          autoValue: function () {
            if (this.isInsert) {
              return this.userId;
            } else {
              return '';
            }
          }, autoform: {type: 'hidden'}, index: 1
        },
  photo: { type: String, optional: false, autoform: {type: 'hidden'} },
  photoHD: { type: String, optional: false, autoform: {type: 'hidden'} },
  text: { type: String, optional: false },
  participate: { type: Boolean, optional: false, index: 1, autoform: {type: 'hidden'} },
  validated: { type: Boolean, optional: false, index: 1, autoform: {type: 'hidden'} }
});

AdCampaigns.attachSchema(Schema.AdCampaign);
