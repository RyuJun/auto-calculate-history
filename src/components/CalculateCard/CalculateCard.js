import React from 'react';
import styles from './CalculateCard.scss';
import classNames from 'classnames/bind';

import _ from '../Lib';
import CalculateCardContent from '../CalculateCardContent';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faChevronUp, faChevronDown, faCheck);

const cx = classNames.bind(styles);

const CalculateCard = ({ index, allprice, date, input, people, changeActive, active, completion, handleChecked, onSave, onCompletion, onRemove }) => {
  const peopleSetting = people.map((item, i)=> <CalculateCardContent key={i} index={index} id={item.id} name={item.name} percentage={item.percentage} price={item.price} checked={item.checked} handleChecked={handleChecked} />);
  const peopleDel = people.find( (el) => el.checked === false);
  return (
    <div className={cx('page-template')} onDoubleClick={(e) => {onRemove(index)}}>
      {completion &&
        <div className={cx('page-completion')} onClick={(e) => changeActive(index+1, active ? false : true )} >
          <FontAwesomeIcon icon="check" size="2x" color="#fff" />
        </div>
      }
      {
        active ?
        <FontAwesomeIcon icon="chevron-up" size="2x" color="#9775fa" className={cx('down-icon')} onClick={(e) => changeActive(index+1, active ? false : true )} />
        :
        <FontAwesomeIcon icon="chevron-down" size="2x" color="#9775fa" className={cx('down-icon')} onClick={(e) => changeActive(index+1, active ? false : true )} />
      }
      <h1>{input}</h1>
      <h3>{_.comma(allprice)} 원</h3>
      <div className={cx('cardDate')}>{_.dateFormat(date)}</div>
      
      <div className={`${cx('sub-content')} ${active && cx('on-subContent')}`}>
        <div className={cx('sub-content-wrap')} >
          <table>
            <thead>
              <tr>
                <th>이름</th>
                <th>참여율</th>
                <th>가격</th>
                <th>입금</th>
              </tr>
            </thead>
            <tbody>
              {peopleSetting}
            </tbody>
          </table>
          <div className={cx('saveAndDel')}>
            <div className={cx('save-button')} onClick={() => onSave(true)}>저장</div>
            { peopleDel === undefined &&
              <div className={cx('del-button')} onClick={() => onCompletion(index+1)}>정산완료</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
export default CalculateCard;


