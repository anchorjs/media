define(['events',
        'class'],
function(Emitter, clazz) {

  function Track(mst) {
    Emitter.call(this);
    this.kind = mst.kind;
    this.label = mst.label;
    this._mst = mst;
    
    var self = this;
    Object.defineProperty(this, 'enabled', {
      get: function() { return self._mst.enabled; },
      set: function(v) { self._mst.enabled = v; }
    });
    Object.defineProperty(this, 'readyState', {
      get: function() { return self._mst.readyState; }
    });
    
    mst.onmute = function(e) {
      console.log('on mute')
      self.emit('mute');
    };
    mst.onunmute = function(e) {
      console.log('on unmute')
      self.emit('unmute');
    };
    mst.onended = function(e) {
      console.log('on ended')
      self.emit('end');
    };
  }
  clazz.inherits(Track, Emitter);

  return Track;
});
