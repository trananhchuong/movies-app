import { ReactComponent as NotInternetLogo } from "assets/images/not_internet.svg";
import styles from "./index.module.css";

NoNetWork.propTypes = {};

function NoNetWork() {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>
        There is a problem with the network connection, please check again
      </h2>
      <NotInternetLogo className={styles.notInternetImg} />
    </div>
  );
}

export default NoNetWork;
