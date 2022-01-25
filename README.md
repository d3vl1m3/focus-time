# Focus time!

## Quick links
1. [TL;DR](#tldr)
2. [Why do these timers help?](#why-do-these-timers-help)
3. [Developer P.O.I](#developer-poi)
4. [Getting started](#getting-started)
5. [Roadmap](#roadmap)

## TL;DR

The app is a simple [pomodoro timer](https://en.wikipedia.org/wiki/Pomodoro_Technique) that lets the user set up time intervals for focusing that are followed by short breaks.

Built with the intent of being a dumping ground for standardised approaches I use when developing applications.

You can [try the app now](https://d3vl1m3.gitlab.io/focus-time/) or dig through the code to see where the fun stuff happens 😎

## Why do these timers help?

The idea being that the user sets a timer and while it is in focus mode, they avoid anything that doesn't directly relate to what task they are currently working on.

After the 'focus interval' is complete, it is followed by a break (usually 3 to 5 minutes for a short breaks and maybe up to 10 minutes for a long break).

Tools like this are great for everyone needing some accountability for how their time is spent but these tools are especially useful for those of us who are neurodivergent and struggle with things like being easily distracted, [time blindness](https://add.org/adhd-time-blindness/), [hyperfocus](https://en.wikipedia.org/wiki/Hyperfocus) or [perfectionism](https://en.wikipedia.org/wiki/Perfectionism_(psychology)).

The breaks act as great stopping points to take a breather and quickly evaluate if what is being worked on is in fact what is the top priority right now.

## Developer P.O.I
- a11y by default for screen readers and keyboard users ([#a11yNextGenMentee](https://twitter.com/A11yNextgen))
- Best practices followed throughout as promoted on courses and blogs from industry influencers like:
    - [Kent C. Dodds](https://kentcdodds.com/)
    - [Tanner Linsley](https://tanstack.com/)
    - [Dominik Dorfmeister/TkDodo](https://tkdodo.eu/blog/)
- User-action driven tests - no code coverage focus
- Although... also 100% code coverage!! (`npm run test`)
- Performant enhanced tests that reduced testing runtime by 50%
- Consistent conventions to assure maintainability
- Easy-to-scan test files (`**/**/*.test.tsx`)
- Fully Type-hinted with TypeScript
- GitLab CI/CD pipeline (`.gitlab-ci-yml`)
- Pipeline enabled code coverage reports (`coverage/cobertura-coverage.xml`)
- Organised state management via React Context (`src/contexts`)
- Custom Hooks for ease of testing and re-usability (`src/hooks`)
- Tested using React Testing Library
- Built using the superpowers of coffee, ADHD and enthusiasm for the ecosystem 🦸

## Getting Started
1. Install NodeJs 14.x.x or above
2. Clone the project to your computer
3. Install the dependencies: `npm install` or `yarn install`
4. Run the development server: `npm run dev` or `yarn dev`
5. Open [http://localhost:3000](http://localhost:3000) with your browser to use the app

## Roadmap
- [x] ~~create basic Pomodoro timer~~
- [x] ~~add sound indicators when intervals change (started, breaks, completed etc.)
-~~
- [x] ~~allow user to choose a light/dark mode~~
- [ ] add a more readily available button to turn audio cues on/off
- [ ] add a 'how to use' section for people not familiar with Pomodoro
- [ ] add a 'useful information' section about the session (completed focus intervals etc.)
- [ ] integrate Spotify OAuth so instead of audio cues, the interval changes play/pause the users spotify service on any device
- [ ] allow users to select a playlist (or none) for each interval type (focus, breaks etc.)



