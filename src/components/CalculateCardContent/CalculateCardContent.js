import React from 'react';
import styles from './CalculateCardContent.scss';
import classNames from 'classnames/bind';
import _ from '../Lib';


const cx = classNames.bind(styles);
const CalculateCardContent = ({ index, id, name, percentage, price, checked, handleChecked }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{percentage} %</td>
      <td>{_.comma(price)} 원</td>
      <td><div className={`${checked ? cx('check-ok-button') : cx('check-button')}`} onClick={(e) => handleChecked(index, id) }>{checked ? '입금완료' : '미입금'}</div></td>
    </tr>
  );
}
export default CalculateCardContent;


