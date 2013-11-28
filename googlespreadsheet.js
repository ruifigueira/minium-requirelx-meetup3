get(wd, "https://docs.google.com/spreadsheet/ccc?key=0Al0ulrJIDCUVdHJjWnJsbG5hY3hBWFp0Vy1OQV9qQUE#gid=0");

var colC = $(wd, "#0-grid-table-quadrantcolumn-head-section th").withText("C");
var row5 = $(wd, ".row-header-wrapper").withText("5");
var cellC5 = $(wd, "#0-grid-table-quadrantscrollable td").below(colC).rightOf(row5);

doubleClick(cellC5);

var cellInput = $(wd, ".cell-input").overlaps(cellC5);

fill(cellInput, "Minium can!");