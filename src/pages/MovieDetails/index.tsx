import { ReactElement } from "react";
import styles from "./index.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
// import service from "utils/service";
// import CONSTANTS from "utils/constants";
import { Grid } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import Divider from "@material-ui/core/Divider";
import Skeleton from "./Skeleton";
import moviesApi from "api/moviesApi";
import { getImageFullPath } from "constants/apiConstants";

const MovieDetails = (): ReactElement => {
  const { movieId } = useParams<{ movieId: string }>();

  const fetchDetailMovies = async () => {
    try {
      const dataResponse: any = await moviesApi.getDataDetailMovies(movieId);
      const {
        poster_path,
        id,
        title,
        vote_average,
        production_countries,
        vote_count,
        release_date,
        overview,
        runtime,
        genres,
        spoken_languages,
      } = dataResponse;

      const genresString = (genres || []).map((x: any) => x.name).join(", ");
      const languageString = (spoken_languages || [])
        .map((x: any) => x.name)
        .join(", ");
      const countryString = (production_countries || [])
        .map((x: any) => x.name)
        .join(", ");

      return {
        title,
        id,
        runtime,
        releaseDate: release_date,
        poster: getImageFullPath(poster_path),
        overview,
        voteAverage: Math.round(vote_average * 10) / 10,
        voteCount: vote_count,
        genres: genresString,
        country: countryString,
        language: languageString,
      };
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:21 ~ fetchDetailMovies ~ error", error);
    }
  };

  const { isSuccess, isLoading, error, data } = useQuery(
    [`movie`, movieId],
    fetchDetailMovies,
    {
      enabled: !!movieId,
    }
  );

  return (
    <div className={styles.root}>
      {/* Loading state */}
      {isLoading && <Skeleton />}

      {/* Success state */}
      {isSuccess && (
        // <div style={{ height: '100vh' }}>
        <Grid container justify="center">
          <Grid item xs={12} sm={10}>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <img
                  src={data?.poster}
                  alt={data?.title}
                  height="600"
                  width="100%"
                />
              </Grid>
              <Grid item xs={12} sm={8} className={styles.detailsSection}>
                <div className={styles.titleContainer}>
                  <div className={styles.title}>{data?.title}</div>
                  <div className={styles.ratingsRoot}>
                    <StarIcon fontSize="large" htmlColor="#e4bb24" />
                    <div>
                      <div className={styles.ratingsContainer}>
                        {data?.voteAverage}
                        <i>/10</i>
                      </div>
                      <div className={styles.votes}>{data?.voteCount}</div>
                    </div>
                  </div>
                </div>

                <div className={styles.subInfo}>
                  {/* <div>{data.Year}</div> */}
                  {/* <div>{data.Rated}</div> */}
                  <div>{data?.releaseDate}</div>
                  <div>{data?.runtime} min</div>
                </div>

                <div className={styles.plot}>{data?.overview}</div>

                <Divider light={false} />

                <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Genre :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data?.genres}
                  </Grid>
                </Grid>
                {/* <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Director :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data.Director}
                  </Grid>
                </Grid> */}
                {/* <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Writer :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data.Writer}
                  </Grid>
                </Grid> */}
                {/* <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Actors :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data.Actors}
                  </Grid>
                </Grid> */}
                <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Language :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data?.language}
                  </Grid>
                </Grid>
                <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Country :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data?.country}
                  </Grid>
                </Grid>
                {/* <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Overview :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data.overview}
                  </Grid>
                </Grid> */}
                {/* <Grid container className={styles.metaData}>
                  <Grid item xs={3} md={2} className={styles.metaLabel}>
                    Production :
                  </Grid>
                  <Grid item xs={9} md={10} className={styles.metaValue}>
                    {data.Production}
                  </Grid>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        // </div>
      )}

      {/* Error state */}
      {!!error && <div>{JSON.stringify(error)}</div>}
    </div>
  );
};

export default MovieDetails;
