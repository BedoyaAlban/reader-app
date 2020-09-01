import alanBtn from "@alan-ai/alan-sdk-web";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import wordsToNumbers from "words-to-numbers";
import Modal from "./components/Modal/Modal";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles";

const alanKey =
  "b971eb17fb7af4e13158c416974f8c852e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  // Loop with O read article +1
  const [activeArticle, setActiveArticle] = useState(-1);
  const [open, setOpen] = useState(false);
  const [instr, setInstr] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number, instr }) => {
        switch (command) {
          case "newHeadlines":
            setNewsArticles(articles);
            setActiveArticle(-1);
            setOpen(false);
            break;
          case "instructions":
            setOpen(true);
            break;
          case "read":
            setInstr(instr);
            break;
          case "highlight":
            setActiveArticle(prevActiveArticle => prevActiveArticle + 1);
            break;
          case "open":
            const parsedNumber =
              number.length > 2
                ? wordsToNumbers(number, { fuzzy: true })
                : number;
            const article = articles[parsedNumber - 1];

            if (parsedNumber > 20) {
              alanBtn().playText("Please try that again...");
            } else if (article) {
              window.open(article.url, "_blank");
              alanBtn().playText("Opening...");
            } else {
              alanBtn().playText("Please try that again...");
            }
            break;
          default:
            setInstr([]);
            setOpen(false);
            setNewsArticles([]);
        }
      },
      rootEl: document.getElementById("alan-btn"),
      top: "8rem"
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        <div id="alan-btn"></div>
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          className={classes.alanLogo}
          alt="alan logo"
        />
        <div className={classes.card}>
          <Typography variant="h5" gutterBottom>
            Start
          </Typography>
          <Typography variant="h6">
            Click to the :
            <br />
            <strong>MicroPhone Button</strong>
          </Typography>
          <Typography variant="h6">
            Say <strong>: Hello</strong>
          </Typography>
        </div>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal open={open} setOpen={setOpen} instr={instr} />
    </div>
  );
};

export default App;
