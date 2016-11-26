/* globals App */
/* eslint-disable quote-props */

App.info({
  name: 'REUNE',
  description: 'Red Ciudadana de Búsqueda de Bebes Robados.',
  author: 'Comunes Association',
  email: 'comunes@ourproject.org',
  website: 'https://comunes.org',
  version: '0.0.1'
});

App.icons({
  // iOS
  // 'iphone_2x': 'resources/icons/icon-60x60@2x.png',
  // 'ipad': 'resources/icons/icon-76x76.png',
  // 'ipad_2x': 'resources/icons/icon-76x76@2x.png',

  // Android
  'android_mdpi': 'resources/mipmap-mdpi/ic_launcher.png',
  'android_hdpi': 'resources/mipmap-hdpi/ic_launcher.png',
  'android_xhdpi': 'resources/mipmap-xhdpi/ic_launcher.png'
});

App.launchScreens({
  // iOS
  // 'iphone_2x': 'resources/splash/splash-320x480@2x.png',
  // 'iphone5': 'resources/splash/splash-320x568@2x.png',
  // 'ipad_portrait': 'resources/splash/splash-768x1024.png',
  //'ipad_portrait_2x': 'resources/splash/splash-768x1024@2x.png',
  // 'ipad_landscape': 'resources/splash/splash-1024x768.png',
  // 'ipad_landscape_2x': 'resources/splash/splash-1024x768@2x.png',

  // Android
  'android_mdpi_portrait': 'resources/mipmap-mdpi/ic_launcher.png',
  'android_mdpi_landscape': 'resources/mipmap-mdpi/ic_launcher.png',
  'android_hdpi_portrait': 'resources/mipmap-hdpi/ic_launcher.png',
  'android_hdpi_landscape': 'resources/mipmap-hdpi/ic_launcher.png',
  'android_xhdpi_portrait': 'resources/mipmap-xhdpi/ic_launcher.png',
  'android_xhdpi_landscape': 'resources/mipmap-xhdpi/ic_launcher.png'
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#619561');
