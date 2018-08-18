import React from "react";
import styles from "./index.css";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

function Layout({ children }) {
  return (
    <BrowserRouter>
      <div className={styles.normal}>
        <Header />
        <div className={styles.content}>
          <div className={styles.main}>{children}</div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Layout;
