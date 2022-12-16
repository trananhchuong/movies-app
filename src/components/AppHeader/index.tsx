import styles from "./index.module.css";
import { ReactComponent as TMLDLogo } from "assets/images/tmdb_logo.svg";
import { useHistory, useLocation } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";


const AppHeader = (): React.ReactElement => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className={styles.root}>
      <IconButton
        aria-label="back"
        onClick={() => history.goBack()}
        style={{
          visibility: location.pathname === "/" ? "hidden" : "visible",
        }}
        className={styles.backBtn}
      >
        <ArrowBackIosRoundedIcon fontSize="large" />
      </IconButton>
      <TMLDLogo
        height={48}
        width={100}
        className={styles.appLogo}
        onClick={() => history.replace("/")}
      />
    </div>
  );
};

export default AppHeader;
