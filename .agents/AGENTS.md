# GitHub Deployment Protocol
Whenever the user requests changes to the codebase, the agent MUST automatically stage the changes, create a git commit with a descriptive message, and provide the user with the command to push the changes to GitHub (`git push origin main`), or ask for their GitHub token if they prefer the agent to push it on their behalf.
