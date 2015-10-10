BrowserPolicy.content.allowOriginForAll("*.googleapis.com");
BrowserPolicy.content.allowOriginForAll("*.gstatic.com");
BrowserPolicy.content.allowOriginForAll("*.bootstrapcdn.com");

BrowserPolicy.content.allowFontDataUrl();

// Needed by yogiben:autoform-map but a security risk
// https://github.com/yogiben/meteor-autoform-modals/issues/20
BrowserPolicy.content.allowEval();
