var gs = require("gs").create(wd);
var imagereader = require("imagereader");

function renderFrame(imgFrame, limits) {
  var width = imgFrame.getWidth();
  var height = imgFrame.getHeight();
  
  var startX = limits ? limits.colStart - 1 : 0;
  var endX   = limits ? limits.colEnd   - 1 : width;
  var startY = limits ? limits.rowStart - 1 : 0;
  var endY   = limits ? limits.rowEnd   - 1 : height;

  for (var y = startY; y < endY; y++) {
    var currRgb = null;
    var start = startX, end = startX;
    
    for (var x = startX; x < endX; x++) {
      var rgb = imgFrame.getRGB(x, y);
      if (rgb === currRgb) {
        end = x;
      }
      else {
        if (currRgb) gs.paint(currRgb, gs.cellAt(start + 1, y + 1), gs.cellAt(end + 1, y + 1));
        start = end = x;
        currRgb = rgb;
      }
  
      // end of row
      if (x == endX - 1) gs.paint(currRgb, gs.cellAt(start + 1, y + 1), gs.cellAt(x + 1, y + 1));
    }
  }
}

wd.configure().interactionListeners().add(retry());
get(wd, "https://docs.google.com/spreadsheet/ccc?key=0Al0ulrJIDCUVdG9zYzE2c1p3X3NVLW5BenlMNmRyT0E");

var imgFrames = imagereader.readFromFile("c:/Users/rui.figueira/Desktop/meetup3/bender.gif");


// Render a line
var limits = { rowStart : 39, rowEnd : 48, colStart : 8, colEnd : 18 };
renderFrame(imgFrames[0], limits);

// Animate
var loading = $(wd, "#waffle-loading-screen").visible();

var sheetTabs = $(wd, ".docs-sheet-tab-name");
var numFrames = sheetTabs.size();

for (var time = 0; time < 6 * numFrames; time++) {
  waitWhileNotEmpty(loading);
  var sheetTab = sheetTabs.eq(time % numFrames);
  click(sheetTab);
}

// Delete area in those limits
click($(wd, ".docs-sheet-tab-name").eq(0));
var startCell = gs.cellAt(limits.colStart, limits.rowStart);
var endCell   = gs.cellAt(limits.colEnd - 1, limits.rowEnd - 1);

dragAndDrop(startCell, endCell);
click($(wd, "#docs-format-menu"));
click($(wd, "#\\:bm span"));
