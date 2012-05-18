// Readbox Context Extension

chrome.contextMenus.create({
  'title': 'Save to your Readbox',
  'contexts': ['page', 'link'],
  'onclick': function(info, tab) {
    var url = info['linkUrl'] || info['pageUrl'];
    DropLib.putFile(ReadBox.getFileName(url), ReadBox.wget(url));
   }
});
