import { Grid, IconButton } from "@material-ui/core";
import moviesApi from "api/moviesApi";
import MovieCard from "components/MovieCard";
import Skeleton from "components/MovieCard/Skeleton";
import SearchBox from "components/SearchBox";
import { getImageFullPath } from "constants/apiConstants";
import { ReactElement, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import styles from "./index.module.css";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { LAYOUT_TYPE, TAB_TYPE } from "constants/tabConstants";

import AppsIcon from "@material-ui/icons/Apps";
import ListIcon from "@material-ui/icons/List";

const Home = (): ReactElement => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [layoutType, setLayoutType] = useState(LAYOUT_TYPE.GRID);
  const [tabValue, setTabValue] = useState(TAB_TYPE.NOW_PLAYING);

  useEffect(() => {
    setCurrentPage(0);
    remove();
    setTimeout(() => {
      refetch();
    }, 1000);
  }, [searchText, tabValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const getApiByTab = (tab: string, params: any) => {
    switch (tab) {
      case TAB_TYPE.NOW_PLAYING:
        return moviesApi.getListMoviesTheaters(params);

      case TAB_TYPE.TOP_RATED:
        return moviesApi.getListMoviesTopRated(params);

      default:
        return moviesApi.getListMoviesTheaters(params);
    }
  };

  const fetchMovies = async ({ pageParam = 1 }) => {
    // const data = await service.get(CONSTANTS.BASE_URL, {
    //   s: searchText,
    //   page: pageParam,
    // });

    const params = {
      page: pageParam,
    };

    const dataResponse = await getApiByTab(tabValue, params);
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
    status,
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

  const getIsLoading = () => {
    if (status !== "success" || isLoading) return true;
    return false;
  };

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

                  const isLayoutGrid = layoutType === LAYOUT_TYPE.GRID;

                  return (
                    <Grid
                      item
                      xs={12}
                      key={id}
                      {...(isLayoutGrid && { md: 3 })}
                    >
                      <MovieCard
                        {...{
                          title,
                          id,
                          year: release_date,
                          poster: getImageFullPath(poster_path),
                          isLayoutGrid
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

  const handleChangeTab = (event: React.ChangeEvent<{}>, tabChange: string) => {
    setTabValue(tabChange);
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

          <Grid container justify="center" className={styles.tabBox}>
            <Grid item xs={12} md={4}>
              <Tabs
                value={tabValue}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Now playing" value={TAB_TYPE.NOW_PLAYING} />
                <Tab label="Top rated" value={TAB_TYPE.TOP_RATED} />
              </Tabs>
            </Grid>
          </Grid>

          <Grid container justify="flex-end" className={styles.layout}>
            <Grid container item xs={12} md={4} justify="flex-end">
              <IconButton
                aria-label="back"
                onClick={() => {
                  setLayoutType(LAYOUT_TYPE.GRID);
                }}
                className={styles.buttonLayout}
              >
                <AppsIcon />
              </IconButton>

              <IconButton
                aria-label="back"
                onClick={() => {
                  setLayoutType(LAYOUT_TYPE.LIST);
                }}
                className={styles.buttonLayout}
              >
                <ListIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Grid item xs={12} className={styles.movieListContainer}>
            {/* Loading state */}
            {getIsLoading() && MoviesLoader(8)}

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
