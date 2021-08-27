import React, { useRef, useState } from "react";
import classnames from "classnames/bind";
import styles from "./style.module.scss";
import PropTypes from "prop-types";

const cx = classnames.bind(styles);

ColorButton.propTypes = {
  colorType: PropTypes.string,
  selectColor: PropTypes.func,
  selectedColor: PropTypes.string,
};

export default function ColorButton(props) {
  const { colorType, selectColor, selectedColor } = props;

  return (
    <button
      className={cx("color-button", colorType, {
        active: selectedColor === colorType,
      })}
      onClick={(e) => selectColor(colorType)}
    />
  );
}
