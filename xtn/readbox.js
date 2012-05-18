var ReadBox = {};

// Download the html for the page at given url.
// Makes a blocking, asynchronous request.
ReadBox.wget = function(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send(null);
  if (xhr.status == 200) {
    return xhr.responseText;
  } else {
    return '';
  }
};

// Appending .html makes Dropbox viewer open it as HTML.
ReadBox.getFileName = function(url) {
  return '/' + url.replace(/[^a-z]/gi, '') + '.html';
};
