import React from 'react';
import bemCssModules from 'bem-css-modules';

import { default as ModalStyles } from './Modal.module.scss';

const style = bemCssModules(ModalStyles);

const Modal = ({ children, isOpen }) => {

    const showModal = isOpen && <div className={style('', { active: isOpen })}>{children}</div>;

    return (
        <>
            {showModal}
        </>
    )
};

export default Modal;

