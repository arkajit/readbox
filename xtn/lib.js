var writeToP = function(str) {
  var p = document.createElement('p');
  p.innerHTML = str;
  document.body.appendChild(p);
};

// Prefix with readbox.* to create a namespace?
if (!localStorage['has_dropbox_token']) {
  // Do Auth.

  localStorage['dropbox_oauth_token'] = '';
  localStorage['dropbox_oauth_token_secret'] = '';
  localStorage['dropbox_user'] = '';
}

var signUrl = function(api_path, use_content) {
  var base_url = use_content ? 'https://api-content.dropbox.com/1' :
      'https://api.dropbox.com/1';
  var dropbox_creds = {
  // ADD APP KEY and SECRETS HERE.
  };
  var result = OAuthSimple().sign({
    action: use_content ? 'POST' : 'GET',
    path: base_url + api_path,
    parameters: {},
    signatures: {
      consumer_key: dropbox_creds['app_key'],
      shared_secret: dropbox_creds['app_secret'],
      oauth_secret: dropbox_creds['oauth_token_secret'],
      oauth_token: dropbox_creds['oauth_token']
    }
  });
  return result.signed_url;
};

var put_file = function(dropbox_path, file_contents) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', signUrl('/files_put/sandbox' + dropbox_path, true), true);
  xhr.onload = function() {
    var response = JSON.parse(xhr.responseText);
    if (xhr.status == 200) {
      var out = 'Saved page to your Readbox at ' + response['path'];
      writeToP(out);
    } else {
      console.log(response['error']);
    }
  };
  xhr.send(file_contents);
};

var wget = function(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send(null);
  if (xhr.status == 200) {
    return xhr.responseText;
  } else {
    return '';
  }
};

var get_file_name = function(str) {
  return '/' + str.replace(/[^a-z]/gi, '') + '.html';
};
