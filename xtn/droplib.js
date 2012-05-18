// A small library for calling out the Dropbox REST API. Implements only a subset
// of available API calls (i.e. those needed for ReadBox application).

var DropLib = {};

DropLib.ENDPOINT = 'https://api.dropbox.com/1';
DropLib.CONTENT_ENDPOINT = 'https://api-content.dropbox.com/1';
DropLib.CREDENTIALS = {
  'consumer_key': '<ENTER APP KEY>',
  'shared_secret': '<ENTER APP SECRET>'
};

// Ensures credentials are retrieved from local storage.
DropLib.getCredentials = function() {
  if (!localStorage['droplib.has_creds']) {
    // TODO(arkajit): Call out to Dropbox API to refresh OAuth tokens.
    //localStorage['droplib.oauth_secret'] = '<ENTER OAUTH SECRET>';
    //localStorage['droplib.oauth_token'] = '<ENTER OAUTH TOKEN>';
    //localStorage['droplib.has_creds'] = 'yes';
  }

  DropLib.CREDENTIALS['oauth_secret'] = localStorage['droplib.oauth_secret'];
  DropLib.CREDENTIALS['oauth_token'] = localStorage['droplib.oauth_token'];
  return DropLib.CREDENTIALS;
};

// Internal method for signing Dropbox API requests with your credentials.
DropLib.signUrl_ = function(url, opt_method) { 
  var method = opt_method || 'GET';
  return OAuthSimple().sign({
    action: method,
    parameters: {},  // Required, even if empty.
    path: url,
    signatures: DropLib.getCredentials(),  
  }).signed_url;
};

// Sends a put_file request to Dropbox.
DropLib.putFile = function(path, fileContents, callback) {
  var xhr = new XMLHttpRequest(),
      api_url = DropLib.CONTENT_ENDPOINT + '/files_put/sandbox' + path,
      signed_url = DropLib.signUrl_(api_url, 'POST');
  xhr.open('POST', signed_url, true);
  xhr.onload = function() {
    var response = JSON.parse(xhr.responseText);
    if (callback) {
      callback(response);
    }
  };
  xhr.send(fileContents);
};
