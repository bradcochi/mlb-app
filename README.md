# MLB App

### Relevant links:
- NextJS: [Docs \| Next.js](https://nextjs.org/docs)
  - FYI: NextJS recently released v13 which has slightly different documentation than the versions before that.  There is a dropdown in the top left corner of the NextJS docs. Whenever you are looking at the NextJS make sure "Using App Router" is always the selected option in that dropdown and not "Using Pages Router".  "Using Pages Router" means the displayed documentation applies to older versions of NextJS.
- Tailwind (CSS utility framework): [Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.](https://tailwindcss.com/)
- MLB Scoreboard Page: [MLB Scores: Real-time baseball scores and highlights \| MLB.com](https://www.mlb.com/scores)
- MLB Single Game Page: [D-backs 7, Tigers 5 Final Score (06/11/2023) on MLB Gameday \| MLB.com](https://www.mlb.com/gameday/d-backs-vs-tigers/2023/06/11/717804/final/box)
- MLB Schedule API example endpoint: https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=2023-6-8&endDate=2023-6-8
- MLB Single Game API example endpoint: https://statsapi.mlb.com/api/v1.1/game/717844/feed/live

### Layout
- All pages will have a header with the MLB logo in the middle
- Clicking on the logo will take you to the Home Page

### Scoreboard Page
- This will be the home page of the app (`/`)
- On page load retrieve games for today from MLB Schedule API and save to state
- Date picker at the top of the page
  - We can start off by just using the built in HTML date picker: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
  - Set the default selected date as today
  - When a new date is selected refetch games from the MLB Schedule API for the new date and save to state
- Display a grid of gaem boxes for the selected date
  - Each box displays a single game's data
  - Game boxes should mimic this styling/layout/content from the MLB Scoreboard page: ![Screenshot 2023-06-12 at 12.52.09 PM.png](:storage/5710565b-1beb-4c98-a0ca-b24d15329093/c128bca4.png)
  - v1: Show top Final/Time section, teams/score section, and only "Box" link at the bottom
  - v2: Show pitchers section, add card hover effects
  - If game has been completed the top section should show "FINAL"
  - If game is in the future the top section should show game start time in this format: 6:40 PM ET
  - Clicking on the "Box" link should take you to the Single Game Page for that game

### Single Game Page
- The route for this page will be `game/[gameID]`
- On page get game data from MLB Single Game API using `gameID` from the URL and save to state.  Use the `useRouter` hook to get `gameID`: [Functions: useRouter \| Next.js](https://nextjs.org/docs/app/api-reference/functions/use-router)
- Completed games:
  - Page layout should roughly follow layout at this URL with minor changes: [Mets 5, Braves 7 Final Score (06/07/2023) on MLB Gameday \| MLB.com](https://www.mlb.com/gameday/mets-vs-braves/2023/06/07/717850/final/box)
  - Layout will be a 2 columns
    - The left column will be 2/3 width
    - The right column will be 1/3 width
  - Left column:
    - ![Screenshot 2023-06-12 at 1.57.55 PM.png](:storage/5710565b-1beb-4c98-a0ca-b24d15329093/84111dbb.png)
    - ![Screenshot 2023-06-12 at 2.00.05 PM.png](:storage/5710565b-1beb-4c98-a0ca-b24d15329093/1783256f.png)
    - v2: Show Team Comparison table:
    - ![Screenshot 2023-06-12 at 2.08.04 PM.png](:storage/5710565b-1beb-4c98-a0ca-b24d15329093/940c2bcc.png)
  - Right column:
    - Box only, no Summary so that top section can be removed
    - Will two buttons at the top, one for each team name
    - Clicking on a team name will switch the box view below it to show that team's data
    - Should have two tables, one for batting and one for pitching
    - We do not need to show the text sections below each table
    - ![Screenshot 2023-06-12 at 2.02.14 PM.png](:storage/5710565b-1beb-4c98-a0ca-b24d15329093/29821c68.png)
- Upcoming games
  - Page layout should roughly follow layout at this URL with minor changes: [Follow Braves at Tigers game on 06/12/2023 free with MLB Gameday \| MLB.com](https://www.mlb.com/gameday/braves-vs-tigers/2023/06/12/717790/preview)
    - Will not have "Buy Tickets" section/button
    - Will not have "Follow the Game" section.  "Probable Pitchers" section will instead be full width to fill in the space
    - Will not have "Matchups" section, only "Lineups" section