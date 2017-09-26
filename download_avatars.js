var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader');

var GITHUB_USER = "kevinmore80";
var GITHUB_TOKEN = "af0cbb963d0b633bee35f463f49c076f599ba20a";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  request( {
    headers: {
      'User-Agent': "GitHub Avatar Downloader - Student Project",
    },
    url: requestURL
  }, function(err, response, body) {
    if (err) throw err;
    var temp = JSON.parse(body);
    cb(err,temp);
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach(function(element) {
    console.log(element['avatar_url']);
  });
});