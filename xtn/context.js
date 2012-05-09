chrome.contextMenus.create({
  'title': 'Save to your Readbox',
  'contexts': ['page', 'link'],
  'onclick': function(info, tab) {
    var url = info['linkUrl'] || info['pageUrl'];
    put_file(get_file_name(url), wget(url));
   }
});
