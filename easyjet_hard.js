wd.get("http://www.easyjet.com/en/");

// let's switch to the frame
wd.switchTo().frame("tabco-iframe-1");

// let's search Paris
var from = wd.findElement(By.id("acOriginAirport"));
from.clear();
from.sendKeys("Paris");

// wait for suggestions to be visible
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("acOriginAirport_ddl")));

var suggestions = wd.findElements(By.cssSelector("#acOriginAirport_ddl li"));

// Now find Charles de Gaulle airport
for (i = 0; i < suggestions.size(); i++) {
  suggestion = suggestions.get(i);
  if (suggestion.getText().contains("Charles de Gaulle")) {
    suggestion.click();
    break;
  }
}