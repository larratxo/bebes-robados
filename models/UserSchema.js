// https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

Schema.UserProfile = new SimpleSchema({
  nombreCompleto: { type: String, optional: true, label: "Nombre completo:",
                    autoform: {afFieldInput: {placeholder: "Nombre y apellidos"} } },
  dni: { type: String, optional: true, label: "DNI (número y letra):",
         regEx: /^\d{8}[a-zA-Z]$/,  autoform:{ mask: '99999999-a' } },
  // parentesco: { type: String, optional: true, label: "Parentesco con el presunto niño/a robado:" },
  telefono: { type: String, optional: true, label: "Teléfono de contacto:", regEx: phoneRegex,
    autoform: {afFieldInput: {placeholder: "Teléfono móvil preferiblemente"} }
  },
  fax: { type: String, optional: true, label: "Fax:", regEx: phoneRegex}
});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    label: "Usuario/a",
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    autoform: { readonly: true, disabled: true },
    optional: true
  },
  emails: {
    type: Array,
    label: "Lista de emails de contacto",
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true
  },
  "emails.$": {
    label: false,
    type: Object
  },
  "emails.$.address": {
    type: String,
    label: "Email",
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: defaultCreatedAt,
  updatedAt: defaultUpdateAt,
  profile: {
    type: Schema.UserProfile,
    label: "Otros datos",
    optional: true
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    autoform: { type: 'hidden' },
    blackbox: true
  },
  // Add `roles` to your schema if you use the meteor-roles package.
  // Option 1: Object type
  // If you specify that type as Object, you must also specify the
  // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
  // Example:
  // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
  // You can't mix and match adding with and without a group since
  // you will fail validation in some cases.
  roles: {
    type: Object,
    optional: true,
    autoform: { type: 'hidden' },
    blackbox: true
  },
  // Option 2: [String] type
  // If you are sure you will never need to use role groups, then
  // you can specify [String] as the type
  //roles: {
  //    type: [String],
  //optional: true
  //}
});

Meteor.users.attachSchema(Schema.User);
