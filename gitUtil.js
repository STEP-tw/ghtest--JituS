const https = require('https');
const user = process.argv[2];

function getData(path, callback){
  const options = {
	    host : 'api.github.com',
	    port : 443,
	    path : path,
	    method : 'GET',
	    headers : {'Authorization': process.env.GIT_TOKEN,
	    			'User-Agent': 'curl/7.43.0'}
	};
  const req = https.request(options, callback).on('error', function(e){console.log(e)}).end();
}

function getCommitsCallback(repoName, language, created_at){
	return function (response) {
	  	var str = '';
	    response.on('data', function (chunk) {
	        str += chunk;
	    });
	    response.on('end', function () {
	    	var result = JSON.parse(str);
	    	console.log("Repo name -> " + repoName + ", Language -> " + language + ", Commits -> " + result.length + ", Created At -> " + created_at);
	    });
	}
}

function getRepos(response) {
  	var str = '';
    response.on('data', function (chunk) {
        str += chunk;
    });
    response.on('end', function () {
    	var result = JSON.parse(str);
    	console.log("User " + user + " has total " + result.length + " repos:\n______________________________")
    	result.map(function(each) {
    		getData("/repos/" + user + "/" + each.name + "/commits", getCommitsCallback(each.name, each.language, each.created_at.split("T")[0]));
    	});
    });
}
getData("/users/" + user + "/repos", getRepos);


