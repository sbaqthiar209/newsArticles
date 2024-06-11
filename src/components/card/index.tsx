import {
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./card.module.scss";
import { CardsDataModel } from "../../pages/home";
import { v4 as uuidv4 } from 'uuid';

type CardModel = CardsDataModel & {
  cardKey: number;
};

const Card: React.FC<CardModel> = (props: CardModel) => {
  const { title, url, image, date, body, source, author} = props;
  const serverUrl = "https://dev-storm-rest-api.pantheonsite.io";
  return (
    <Box className={styles.cardContainer} key={uuidv4()}>
      <Box className={styles.imageTitleContainer}>
        <Box className={styles.imageHolder}>
          <img src={`${serverUrl}${image}`} alt={title} />
        </Box>
        <Box className={styles.titleHolder}>
          <Box className={styles.top}>
            <Typography variant="body1">{date}</Typography>
            <Typography variant="body1">{source}</Typography>
          </Box>
          <Box className={styles.bottom}>{title}</Box>
        </Box>
      </Box>
      <Box className={styles.description}>{body}</Box>
      <Box className={styles.author}>
          <Typography variant="body1" fontWeight={"700"}>{author}</Typography>
      </Box>
    </Box>
  );
};
export default Card;
