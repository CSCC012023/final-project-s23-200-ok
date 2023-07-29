# Product.md

### Q1: What are you planning to build?

- Social media ****************website**************** for multiplayer gamers
- Problem: There is no single website where multiplayer gamers can find people can share their in-game achievements, find people to play with and socialize.
    - ****************Use case -**************** I want to find VALORANT and Overwatch players who are around my skill level. I can filter PlayBook users by the games they play and their skill level to find people to connect with.
    - ****************Use case -**************** I am in a VALORANT party of 4 and am looking for a 5th player ASAP. I can use PlayBook’s Looking For Group (LFG) feature to find teammates in real-time.
    - ****************Use case -**************** I want to let people know about my rank, stats, contact info and in-game achievements (e.g. post previous game KDA). On PlayBook, I can set my rank and other in-game stats in my BIO, share my socials (instagram, twitter, twitch, tiktok, Discord, etc.), as well as post pictures for my followers to see.
    - Interactive Features: Posting feed, Chatting, "Looking for Group" (LFG) feature

### Q2: Who are your target users? (2-3 personas)

- Jim
    - Personal Details: Casual Gamer
    - Gaming Habits: Plays in leisure time and for fun
    - Needs and Challenges: Finding fellow gamers to play with to make gaming more fun
    - **Bio**
        - Jim is a 30-year-old Product Manager. He has other responsibilities such as taking care of his family. On weekends and after a long day, he likes to de-stress by playing games. He really only plays video games for the fun of it and the sense of progression he gets from time to time.
        - He plays League of Legends and Overwatch for about 8-10 hours per week. He doesn't really care about his ranks and isn't too competitive, but he really enjoys playing with other people and loves the social aspect of these games.
    - **Frustrations**
        - Jim’s main frustration is not having many people to play with. As a very outgoing person, he would love to be able to find people to play with easily and also share things with a community that is like-minded.
    - **********PlayBook**********
        - Jim wants to use PlayBook because of the LFG, friends, chatting, and post features
- Amy
    - Personal Details: Highly Competitive Gamer
    - Gaming Habits: Regular participant in gaming tournaments, typically in the top %0.5 of players in every game she plays
    - Needs and Challenges: Sharing achievements, Improving ranks, Finding
    - Bio
        - Amy is a  21-year-old University student. She plays competitive games in her free time and enjoys the high stakes of playing the best of the best.
        - She also sees a potential pro career in her future. Amy plays for 20-30 hours per week, constantly trying to improve her skills, find like-minded teammates, and share her achievements
    - Frustrations
        - Amy wants to be able to share her achievements to create a brand image that attracts scouts. She has a hard time finding equally skilled players to practice with and complement her play style.
    - PlayBook
        - Amy wants to use PlayBook to express her skill through her profile and posts as well as find gamers that are her skill level (LFG)
- Tyler
    - Personal Details: Streamer
    - Gaming Habits: Plays video games and streams them for 40-60 hours per week
    - Needs and Challenges: Expanding his user base, creating content, connecting with fans and other streamers.
    - Bio
        - Tyler is a 26-year-old Streamer. Streaming/gaming is his full-time job. He dedicates 40-60 hours per week to playing video games and streaming them to his audience on Twitch and posting videos on Youtube.
        - Tyler loves playing games, but playing games is also how Tyler makes a living. He is always thinking about how to get more viewers, create engaging content, and share his videos and streams.  Tyler also loves to connect and play games with the community, whether it be other streamers of similar size or his fans
    - Frustrations
        - Tyler wants to get more viewers and connect with his community. He wants a platform where he can connect with the community and share as much content as possible to his target audience.
    - PlayBook
        - Tyler wants to use PlayBook for the posting features to post clips, links to his videos/streams.

### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

- Existing Solutions: General social media platforms, Gaming forums, Discord, Tracker.gg
- Problems with Existing Solutions:
    - No single platform provides all these features, except PlayBook

|  | General Social Media Platforms | Gaming Forums | Discord | Tracker.gg | PlayBook |
| --- | --- | --- | --- | --- | --- |
| Connect with new people | ✓ | ✗ | ✗ | ✗ | ✓ |
| See people’s in-game stats | ✗ | ✗ | ✗ | ✓ | ✓ |
| Post in-game achievements | ✗ | ✓ | ✗ | ✗ | ✓ |

# **PlayBook**

- How PlayBook Solves These Problems
    - Ease of use: Unified platform for all the problems
    - Discovery of New Information: Introduce gamers to new partners, games, strategies through filtering and LFG
    - More Accurate and/or Informative Data: Game-specific user profiles for all games in one profile
- For the persona use-cases, refer to the PlayBook section for each person

### Q4: What does "DONE" mean to your Team

- We want these features to work for sure:
    - Posts
        - A wall with all posts within a time frame (have to refresh to see live posts)
        - A wall with only posts from people the user follows
        - Likes on posts
    - Bio page (stats)
        - Stats - ranks from different games, in-game name
        - Profile picture
        - Socials - links to Twitch, Instagram etc.
    - LFG
        - A user should be able to make a post on the LFG sections
    - Chat
        - a user should be able to chat with other friends

---

### **Highlights**

- Key Decision 1: Choosing MERN stack for development
    - Alternatives Considered: Phone app (Java/Angular, .NET/React)
    - Arguments Alternative: more users potentially
    - Reason for Final Decision: Familiarity, Ease of use
- Key Decision 2: Implementing chat
    - Alternatives Considered: no chat feature
    - Arguments for Each Alternative: Easier to develop
    - Reason for Final Decision: Better application with chats
- Key Decision 3: "Looking for Group" feature
    - Alternatives Considered: just having posts instead of separate feature
    - Arguments for Each Alternative: User needs, complexity
    - Reason for Final Decision: Easy teaming up, better user experience
- Key Decision 4: Git flow for version control
    - Alternatives considered: random no branching strategy
    - Arguments for Each Alternative: less strict when developing
    - Reason for Final Decision: More organized, less chances of failing code, better in the long-term, industry standard
- Team Organization Method: Agile development, regular Scrum meetings
- Frequency of Meetings: Daily stand-ups on Slack, using Discord for communication
- Tools Used: Git for version control, JIRA for project management
