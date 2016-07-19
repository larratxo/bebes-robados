/* global Router Random Meteor process Spiderable */

import webshot from 'webshot';
import fs from 'fs';
import Future from 'fibers/future';

// https://forums.meteor.com/t/which-package-do-you-use-to-generate-pdfs-in-meteor/3391/2
Router.route('cartelesPDF', {
  path: '/cartelesPDF',
  where: 'server',
  action: function () {
    var fut = new Future();
    var fileName = 'generated_' + Random.id() + '.pdf';
    var url = Meteor.absoluteUrl('carteles?_escaped_fragment_=');
    // console.log(url);

    // https://github.com/brenden/node-webshot
    var options = {
      renderDelay: 5000,
      quality: 100,
      screenSize: {
        width: 1053,
        height: 1488
      },
      shotSize: {
        width: 1053,
        height: 'all'
      },
      'paperSize': {
        'format': 'A3',
        'orientation': 'portrait',
        'margin': '0'
      }
    };

    webshot(url, fileName, options, function (err) {
      fs.readFile(fileName, function (err, data) {
        if (err) {
          return console.log(err);
        }
        fs.unlinkSync(fileName);
        fut.return(data);
      });
    });

    this.response.writeHead(200, {'Content-Type': 'application/pdf',
                                  'Content-Disposition': 'attachment; filename=carteles-difusion.pdf'});
    this.response.end(fut.wait());
  }
});

// In production spiderable fails
// Trying this workaround: https://github.com/iron-meteor/iron-router/issues/1192
// More info:
// https://stackoverflow.com/questions/23637282/meteor-the-application-is-not-spiderable

var originalFunc = Spiderable._urlForPhantom;
Spiderable._urlForPhantom = function (siteAbsoluteUrl, requestUrl) {
  var url = originalFunc('http://localhost:' + process.env.PORT + '/', requestUrl);
  console.log('Resolved Spiderable request ' + requestUrl + ' to ' + url);
  return url;
};
