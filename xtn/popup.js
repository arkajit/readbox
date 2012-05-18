// Readbox Popup Extension

var writeToP = function(str) {
  var p = document.createElement('p');
  p.innerHTML = str;
  document.body.appendChild(p);
};

chrome.tabs.getSelected(null, function(tab) {
  DropLib.putFile(
      ReadBox.getFileName(tab.title),
      ReadBox.wget(tab.url),
      function(resp) {
        writeToP('Saved page to your Readbox at ' + resp['path']);
      });
});

