import React from 'react';
import styles from './CalculateAddBtn.scss'
import classNames from 'classnames/bind'


const cx = classNames.bind(styles);

const CalculateAddBtn = ({ onSave }) => {
  return (
    <div className={cx('todo-input')}>
        <div className={cx('add-button')} onClick={onSave}>
          저장  
        </div>
    </div>
  );
}
export default CalculateAddBtn;


