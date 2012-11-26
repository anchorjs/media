define(['exports',
        './lib/stream'],
function(exports, Stream) {
  
  var getUserMedia = navigator.getUserMedia ||
                     navigator.webkitGetUserMedia ||
                     navigator.mozGetUserMedia ||
                     navigator.msGetUserMedia;

  function get(constraints, cb) {
    if (typeof constraints == 'function') {
      cb = constraints;
      constraints = { audio: true, video: true };
    }
    
    
    getUserMedia.call(navigator, constraints,
      function(s) { // success callback
        console.log('media stream success')
        cb(null, new Stream(s));
      },
      function(err) { // error callback
        console.log('media stream error')
        cb(err);
      });
  }

  exports.get = get;
  
  exports.Stream =
  exports.MediaStream = Stream;
});
