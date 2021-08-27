import React from 'react';
import styles from"../../styles/main.scss"
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);


export default function Home() {
  return(
    <div className={cx('home')}></div>
  )
}