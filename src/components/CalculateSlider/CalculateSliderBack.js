import React, { Component } from 'react';
import styles from './CalculateSlider.scss'
import classNames from 'classnames/bind'
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Handle = Slider.Handle;

const cx = classNames.bind(styles);

class CalculateSlider extends Component {
    

    handle = (props) => {
        const { value, dragging, index, ...restProps } = props;
        const { selectPeople, handleTootipData } = this.props;
        
        selectPeople[0].percentage = value;
        handleTootipData(selectPeople[0]);

        return (
          <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={`${selectPeople[0].name} ${value} %`}
            visible={dragging}
            placement="top"
            key={index}
          >
            <Handle value={value} {...restProps} />
          </Tooltip>
        );
      };
    render() {
      const { selectPeople } = this.props;
        const { handle } = this;
        return (
            <div className={cx('slider-wrap')}>
           <Slider
                step={10} 
                min={0}
                max={100}
                defaultValue={selectPeople[0].percentage}
                handle={handle} 
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
            />
        </div>
        );
    }
}
export default CalculateSlider;


