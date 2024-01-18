/** Project list with description and links */
const projectList = [
  {
    title: "flaskPresent",
    link: "https://flask-present-production.up.railway.app/",
    code: "https://github.com/krzemGit/flaskTemplates",
    design:
      "https://www.dropbox.com/s/s4gcsu7xfu5uex5/flask_present_full.jpg?raw=1",
    tech: "Python / Flask / Javascript / SQLite",
    para1:
      "My first commercial project with python and Flask. A friend of mine, a back-end developer asked me to prepare some jinja templates that he could use for presenttion purposes for his app. After making the templates for him I added my own back-end and volia: a web app for making a present list. It includes several display options, one with a neumorphist design",
    para2:
      "In technical terms, the app is rather simple: a typical CRUD application with a simple SQLite database.The back-end is made with Python and Flask, nothing fency there. The visual side of the app was the emphasis here.",
  },
  {
    title: "pomodoroBoard",
    link: "https://finstinct-admin-development.up.railway.app",
    code: "/nomockup",
    design: "/nomockup",
    tech: "SvelteKit / SASS / MongoDB",
    para1:
      "My favourite project so far, created with Svelte and SveltKit to coordinate working on yet another project with my friend. Includes a kanban board, pomodoro counter, credentials list and a design system.",
    para2:
      "I wanted to experiment with SvelteKit and it turned aout to be almost axactly the same as Next.js, with minor differences. It works with MongoDB database and is deployed to Railway hosting. Mongo is rather slow, probably because of the authorization hook.",
  },
  {
    title: "ninjaMusicList",
    link: "https://musoninjas.web.app",
    code: "/nomockup",
    design: "/nomockup",
    tech: "Vue / Firebase / SASS",
    para1:
      "My favourite project made with Vue JS. An app for sharing favourite songs with friends, done as a part of tutorial, but later modified and improved.",
    para2:
      "Technically this is almost the newest Vue, with composition API and Firebase as a backend. The app is deployed to Firebase hosting. I used SASS for styling.",
  },
  {
    title: "bitInfo",
    link: "https://bit-info-30y7d1biy.vercel.app/",
    code: "https://github.com/krzemGit/bitInfo",
    design: "https://www.krzem.dev/no-mockup",
    tech: "React.js / Next.js / SASS / BEM / API",
    para1:
      "Several years ago me brother and I got interested in BitCoins and the crypto-currency market in general. Because of this old hobby and the fact that crypto-currencies have quite well developed internet support, with various APIs I decided to make an app with news and current exchange rates. This is a very dynamic environment, so I decided that React would be the best tool for the job.",
    para2:
      "This is my second React app, so I decided to use test new. My choice was Next.js as an interesting React framework. Although I have used very few features from the range offered by Next, I find the tool interesting. The app is deployed to Vercel - a dedicated platform for Next.js and React apps in general. I used a graphic library for displaying exchange rates.",
  },
  {
    title: "waether-app",
    link: "https://weatherapp.krzem.dev/",
    code: "https://github.com/krzemGit/weather-app-cards",
    design:
      "https://www.dropbox.com/s/75ogop1yi1qqskv/polish_weather_app.jpg?dl=0",
    tech: "React.js / SASS / BEM / API",
    para1:
      "This is my first React.js project, a typical one for all kinds of courses and bootcamps, so I wanted to add  little flavour to it: the weather in Polish cities is displayed on cards, which you can navigate using buttons and touch events on mobile phones. I tried to make it visually appealing and a little more advanced, hence the touch events and error handling.",
    para2:
      "This app is pure front-end, created with React.js (CRA) and SASS. The weather data is collected form an API, login data is stored in global variable at a Linux server. This is my second favourite project.",
  },
  {
    title: "infoService",
    link: "https://infoservice-production.up.railway.app/",
    code: "https://github.com/krzemGit/weather-app-cards",
    design: "https://www.krzem.dev/no-mockup",
    tech: "Node.js / Express / SASS / MongoDB",
    para1:
      "The idea for this project emerged during the Node.js course that I have taken several months ago: a news portal where you can read and add your own news. Addiditonal option is a poll that you can take and then see the results displayed in a graphical form. The layout is modeled on polish news service that I find quite well-developed and visually appealing.",
    para2:
      "The backend of this project is made in Node.js, with use of Express and Mongoose. The data from the polls and the articles are stored in a MongoDB database using Atlas. For the front-end I used JavaScript and Pug templating engine.",
  },
];

export default projectList;
