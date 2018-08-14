import React from 'react';
import styles from './CalculateSlider.scss'
import classNames from 'classnames/bind'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const cx = classNames.bind(styles);

const CalculateSlider = ({ selectPeople, handleSliderOnChange }) => {
  return (
      <div className={cx('slider-wrap')}>
        <Slider
            step={10} 
            min={0}
            max={100}
            defaultValue={selectPeople[0].percentage}
            trackStyle={{ backgroundColor: '#7950f2', height: 10 }}
            handleStyle={{
            borderColor: '#7950f2',
            height: 28,
            width: 28,
            marginLeft: -14,
            marginTop: -9,
            backgroundColor: '#845ef7',
            }}
            railStyle={{ backgroundColor: '#d0bfff', height: 10 }}
            onChange={handleSliderOnChange}
        />
    </div>
  );
}
export default CalculateSlider;


