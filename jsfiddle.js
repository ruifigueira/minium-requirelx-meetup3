wd.manage().window().maximize();
var size = wd.manage().window().getSize();

var popupSize = { width : size.getWidth() / 2, height : size.getHeight() / 2 };

var popupWindows = [
  { id : "google"    , url : "https://www.google.com" , size : popupSize, position : { top : 0, left : 0 } },
  { id : "bing"      , url : "http://www.bing.com"    , size : popupSize, position : { top : 0, left : popupSize.width } },
  { id : "sapo"      , url : "http://www.sapo.pt"     , size : popupSize, position : { top : popupSize.height, left : 0 } },
  { id : "duckduckgo", url : "https://duckduckgo.com/", size : popupSize, position : { top : popupSize.height, left : popupSize.width } }
];

function props(pw) {
  return "width=" + pw.size.width + ",height=" + pw.size.height + ",top=" + pw.position.top + ",left=" + pw.position.left;
}

html = "<ul>\n<li>" + 
  popupWindows
    .map(function(pw) { return "<a id='" + pw.id + "' href='" + pw.url + "' target='_blank'>" + pw.id + "</a>" })
    .join("</li>\n<li>")
  + "</li>\n</ul>";

js = 
  popupWindows
    .map(function(pw) { return "$('#" + pw.id + "').click(function() { window.open($(this).attr('href'), '', '" + props(pw) + "'); return false; })" })
    .join("\n");
    
// Here is were the magic happens
get(wd, "http://jsfiddle.net/");

select($(wd, "#js_lib"), "jQuery 2.x (edge)");

htmlEditor = $(wd, "#panel_html .CodeMirror-lines");
click(htmlEditor);
type($(wd), html);

jsEditor = $(wd, "#panel_js .CodeMirror-lines");
click(jsEditor);
type($(wd), js);

click($(wd, "#run"));

// Let's get all browser links...
var links = $(wd).frames().find("a[target]");

// and click them all
clickAll(links);

var windows = $(wd).windows();

$(wd).windows().find("[name=q], [name=p]").displayed();

var searchWindows = [
  windows.find("title").withText("Google").root().freeze(),
  windows.find("title").withText("Bing").root().freeze(),
  windows.find("title").withText("SAPO - Portugal Online!").root().freeze(),
  windows.find("title").withText("Search DuckDuckGo").root().freeze()
];

searchWindows.forEach(function(sw) {
  var searchbox = sw.find("[name=q], [name=p]").displayed();
  fill(searchbox, "Minion");
  sendKeys(searchbox, Keys.ENTER);
  scrollIntoView(sw.find("h3 a, h2 a").withText("Minion - Wikipedia, the free encyclopedia"));
});

windows.find("h3 a, h2 a").withText("Minion - Wikipedia, the free encyclopedia");

searchWindows.forEach(function(sw) {
  var link = sw.find("h3 a, h2 a").withText("Minion - Wikipedia, the free encyclopedia");
  click(link);
});

searchWindows.forEach(function(sw) {
  sw.close();
});

wd.quit();
