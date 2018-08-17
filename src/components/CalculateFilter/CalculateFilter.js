import React from 'react';
import styles from './CalculateFilter.scss'
import classNames from 'classnames/bind'


const cx = classNames.bind(styles);



const CalculateFilter = ({filterChange, type}) => {
  return (
    <div className={cx('filter-wrap')}>
        <div className={`${cx('filter-item')} ${ type === 'all' && cx('filterActive')}`} onClick={() => filterChange('all')}>전체</div>
        <div className={`${cx('filter-item')} ${ type === 'progress' && cx('filterActive')}`} onClick={() => filterChange('progress')}>진행</div>
        <div className={`${cx('filter-item')} ${ type === 'close' && cx('filterActive')}`} onClick={() => filterChange('close')}>완료</div>
    </div>
  );
}
export default CalculateFilter;


