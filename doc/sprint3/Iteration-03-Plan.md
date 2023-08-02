# Iteration-03-Plan.md

## **Iteration 03**

- Start date: July 13th, 2023
- End date: July 21th, 2023

## **Process**

Based on our last review, we decided to stick with daily standups and decided that everyone should work on independent stories so that story dependency is kept at a minimum. Also, just like Sprint 2 we decided to work on 2 other large features so that all the other stories can be complete during Sprint 4

### Process Changes

- Daily standups - but now the first person to do their standup for the day reminds the whole team to do their standups

### **Roles & Responsibilities**

1. ********Developers********
    
    Everyone is working on a ticket/story this sprint.
    
    Responsibilities are development and manual test (using Postman for the backend, and eye test for frontend, since unit testing is not required for this project).
    

  2. ****************Code Reviewers****************

Having designated code reviewers might slow down the process, so this sprint we will assign it to whoever is free and has the most experience with a related story.

Responsibilities are to review the code.

### **Events**

1. **Weekly Meetings:** Every Monday at 8:30AM, online. These are status update meetings to discuss progress, any issues, and next steps. Any additional meetings will be booked
2. ********Daily Standups:******** Every day by 11:59pm until end of the sprint, members will post daily standups/status updates on slack to notify everyone of their progress and any blockers so other team members can proactively provide support if necessary. 
3. **Code Reviews:** As necessary, online. The purpose is to maintain code quality and avoid potential future issues.
4. ********Group Demo:******** We will meet up before the sprint ends to demo the changes to the whole team. This will allow us to see any last-minute changes that need to be made to the app.

### **Artifacts**

1. ************JIRA:************ JIRA sprint & kanban board
2. **********************Local Demo:********************** A working, bug free version of all the features implemented so far.
3. **Task Board (JIRA):** For tracking story completion and assignments.
4. ************Standup Messages************: Our standup messages on Slack will also show our progress and organization

### **Git / GitHub Workflow**

Playbook follows a git flow style of branching

To add your code:

1. Get a JIRA ticket assigned
2. Create a branch called `feature/<ticket number>-branch-name` from the develop branch
    1. for the `branch-name` make sure to call it something descriptive!
        1. If I was working on a ticket to add chat notifications I could call it `feature/CSCC01PROJ-13-chat-notifications`
        2. If I was working on a ticket to create a login page I could call it `feature/CSCC01PROJ-9-create-login-page`
3. Make changes and open a pull request into `develop`, fix any merge conflicts if necessary
4. Ask in the discord for people who are free to review it
5. After the reviewer reviews and approves it, the author of the PR then squashes and merges it 

## **Product**

### **Goals and tasks**

1. **********************Create a Simple Chat Feature (Elham)**********************
    - As a registered user, I should be able to create a chat with another user, so that I can communicate with them in real-time
2. **********************Add timestamps to Chats (Elham)**********************
    - As a Playbook User, I would like to know what times messages were sent, so that I can keep track of the conversation
3. **Create Friends Functionality (Amey)**
    - As a registered user, I want to add other users as friends, so that I can conveniently access their posts, activities, and chat
4. ************************************Be Able to View Reactions to Posts (Kendrick)************************************
    - As a Playbook user, I would like to see the number of each reaction under each post,  so that I can see what the community thinks about a particular post.
5. **************Add Deletion of Accounts (Monte)**************
    - As a registered user, I would like to delete my account, so that my information is gone for good if I stop using Playbook
6. ******************************Add Email Confirmation (Magen)******************************
    - As a user interested in PlayBook, I want my email to be verified during the registration process so that I can securely use it to reset my password in the future.
7. ******************************Add the Ability to Create Video Posts (Zusheng)******************************
    - As a Playbook user, I would like to be able to create video posts, so that I can share cool videos with the community
8. ********************************************************************Create an LFG Post Comment Feature (Kevin)********************************************************************
    - As a Playbook user looking for a group, I would like the ability to chat with the poster in the LFG section, so that I can queue up to play a game with a desired group of other players.

### **Artifacts**

1. ************************Closed PRs:************************ Closed PRs so that the TA can view the code and any relevant comments
2. ********************Local demo:******************** Have a local demo running so that we can give a demo of the completed features
3. ****Working Code for all Features above:**** We will have the working code on GitHub and the branches not deleted so that it is easy to see which code
    
    corresponds to which branch