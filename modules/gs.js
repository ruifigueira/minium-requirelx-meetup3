!(function(ctx) {

  var GS = function(wd) {
    if (this instanceof GS) {
      this.wd = wd;
      return this;
    }
    else {
      return new GS(wd);
    }
  };
  
  GS.prototype.cellAt = function(col, row) {
    var colCells = $(this.wd, "#waffle-grid-container .column-header-row th[id]").matchingText("\\w+");
    var colCell = typeof col === "number" ? colCells.eq(col - 1) : colCells.withText(col);
    var rowCell = $(this.wd, ".row-header-wrapper").withText(row);
    return $(this.wd, "#waffle-grid-container td").below(colCell).rightOf(rowCell);
  };

  GS.prototype.fillCell = function(cell, val) {
    var input = $(this.wd, ".input-box .cell-input");
    doubleClick(cell);
    fill(input, text.toString());
    sendKeys(input, Keys.ENTER);
  };

  GS.prototype.fillColor = function(color) {
    var r, g, b;

    if (arguments.length === 3) color = Array.prototype.slice.apply(arguments);

    if (typeof color === "number")  {
      r = (color >> 16) & 0x000000FF;
      g = (color >> 8 ) & 0x000000FF;
      b = (color      ) & 0x000000FF;
    } else if (color instanceof Array) {
      r = color[0];
      g = color[1];
      b = color[2];
    }
    
    var backgroundColor = "background-color: rgb(" + [r, g, b].join(", ") + ")";
    var colorDropdown = $(wd, "#t-cell-color .goog-toolbar-menu-button-dropdown");
    var colorMenu = $(wd, ".docs-colormenuitems").below(colorDropdown);
    var colorCell = colorMenu.find(".jfk-palette-colorswatch[style*='" + backgroundColor + "']");
    click(colorDropdown);
    if (withoutWaiting().checkEmpty(colorCell)) {
      var hex = function(i) {
        var str = i.toString(16);
        return str.length == 1 ? "0" + str : str;
      };
      var colorRgb = "#" + hex(r) + hex(g) + hex(b);
      var customColor = colorMenu.find(".docs-colormenuitems-custom-header");
      var colorFld = $(wd, ".hsv-input");
      var okBtn = $(wd, ".goog-buttonset-action");
      var modalBg = $(wd, ".modal-dialog-bg").visible();
      click(customColor);
      fill(colorFld, colorRgb);
      click(okBtn);
      waitWhileNotEmpty(modalBg);
    }
    else {
      click(colorCell);
    }
    waitWhileNotEmpty(colorMenu);
  };

  GS.prototype.paint = function(color, start, end) {
    if (end && !start.is(end)) {
      dragAndDrop(start, end);
    }
    else {
      click(start);
    }
    this.fillColor(color);
  };

  GS.prototype.goToSheetTab = function(idx) {
    var sheetTab = $(wd, ".docs-sheet-tab-name").eq(idx);
    click(sheetTab);
  };

  ctx.create = GS;

})(module.exports);