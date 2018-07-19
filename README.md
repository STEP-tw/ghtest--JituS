# ghtest--JituS
Usage: 
node gitUtil.js [git username]

Configurations:

Create github token using this command : 
curl -i -u [your github user name] -d '{"scopes": ["repo", "user"], "note": "getting-started"}' https://api.github.com/authorizations

Export GIT_TOKEN environment variable : 
export GIT_TOKEN="token [sha]"