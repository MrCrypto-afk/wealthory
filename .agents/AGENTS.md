# GitHub Deployment Protocol
Whenever the user requests changes to the codebase, the agent MUST automatically stage the changes, create a git commit with a descriptive message, and then automatically push the changes to GitHub using the token. 
The GitHub token is persistently saved in `.agents/github_token.txt` and is already embedded in the Git remote URL.
If the user ever asks for their GitHub token, read `.agents/github_token.txt` and provide it to them.
