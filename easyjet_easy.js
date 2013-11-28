get(wd, "http://www.easyjet.com/en/");

// let's search Paris
var fromFld = $(wd).frames().find("#acOriginAirport");
fill(fromFld , "Paris");

// click the Charles de Gaule option
var suggestion = $(wd).frames().find("li").below(fromFld).containingText("Charles de Gaulle");
click(suggestion);