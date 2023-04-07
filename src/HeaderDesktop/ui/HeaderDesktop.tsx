import Link from "next/link";
import Image from "next/image";
import Logo from "../../Logo/Logo";

import { useEffect, useState } from "react";

import { useScrollTrigger } from "@mui/material";
import styles from "./header-desktop.module.scss";
import logo from "./logo.svg";

const HeaderDesktop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <>
      <header
        className={`${styles.header} ${trigger ? styles.header_sticky : ""}`}
      >
        <Logo
          href="/"
          src={logo}
          alt="Logo"
          width={110}
          height={81}
          className={styles.header__logo}
        />
        <nav className={styles.header__navbar}>
          <ul className={styles.header__items}>
            <li className={styles.header__item}>
              <Link className={styles.header__link} href={""}>
                {"Кинотеатр"}
              </Link>
            </li>
            <li className={styles.header__item}>
              <Link className={styles.header__link} href={""}>
                {"Новости"}
              </Link>
            </li>
            <li className={styles.header__item}>
              <Link className={styles.header__link} href={""}>
                {"Фанлаб"}
              </Link>
            </li>
            <li className={styles.header__item}>
              <Link className={styles.header__link} href={""}>
                {"Фаншоп"}
              </Link>
            </li>
            <li className={styles.header__item}>
              <Link className={styles.header__link} href={""}>
                {"Проекты"}
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.header__buttons}></div>
      </header>
    </>
  );
};

export default HeaderDesktop;
