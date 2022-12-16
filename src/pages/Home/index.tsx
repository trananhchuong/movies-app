import { Grid } from "@material-ui/core";
import moviesApi from "api/moviesApi";
import MovieCard from "components/MovieCard";
import Skeleton from "components/MovieCard/Skeleton";
import SearchBox from "components/SearchBox";
import { getImageFullPath } from "constants/apiConstants";
import { ReactElement, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import styles from "./index.module.css";

const Home = (): ReactElement => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
    remove();
    setTimeout(() => {
      refetch();
    }, 1000);
  }, [searchText]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const fetchMovies = async ({ pageParam = 1 }) => {
    // const data = await service.get(CONSTANTS.BASE_URL, {
    //   s: searchText,
    //   page: pageParam,
    // });

    const dataResponse = await moviesApi.getListMoviesTheaters({
      page: pageParam,
    });
    return dataResponse;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isLoading,
    refetch,
    remove,
  } = useInfiniteQuery(`movies`, fetchMovies, {
    getNextPageParam: (lastPage: any, pages) => {
      return +lastPage.total_results > currentPage * 10
        ? currentPage + 1
        : null;
    },
    enabled: !!searchText.length,
    onSuccess: (data) => {
      setCurrentPage(currentPage + 1);
    },
    refetchOnWindowFocus: false,
  });

  const MoviesLoader = (itemCount: number): ReactElement => {
    return (
      <Grid container spacing={2}>
        {[...new Array(itemCount)].map((_, i: number) => (
          <Grid item xs={12} md={3} key={i}>
            <Skeleton />
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderListMovies = () => {
    try {
      if (!!data) {
        return (
          <InfiniteScroll
            dataLength={
              data.pages.reduce((a, b) => {
                return { results: [...a.results, ...b.results] };
              }).results.length
            }
            next={fetchNextPage}
            hasMore={hasNextPage || false}
            loader={MoviesLoader(4)}
            style={{ overflow: "hidden" }}
          >
            <Grid container spacing={2}>
              {data.pages
                .reduce((a, b) => {
                  return { results: [...a.results, ...b.results] };
                })
                .results.map((item: any) => {
                  const { title, id, release_date, poster_path } = item;

                  return (
                    <Grid item xs={12} md={3} key={id}>
                      <MovieCard
                        {...{
                          title,
                          id,
                          year: release_date,
                          poster: getImageFullPath(poster_path),
                        }}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </InfiniteScroll>
        );
      } else {
        return <>No Result</>;
      }
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:80 ~ renderListMovies ~ error", error);
    }
  };

  return (
    <div className={styles.root}>
      <Grid container justify="center">
        <Grid item xs={12} sm={10}>
          <Grid container justify="center">
            <Grid item xs={12} md={4}>
              <SearchBox
                className={styles.resultsBox}
                onChange={handleSearchChange}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} className={styles.movieListContainer}>
            {/* Loading state */}
            {isLoading && MoviesLoader(8)}

            {/* Success state */}
            {isSuccess && renderListMovies()}

            {/* Error state */}
            {!!error && (
              <div className={styles.errorMessageContainer}>
                {JSON.stringify(error)}
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
