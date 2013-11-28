importPackage(java.io);
importPackage(javax.imageio);
importPackage(java.awt);
importPackage(java.awt.image);
    
!(function(module) {

  module.exports = {
    readFromFile : function(path) {  
      var imgFile = new File(path);
      var extension = path.substr(path.lastIndexOf(".") + 1);
      
      var reader = ImageIO.getImageReadersByFormatName(extension).next();
      var iis = ImageIO.createImageInputStream(imgFile);
      reader.setInput(iis, false);
      
      var numImages = reader.getNumImages(true);
      var images = [];

      for (var i = 0; i < numImages; i++) {
        images.push(reader.read(i));
      }
      
      var w = images[0].getWidth();
      var h = images[0].getHeight();
      
      var combined = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
      var g = combined.getGraphics();
      g.setColor(Color.WHITE);  
      g.fillRect(0, 0, w, h);
      
      var firstFrame = images[0];
      g.drawImage(firstFrame, firstFrame.getMinX(), firstFrame.getMinY(), null);
      images[0] = combined;
      
      for (var i = 1; i < numImages; i++) {
        combined = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
        g = combined.getGraphics();
        var curr = images[i];
        var prev = images[i - 1];
        g.drawImage(prev, prev.getMinX(), prev.getMinY(), null);
        g.drawImage(curr, curr.getMinX(), curr.getMinY(), null);
        images[i] = combined;
      }
      
      return images;
    }
  };

})(module);