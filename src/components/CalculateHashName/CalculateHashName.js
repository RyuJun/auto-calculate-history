import React from 'react';
import styles from './CalculateHashName.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

const CalculateHashName = ({ index, name, percentage, handleRemoveName, onActive, active })  => {
    
    return (
        <div className={`${cx('hash-btn')} ${active && cx('hashActive')}`} onClick={(e) => {onActive(index)}} onDoubleClick={(e) => {handleRemoveName(index)}} >
            <span>#</span>{name} {percentage}%
        </div>
    );
}
export default CalculateHashName;
