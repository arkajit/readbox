chrome.tabs.getSelected(null, function(tab) {
  put_file(get_file_name(tab.title), wget(tab.url));
});

