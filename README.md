# Reader App

A vocal assistant to help you making research without your keyboard!

This app was made with:

## Alan API

<a href="https://alan.app/">
<img src="./images/AlanStudio-app.svg" width="46" height="40"></a>

## News API

<a href="https://newsapi.org">
<img src="./images/news-api.png" width="70" height="40"></a>

## React

<a href="https://reactjs.org/">
<img src="./images/react.svg" width="50px" height="50px"></a>

### How to use it

You can see a demo -> [Reader-App](http://bedoyaalban.github.io/reader-app)

## Install dependencies

`npm install` Install all the dependencies

## Create an News API account

Go to <a href="https://newsapi.org"><img src="./images/news-api.png" width="20px" height="20px"></a> and create an account for free.

## Create an Alan account

Go to <a href="https://alan.app/"><img src="./images/AlanStudio-app.svg" width="20px" height="20px"></a> and create an account for free.

& create a new project.

## Use your key-app

Replace in the file ./src/App.js the alanKey by yours.

```javascript
const alanKey = "your Alan API Key";
```

## Scripts

Get your NewsApi Key and copy this code to your new project.

```javascript
// Use this sample to create your own voice commands
intent(
  "What does this app do?",
  "What can I do here?",
  reply("This is a news project")
);

intent("Hello", p => {
  p.play(
    "Welcome to the reader App! I am Alan your host. if you wanna know how to use the App say "
  );
  p.play("instructions");
});

const instr = [
  {
    id: 1,
    title: "Make any research",
    content: "Follow the instructions displayed on the CARDS"
  },
  { id: 2, title: "Make a new research", content: "Say: GO BACK" },
  {
    id: 3,
    title: "Open an article",
    content: "Say: OPEN and the NUMBER of the article at the bottom right"
  },
  {
    id: 4,
    title: "Interact with me",
    content: "You just have to press the BUTTON at the top right of this page"
  }
];

intent("Instructions", p => {
  p.play({ command: "instructions" });
  p.play("Would you like me to read the instructions");
  p.then(confirmInstructions);
});

const confirmInstructions = context(() => {
  intent("please (yes|) (sure|)", async p => {
    for (let i = 0; i < instr.length; i++) {
      p.play({ command: "read", instr });
      p.play(`${instr[i].title}`);
      p.play(`${instr[i].content}`);
    }
  });
  intent("no", p => {
    p.play("Sure, sounds good to me.");
  });
});

const API_KEY = "your News API Key";
let savedArticles = [];

// News by source
intent("Give me the news from $(source* (.*))", p => {
  let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
  if (p.source.value) {
    NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value
      .toLowerCase()
      .split(" ")
      .join("-")}`;
  }
  api.request(NEWS_API_URL, (error, response, body) => {
    const { articles } = JSON.parse(body);
    if (!articles.length) {
      p.play("Sorry, please try searching for news from a different source");
      return;
    }
    savedArticles = articles;
    p.play({ command: "newHeadlines", articles });
    p.play(`Here are the (latest|recent) ${p.source.value}`);
    p.play("Would you like me to read the headlines?");
    p.then(confirmation);
  });
});

// News by domain
intent("Can I have the news from $(source* (.*))", p => {
  let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
  if (p.source.value === "Zone") {
    NEWS_API_URL = `${NEWS_API_URL}&domains=dzone.com&language=en`;
  }
  if (p.source.value) {
    NEWS_API_URL = `${NEWS_API_URL}&domains=${p.source.value
      .toLocaleLowerCase()
      .replace(/\s+/g, "")}.com&language=en`;
  }
  api.request(NEWS_API_URL, (error, response, body) => {
    const { articles } = JSON.parse(body);
    if (!articles.length) {
      p.play("Sorry, please try searching for news from a different source");
      return;
    }
    savedArticles = articles;
    p.play({ command: "newHeadlines", articles });
    p.play(`Here are the (latest|recent) ${p.source.value}`);
    p.play("Would you like me to read the headlines?");
    p.then(confirmation);
  });
});

// News by term
intent("What's up with $(term* (.*))", p => {
  let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
  if (p.term.value) {
    NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`;
  }
  api.request(NEWS_API_URL, (error, response, body) => {
    const { articles } = JSON.parse(body);
    if (!articles.length) {
      p.play("Sorry, please try searching for something else");
      return;
    }
    savedArticles = articles;
    p.play({ command: "newHeadlines", articles });
    p.play(`Here are the (latest|recent) ${p.term.value}`);
    p.play("Would you like me to read the headlines?");
    p.then(confirmation);
  });
});

// News by Categories
const CATEGORIES = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology"
];
const CATEGORIES_INTENT = `${CATEGORIES.map(
  category => `${category}~${category}`
).join("|")}|`;

intent(
  `(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`,
  p => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=us`;
    if (p.C.value) {
      NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`;
    }
    api.request(NEWS_API_URL, (error, response, body) => {
      const { articles } = JSON.parse(body);
      if (!articles.length) {
        p.play("Sorry, please try searching for a different category.");
        return;
      }
      savedArticles = articles;
      p.play({ command: "newHeadlines", articles });
      if (p.C.value) {
        p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);
      } else {
        p.play(`Here are the (latest|recent) news`);
      }
      p.play("Would you like me to read the headlines?");
      p.then(confirmation);
    });
  }
);

const confirmation = context(() => {
  intent("yes (sure|) (please|)", async p => {
    for (let i = 0; i < savedArticles.length; i++) {
      p.play({ command: "highlight", article: savedArticles[i] });
      p.play(`${savedArticles[i].title}`);
    }
  });
  intent("no", p => {
    p.play("Sure, sounds good to me.");
  });
});

intent("open (the|) (article|) (number|) $(number* (.*))", p => {
  if (p.number.value) {
    p.play({
      command: "open",
      number: p.number.value,
      articles: savedArticles
    });
  }
});

intent("(go|) back", p => {
  p.play("Sure, going back");
  p.play({ command: "newHeadlines", articles: [] });
});
```

## Dev `npm start`

On localhost:3000 you can see the app.

## Build `npm build`

Create a build folder so you can deploy the app on
your favorite host!

## Deploy `npm run build` using Github pages

Replace the homepage in package.json file by your github username

```javascript
{}package.json
{
    "homepage": "http://{github-username}.github.io/reader-app"
}
```
