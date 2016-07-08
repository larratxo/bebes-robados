/* global Router Future Random Meteor process */

import webshot from 'webshot';
import fs from 'fs';
import Future from 'fibers/future';

Router.route('cartelesPDF', {
  path: '/cartelesPDF',
  where: 'server',
  action: function () {
    var fut = new Future();
    var fileName = 'generated_' + Random.id() + '.pdf';
    var url = Meteor.absoluteUrl('carteles?_escaped_fragment_=');
    // console.log(url);

    var options = {
      renderDelay: 5000,
      quality: 100,
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
                                  'Content-Disposition': 'attachment; filename=cartenes-difusion.pdf'});
    this.response.end(fut.wait());
  }
});
