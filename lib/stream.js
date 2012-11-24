define(['./track',
        'url/main',
        'events',
        'class'],
function(Track, url, Emitter, clazz) {

  function Stream(ms) {
    Emitter.call(this);
    this.label = ms.label;
    // TODO: Make this a TrackList, with add, remove, etc
    this.audioTracks = [];
    this.videoTracks = [];
    this._ms = ms;
    this._url = null;
    
    var i, len;
    for (i = 0, len = ms.audioTracks.length; i < len; i++) {
      var t = ms.audioTracks[i];
      this.audioTracks.push(new Track(t));
    }
    for (i = 0, len = ms.videoTracks.length; i < len; i++) {
      var t = ms.videoTracks[i];
      this.videoTracks.push(new Track(t));
    }
    
    var self = this;
    Object.defineProperty(this, 'ended', {
      get: function() { return self._ms.ended; }
    });
    
    ms.onended = function(e) {
      console.log('on ended')
      self.emit('end');
    };
    
  }
  clazz.inherits(Stream, Emitter);
  
  Stream.prototype.stop = function() {
    this._ms.stop();
  }
  
  Stream.prototype.toURL = function() {
    if (!this._url) {
      this._url = url.create(this._ms);
    }
    return this._url;
  }

  return Stream;
});
