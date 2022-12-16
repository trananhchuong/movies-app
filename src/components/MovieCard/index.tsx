import styles from "./index.module.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CalendarToday from "@material-ui/icons/CalendarToday";
import { useHistory } from "react-router";

export type MovieCardProps = {
  title: string;
  year: string;
  id: string;
  poster: string;
};

const MovieCard = (props: MovieCardProps) => {
  const { title, year, id, poster } = props;
  const history = useHistory();
  const handleMovieSelect = () => {
    history.push(`/${id}`);
  };

  return (
    <Card className={styles.root}>
      <CardActionArea className={styles.cardArea} onClick={handleMovieSelect}>
        <CardMedia
          component="img"
          alt={title}
          height="400"
          image={poster}
          title={title}
          className={styles.poster}
        />
        <CardContent className={styles.overText}>
          <h2>{title}</h2>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.actionsContainer}>
        <Typography gutterBottom component="i" className={styles.yearSection}>
          <CalendarToday fontSize="small" />
          &nbsp;
          {year}
        </Typography>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
