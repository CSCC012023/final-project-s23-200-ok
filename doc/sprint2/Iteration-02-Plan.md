# Iteration-02-Plan.md

## **Iteration 02**

- Start date: June 30th, 2023
- End date: July 7th, 2023 8:00A.M

## **Process**

Based on our last review, this sprint we improved our planning by trying to complete higher-priority stories first. We also planned to have standups every other day, however, due to other courses/responsibilities we had to start the sprint late, which forced us to have daily standups again.

### Process Changes

- Completing higher priority stories first which allows us ample time to complete other stories that depend on those higher priority stories.

### **Roles & Responsibilities**

1. ********Developers********
    
    Everyone is working on a ticket/story this sprint.
    
    Responsibilities are development and manual test (using Postman for backend, eye test for frontend, since unit testing is not required for this project).
    

  2. ****************Code Reviewers****************

Having designated code reviewers might slow down the process, so this sprint we will assign it to whoever is free and has the most experience with a related story.

Responsibilities are review the code.

### **Events**

1. **Weekly Meetings:** Every Monday at 8:30AM, online. These are status update meetings to discuss progress, any issues, and next steps. Any additional meetings will be booked
2. ********Daily Standups:******** Every day by 11:59pm until end of the sprint, members will post daily standups/status updates on slack to notify everyone of their progress and any blockers so other team members can proactively provide support if necessary. 
3. **Code Reviews:** As necessary, online. The purpose is to maintain code quality and avoid potential future issues.
4. ********Group Demo:******** We will meet up before the sprint ends to demo the changes to the whole team. This will allow us to see any last minute changes that need to be made to the app.

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

1. **Require authentication for profile/post/LFGpost creation(internal for profile, user doesn’t know) and access:**
    - As a user, I should only be able to access my profile/post/LFGpost when logged in.
    - So that I know my content is secure.
2. **Create a simple post functionality:**
    - As a registered user, I should be able to create, view, and delete a post.
    - As a registered user, I should be able to react to/like another user’s post so that I can show support and engage other people from the communities.
3. **Create a simple LFG post functionality:** 
    - As a registered user, I should be able to create and delete LFG posts so that other users can know if I am looking for a group.
    - As a Playbook user trying to join a group, I would like the ability to filter through the list of posts by location or language, rank, and post status (number of spots open, closed, etc…), So that I can decide whether or not I want/ can join this party.
    - As a Playbook user I would like to sort the posts by time of creation from Earliest to Latest or vice versa.

### **Artifacts**

1. ************************Closed PRs:************************ Closed PRs so that the TA can view the code and any relevant comments
2. ********************Local demo:******************** Have a local demo running so that we can give a demo of the completed features
3. ************************Working code for LFG:************************ Working code for features in LFG so that basic features for creating LFG posts are implemented.
4. ************************Working code for Posts************************: Working code for posts so that basic features for creating posts are implemented.
