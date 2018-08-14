import React from 'react';
import styles from './CalculateFormInput.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

const CalculateFormInput = ({ value, value2, value3, handleChange, children })  => {
    
    return (
        <div>
            <div className={cx('todo-input')}>
                <input id={0} value={value} onChange={handleChange} placeholder="장소 ex) 오사카브루스"/>
            </div>
            {
                value.length > 0 && 
                <div className={cx('todo-input')}>
                    <input id={1} value={value2} onChange={handleChange} placeholder="날짜 ex) 20180820"/>
                </div> 
            }
            {
                value2.length > 0 && 
                <div className={cx('todo-input')}>
                    <input id={2} value={value3} onChange={handleChange} placeholder="총가격 ex) 30000"/>
                </div> 
            }
            { value3.length > 0 && children }
        </div>
    );
}
export default CalculateFormInput;