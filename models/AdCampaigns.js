/* global AdCampaigns:true, Mongo, Schema:true, SimpleSchema, currentAdCampaign */

AdCampaigns = new Mongo.Collection('AdCampaigns');

Schema = {};

Schema.AdCampaign = new SimpleSchema({
  // current campaign 1
  group: { type: Number, optional: false, autoValue: function () { return currentAdCampaign; }, index: 1 },
  user: { type: String, optional: false,
          autoValue: function () {
            if (this.isInsert) {
              return this.userId;
            }
          }, index: 1
        },
  bebe: { type: String, optional: false },
  photo: { type: String, optional: true },
  photoHD: { type: String, optional: true },
  text: { type: String, optional: true },
  participate: { type: Boolean, optional: false, index: 1 },
  validated: { type: Boolean, optional: false, index: 1 }
});

AdCampaigns.attachSchema(Schema.AdCampaign);
