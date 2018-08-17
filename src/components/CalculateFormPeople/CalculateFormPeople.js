import React from 'react';
import styles from './CalculateFormPeople.scss'
import classNames from 'classnames/bind'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faUserPlus);


const cx = classNames.bind(styles);

const CalculateFormPeople = ({ value, handleChange, handleAddName, handleKeyPress })  => {
    
    return (
        <div className={cx('todo-input')}>
            <input id={3} placeholder="이름" value={value} onChange={handleChange} onKeyPress={handleKeyPress}/>
            <FontAwesomeIcon icon="user-plus" size="2x" color="#9775fa" className={cx('add-name')} onClick={handleAddName}/>
        </div>
    );
}
export default CalculateFormPeople;