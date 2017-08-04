// TODO: Place this in standalone script in `dist`
// TODO: Consistent quotes.
(function () {
  var loadSpectacleScript = function () {
    // Adapted from https://github.com/babel/babel-standalone/blob/master/src/transformScriptTags.js
    var scripts = document.getElementsByTagName('script');
    var script, input, output;

    // Load only our bespoke "text/spectacle" tags.
    for (var i = 0; i < scripts.length; i++) {
      script = scripts.item(i);

      // Load first spectacle script.
      if (script.type === 'text/spectacle') {
        input = script.innerHTML;
        output = Babel.transform(input, {
          presets: [
            [ "es2015", { "loose": true, "modules" : false } ],
            "stage-0",
            "react"
          ]
        }).code;

        eval(output);

        break;
      }
    };
  };

  if (typeof window !== 'undefined' && window && window.addEventListener) {
    window.addEventListener('DOMContentLoaded', loadSpectacleScript, false);
  }
})();
