var args = process.argv.slice(2);
var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader');

var GITHUB_USER = "kevinmore80";
var GITHUB_TOKEN = "af0cbb963d0b633bee35f463f49c076f599ba20a";

function getRepoContributors(repoOwner, repoName, cb) {

  if(!repoOwner || !repoName) {
    console.log ("Please enter valid values for both arguments");
    return;
  } else {

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
}

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath).on('close', function() {
    console.log("DONE");
  }));
}

getRepoContributors(args[0], args[1], function(err, result) {
  console.log("Errors:", err);
  result.forEach(function(element) {
    downloadImageByURL(element['avatar_url'], "./avatars/" + element['login'] + ".jpg");
  });
});