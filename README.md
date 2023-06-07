# Playbook

 

## The “Why”

Want to chat with your gamer friends? Use Discord.

Want to check out how your gaming skills compare to theirs? User Tracker.gg.

Want to share your in-game achievements? Use gaming forums.

Want to FIND new gamer friends? Good luck using social media!

There is no SINGLE social networking platform that caters its user experience towards online multiplayer gamers, and acts as a central hub for them to find new people to play with, to chat with, and to share in-game achievements with.

## The “What”

Playbook is a one-stop shop solution for online multiplayer gamers. The platform allows gamers to share their in-game stats such as ranks, position, and play-style, and streamlines the process of finding new people to play with based on the in-game information that truly matters for each game. Playbook also allows gamers to post pictures and clips of their in-game achievements.

## The “How”

Playbook was created using:

- MongoDB
- Express.js
- React.js
- Node.js

## Requirements for installation

To run playbook locally you will need:

- node (at least version 16.0.0)
- npm (at least version 6.0.0)

To install these follow these guides/links:

https://nodejs.org/en/download

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

## Get Playbook

To run Playbook locally:

1. Clone the repository,
    1. run the following command
    2. [`git clone https://github.com/CSCC012023/final-project-s23-200-ok.git`](https://github.com/CSCC012023/final-project-s23-200-ok.git)
2. create a file called .env in the `server/`  directory in the following format:
    1. for the `MONGO_URI` environment variable, you will have to set up a cluster locally, you can follow the steps here: https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/ under the ATLAS UI section as it is the easiest to use
    
    ```jsx
    NODE_ENV=development
    MONGO_URI=[ADD YOUR MONGO CLUSTER URI HERE]
    PORT=5000
    ```
    
3. go to the server directory (`cd server`)  and run `npm i` to install backend dependencies
4. go to  the client directory (`cd client`) and run `npm i` to install frontend dependencies
5. go to the server directory (`cd server`)and then type the command `npm run dev`
6. the server should be running on port `5000` and you can access the page locally at `http://localhost:3000`

## Contributions

Playbook follows a git flow style of branching

To add your code:

1. Get a JIRA ticket assigned
2. Create a branch called `feature/<ticket number>-branch-name` from the develop branch
    1. for the `branch-name` make sure to call it something descriptive!
        1. If I was working on a ticket to add chat notifications I could call it `feature/CSCC01PROJ-13-chat-notifications`
        2. If I was working on a ticket to create a login page I could call it `feature/CSCC01PROJ-9-create-login-page`
3. Make changes and open a pull request
4. After a code review, get your changes merged 🙂
