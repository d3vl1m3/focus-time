# Focus time!

The app is a simple [pomodoro timer](https://en.wikipedia.org/wiki/Pomodoro_Technique) that lets the user set up time intervals for focusing that are followed by short breaks.

[Try the app now](https://d3vl1m3.gitlab.io/focus-time/)

## System requirements

- nodeJS (version 14.x.x or above recommended)

## Getting Started

1. Clone the project to your computer
2. Install the dependencies: `npm install` or `yarn install`
3. Run the development server: `npm run dev` or `yarn dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to use the app

## Why do these timers help?

The idea being that the user sets a timer and while it is in focus mode, they avoid anything that doesn't directly relate to what task they are currently working on.

After the 'focus interval' is complete, it is followed by a break (usually 3 to 5 minutes for a short breaks and maybe up to 10 minutes for a long break).

Tools like this are great for everyone needing some accountability for how their time is spent but these tools are especially useful for those of us who are neurodivergent and struggle with things like being easily distracted, [time blindness](https://add.org/adhd-time-blindness/), [hyperfocus](https://en.wikipedia.org/wiki/Hyperfocus) or [perfectionism](https://en.wikipedia.org/wiki/Perfectionism_(psychology)).

The breaks act as great stopping points to take a breather and quickly evaluate if what is being worked on is in fact what is the top priority right now.

## Roadmap
- [x] ~~create basic Pomodoro timer~~
- [x] ~~add sound indicators when intervals change (started, breaks, completed etc.)
-~~
- [x] ~~allow usder to choose a light/dark mode~~
- [ ] add a more readily available button to turn audio cues on/off
- [ ] add a 'how to use' section for people not familliar with Pomodoro
- [ ] add a 'useful information' section about the session (completed focus intervals etc)
- [ ] integrate Spotify OAuth so instead of audio cues, the interval changes play/pause the users spotify service on any device
- [ ] allow users to select a playlist (or none) for each interval type (focus, breaks etc.)



