# PB.md

## Account

- ~~As a user interested in PlayBook,~~
    - ~~I want to register an account online,~~
    - ~~so that I can create a PlayBook account and start networking with fellow gamers.~~
    - ~~**GIVEN** the user is on the register page, **WHEN** they fill in their information, **THEN** a new account is created for them that they can log in to.~~
- As a user interested in PlayBook,
    - I want my email to be verified during the registration process,
    - so that I can securely use it to reset my password in the future.
    - **GIVEN** the user has been redirected to the email verification page, **WHEN** they type in the correct verification code, **THEN** their email should be marked as verified in the database and they should be redirected to the Login page.
- ~~As a PlayBook user,~~
    - ~~I want to log in, with my email and password~~
    - ~~so that I can access my PlayBook account.~~
    - ~~**GIVEN** the user is on the login page, **WHEN** type in a valid email address/username-password combination, **THEN** they are authenticated.**~~**
- As a PlayBook user,
    - I want to be able to change my password,
    - so that, in case I forget my password, I can recover my account via email.
    - **GIVEN** the user is on the login page, **WHEN** they click on “Forgot Password?”, **THEN** they receive an email with the password reset code on their verified email and get redirected to the Password Reset Code page.
    - **GIVEN** the user is on the Password Reset Code page, **WHEN** they type in the correct code, **THEN** they get redirected to the Password Reset page.
    - **GIVEN** the user is on the Password Code page, **WHEN** they type in their new password and submit, **THEN** their password gets reset and they get redirected to the Login page.

## User Profile

- ~~As a Playbook user,~~
    - ~~I would like to share a little about myself in my bio section,~~
    - ~~so that I can introduce myself to fellow users who come across my profile.~~
- ~~Given the user browses another user’s profile,~~
    - ~~when the user looks at the bio section,~~
    - ~~then the user should see a brief description of the person.~~
- ~~As a Playbook user,~~
    - ~~I would like to be able to have a profile picture,~~
    - ~~so that I can have a visual representation of myself for other users to see.~~
- ~~Given the user browses another user’s profile,~~
    - ~~when the user looks at the profile picture,~~
    - ~~then the user should see a visual representation of the person~~.
- ~~As a Playbook user,~~
    - ~~I want to connect my game account to Playbook,~~
    - ~~so that I can display my in-game username, region, rank, and the role I play in these games on my Playbook profile.~~
- ~~Given the user browses their own profile,~~
    - ~~when the user connects their game account to Playbook,~~
    - ~~then the user should be able to see their in-game username, region, rank, and role displayed.~~
- As a Playbook user,
    - I want to be able to block other accounts,
    - so that I can avoid inappropriate behavior/harassment.
- Given the user navigates to another user’s profile,
    - When the user selects the <block user> option,
    - Then the user should not receive any more messages/notifications from the other user.
- As a Playbook user,
    - I want to add other users as friends,
    - so that I can conveniently access their posts, activities, and chat.
- Given the user navigates to another user’s profile,
    - When the user selects the <add friend> option,
    - Then the user should be able to locate the friend’s profile under a tab.
- As a Playbook user,
    - I want to share links to my other socials,
    - so that I can connect with my friends on Playbook outside of the platform.
- Given the user navigates to their profile page,
    - When the user selects the <link socials> option,
    - Then the user should be able to upload links to their other socials to be displayed.
- As a Playbook user,
    - I want to see my games stats on my profile
    - So that I can show other people how good I am
- Given the user is logged in and they have a game linked
    - When they go to their profile
    - Then they should see some stats for that game

## Posts

- As a PlayBook user,
    - I would like the ability to show posts to friends only
    - so that I can have some privacy while also sharing posts with my friends.
        - Given a random user that uses PlayBook, when that user selects my post histories, then only posts that I made accessible to everybody will be shown
- As a PlayBook user, I
    - would like to create short video posts
    - so that I can share highlights and cool things that happened in my games with people
        - Given an authorized PlayBook user with the short video stored on his local machine, when he selects the option, “Create a Post”, then he should be able to include that short video within the post.
- ~~As a PlayBook user, I~~
    - ~~would like to create image posts~~
    - ~~so that I can send screenshots or memes to people~~
        - ~~Given an authorized PlayBook user with the short video stored on his local machine, when he selects the option, “Create a Post”, then he should be able to include that image within the post.~~
- ~~As a PlayBook user,~~
    - ~~I want to create text posts~~
    - ~~to express my opinions to the community.~~
        - ~~Given an authorized PlayBook user with the short video stored on his local machine, when he selects the option, “Create a Post”, then he should be able to include text within that post~~
- ~~As a PlayBook user,~~
    - ~~I would like to “react” to people’s posts~~
    - ~~so I can show support and engage other people from the communities.~~
        - ~~Given an authorized PlayBook user with access to other people’s post already, when he sends a “reaction” to a particular post, then his “reaction” should be stored in the server.~~
- As a Playbook user,
    - I would like to see the number of each reaction under each post
    - so that I can see what the community thinks about a particular post.
- ~~As a PlayBook user,~~
    - ~~I need the ability to delete my past posts~~
    - ~~so I can remove things that I don’t want people to see.~~
        - ~~Given an authorized PlayBook user with access to all of his own posts, when he no longer wants to share his posts, then he should be able to delete them from PlayBook~~
- ~~As a PlayBook user,~~
    - ~~I would like to trim my video before making a post~~
    - ~~so that I can create shorter and more engaging video posts for the community.~~
        - ~~Given an authorized PlayBook user, with the video on his local machine, when he creates a post, then there should be an option that lets him crop the video and post it.~~

## Looking for Group

- As a Playbook user looking for a group,
    - I would like the ability to chat with the poster in the LFG section
    - So that I can queue up to play a game with a desired group of other players.
- Given the user’s device is connected to internet and there is a post available,
    - when a user interacts with the post
    - Then the user and post owner should be able to chat
- ~~As a Playbook user trying to create a group,~~
    - ~~I would like the ability to create a group request in LFG section along with details such as how many spots are open and what roles are needed~~
    - ~~So that I can queue up to play a game with a desired group of other players.~~
- ~~Given the user is logged in,~~
    - ~~when the user visits the looking for group section,~~
    - ~~then the user should be able to make a new post to look for group with specific details.~~
- ~~As a Playbook user who created a group,~~
    - ~~I would like the ability to delete my LFG posts~~
    - ~~So that once my party is full, other users will not message me~~
- ~~Given the user is logged in and has posted one or more LFG posts,~~
    - ~~when the user visits the LFG section,~~
    - ~~then the user should be able to delete up to selected LFG posts created by the users.~~
- ~~As a Playbook user trying to join a group,~~
    - ~~I would like the ability to sort LFG posts by most recent~~
    - ~~So that I can see posts that have been posted recently.~~
- ~~Given the user is logged in and there is a LFG post available,~~
    - ~~when the user views the LFG posts,~~
    - ~~then the user should be able to sort the list of posts by date posted.~~
- ~~As a Playbook user trying to join a group,~~
    - ~~I would like the ability to filter through the list of posts by location or language, rank, and post status (number of spots open, closed, etc…)~~
    - ~~So that I can decide whether or not I want/ can join this party~~
- ~~Given the user is logged in and there is a LFG post available,~~
    - ~~when the user views the LFG posts,~~
    - ~~then the user should be able to filter the list of posts by location, language, rank, post status.~~

## Chat

- As a Playbook User,
    - I would like to send and receive messages with other users in real time
    - so that I can communicate with them.
- Given that I am a logged-in user
    - when I send a message to another user
    - then the other user receives the message in real-time
- Given that I am a logged-in user
    - when another user messages me
    - then I receive the message in real time
- As a Playbook User,
    - I would like to receive notifications when I receive a new message
    - so that I won't miss a message even when I am on another part of the website / on another chat.
- Given that I am a logged-in user
    - When I receive a chat message from another user
    - Then I should get a notification that I have received a new message
- As a Playbook User,
    - I would like to know what times messages were sent
    - so that I can keep track of the conversation
- Given that I am a logged-in user
    - When I send/receive a message to/from another user
    - Then I should be able to see what time the message was sent/received
