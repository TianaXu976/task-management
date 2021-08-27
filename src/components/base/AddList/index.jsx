import React, { useRef, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './style.module.scss';

// components
import ColorButton from './ColorButton';

const cx = classnames.bind(styles);

const colorList = ['red', 'yellow', 'green'];

export default function AddList(props) {
  const [selectedColor, setSelectedColor] = useState('red');
  const inputRef = useRef();

  return (
    <div className={cx("add-list")} >
      <div className={cx("color-picker")}>
        {colorList.map((color, index) =>(
          <ColorButton 
            key={index}
            colorType={color}
            selectColor={setSelectedColor}
            selectedColor={selectedColor}
          />
        ))}
      </div>
         
      <form  >
          <input
            id='addList'
            type='text'
            placeholder='Add a list'
            ref={inputRef}
            onBlur={() => inputRef.current.value = ''}
          />
        </form>
      
    </div>
  )
}