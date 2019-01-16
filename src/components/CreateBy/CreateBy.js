import React from 'react';
import styles from './CreateBy.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

const CreateBy = ({handleClipboard})  => {
    
    return (
        <div className={cx('createBy')}>
            Create By <span>Juno</span> <br/>
            Please give me your feedback by email. <br/>
            <u onClick={handleClipboard}>ghew401@naver.com</u>
        </div>
    );
}
export default CreateBy;