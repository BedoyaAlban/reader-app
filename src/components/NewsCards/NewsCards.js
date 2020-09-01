import { Grid, Grow, Typography } from "@material-ui/core";
import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import useStyles from "./styles";

const infoCards = [
  {
    color: "#252D92",
    title: "News by Domains",
    info: "TechCrunch, The Next Web, Reddit, Zone =>(Dzone), Site Point...",
    text: "Can I have the news from TechCrunch",
    id: 1
  },
  {
    color: "#542592",
    title: "News by Categories",
    info:
      "Business, Entertainment, General, Health, Science, Sports, Technology...",
    text: "Give me the latest Technology news",
    id: 2
  },
  {
    color: "#8A2592",
    title: "News by Terms",
    info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
    text: "What's up with PlayStation 5",
    id: 3
  },
  {
    color: "#92252D",
    title: "News by Sources",
    info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
    text: "Give me the news from CNN",
    id: 4
  }
];

const NewsCards = ({ articles, activeArticle }) => {
  const classes = useStyles();

  if (!articles.length) {
    return (
      <Grow in>
        <Grid
          className={classes.container}
          container
          alignContent="stretch"
          spacing={3}
        >
          {infoCards.map(infoCard => (
            <Grid
              key={infoCard.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className={classes.infoCard}
            >
              <div
                className={classes.card}
                style={{ backgroundColor: infoCard.color }}
              >
                <Typography variant="h5">{infoCard.title}</Typography>
                {infoCard.info ? (
                  <Typography variant="h6">
                    <strong>{infoCard.title.split(" ")[2]}:</strong>
                    <br />
                    {infoCard.info}
                  </Typography>
                ) : null}
                <Typography variant="h6">
                  Try saying: <br />
                  <i>{infoCard.text}</i>{" "}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }
  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignContent="stretch"
        spacing={3}
      >
        {articles.map((article, i) => (
          <Grid key={i} item xs={12} sm={6} lg={3} style={{ display: "flex" }}>
            <NewsCard article={article} i={i} activeArticle={activeArticle} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default NewsCards;
