define(['media'],
function(media) {

  describe("media", function() {
    
    it('should export get', function() {
      expect(media.get).to.exist;
      expect(media.get).to.be.a('function');
    });
    
  });
  
  return { name: "test.media" }
});
