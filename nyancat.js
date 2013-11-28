get(wd, "https://docs.google.com/spreadsheet/ccc?key=0Al0ulrJIDCUVdEhoSDlRbVZYWUt5ZVJCb1pVb0h1UFE");

var loading = $(wd, "#waffle-loading-screen").visible();

var sheetTabs = $(wd, ".docs-sheet-tab-name");
var numFrames = sheetTabs.size();

for (var time = 0; time < 4 * numFrames; time++) {
  waitWhileNotEmpty(loading);
  var sheetTab = sheetTabs.eq(time % numFrames);
  click(sheetTab);
}
