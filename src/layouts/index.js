import React from "react";
import styles from "./index.css";
import Header from "./Header";
import { BrowserRouter } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className={styles.normal}>
      <Header />
      <BrowserRouter>
        <div className={styles.content}>
          <div className={styles.main}>{children}</div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Layout;
