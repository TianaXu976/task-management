import React from 'react'
import classnames from "classnames/bind";
import styles from "./style.module.scss";

// components
import AddList from "../base/AddList";

const cx = classnames.bind(styles);

export default function TodoList() {
  return(
    <div className={cx('container')}>
      <AddList />
    </div>
  )
}