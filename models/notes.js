notes = new Mongo.Collection('notes');

notes.attachSchema(
  new SimpleSchema({
    noteRecordId: { type: String },
    personRecordId: { type: String },
    linkedPersonRecordId: { type: String },
    entryDate: { type: Date },
    authorName: { type: String },
    authorEmail: { type: String },
    authorPhone: { type: String },
    sourceDate: { type: Date },
    found: { type: Boolean },
    emailOfFoundPerson: { type: String },
    phoneOfFoundPerson: { type: String },
    lastKnownLocation: { type: String },
    text: { type: String },
    // _underscore fields don't below to PFIF specification
    _createdAt: {
      type: Date,
      denyUpdate: true
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  notes.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}
