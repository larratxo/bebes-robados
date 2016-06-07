/* global Accounts Meteor ServiceConfiguration process */

Accounts.config({
  // Don't send notifications in tests
  sendVerificationEmail: Meteor.isServer ? !process.env.PHANTOMJS : true
});

if (Meteor.isServer) {
  var bebes_g_key = process.env.BEBES_GOOGLE_KEY;
  var bebes_g_secret = process.env.BEBES_GOOGLE_SECRET;

  var bebes_t_key = process.env.BEBES_TWITTER_KEY;
  var bebes_t_secret = process.env.BEBES_TWITTER_SECRET;

  if (bebes_g_key) {
    // first, remove configuration entry in case service is already configured
    ServiceConfiguration.configurations.remove({
      service: 'google'
    });
    ServiceConfiguration.configurations.insert({
      service: 'google',
      clientId: bebes_g_key,
      secret: bebes_g_secret
    });
  }

  if (bebes_t_key) {
    ServiceConfiguration.configurations.remove({
      service: 'twitter'
    });
    ServiceConfiguration.configurations.insert({
      service: 'twitter',
      loginStyle: 'popup',
      consumerKey: bebes_t_key,
      secret: bebes_t_secret
    });
  }
}
