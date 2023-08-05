## **Iteration 04**

- Start date: July 25th, 2023
- End date: August 4th, 2023

## **Process**

Based on our last review, we decided to stick with daily standups and decided that everyone should work on independent stories so that story dependency is kept at a minimum. In this sprint, we focused on completing the remaining stories and the tournament feature. 

### Process Changes

- Daily standups - the first person to do their standup for the day reminds the whole team to do their standups in the group chat.

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

1. **********************Tournament Feature (Elham & Amey)**********************
    - As an Admin, I should be able to create tournaments for games (Valorant, Overwatch, etc) and update the winner/loser so that users are allowed to enter tournaments and notified before hand the tournament is about to start.
2. **********************Only View Friends’ Posts (Kevin)**********************
    - As a registered PlayBook user, I would like the ability to only view posts created by my friends so I don’t have to scroll through random posts and find them manually.
3. **Profile with Game Stats (Zusheng)**
    - As a registered Playbook user with a linked gaming account, I want to be able to see my in-game statistics.
4. ************************************Chat Notifications (Elham)************************************
    - As a Playbook User, I would like to receive notifications when I receive a new message so that I won't miss a message even when I am on another part of the website / on another chat.
5. **************View Other Profile Pages (Monte)**************
    - As a registered user, I would like to be able to view other Playbook User’s profile pages so that I can get to know them more and potentially add them as a friend.
6. ******************************Password Reset (Magen)******************************
    - As a PlayBook user, I want to be able to change my password, so that, in case I forget my password, I can recover my account via email.
7. **Search Users and Add Friends** ******************************(Amey)******************************
    - As a Playbook user, I want to be able to search for users and add them as friends, so that I can view their profile and posts
8. **Block Other Users** ********************************************************************(Kendrick)********************************************************************
    - As a Playbook user, I want to be able to block other accounts, so that I can avoid inappropriate behavior/harassment.

### **Artifacts**

1. ************************Closed PRs:************************ Closed PRs so that the TA can view the code and any relevant comments
2. ********************Local demo:******************** Have a local demo running so that we can give a demo of the completed features
3. ****Working Code for all Features above:**** We will have the working code on GitHub and the branches not deleted so that it is easy to see which code
    
    corresponds to which branch
