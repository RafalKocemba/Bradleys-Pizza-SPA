import React, { useContext, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import LoginForm from './LoginForm/LoginForm'
import { StoreContext } from '../../store/StoreProvider';

import { default as HeaderStyles } from './Header.module.scss';

const style = bemCssModules(HeaderStyles);

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { user, setUser } = useContext(StoreContext);

    const handleOnClose = () => setIsModalOpen(false);

    const handleOnClick = () => {
        if (Boolean(user)) {
            setUser(null)
        } else {
            setIsModalOpen(true);
        }
    }

    const setProperlyLabel = Boolean(user) ? 'Wyloguj się' : "Zaloguj się";


    return (
        <header className={style()}>
            <h1 className={style('title')}>23 303 03 03</h1>
            <div className={style('logo-wrapper')}>
                <img className={style('logo')} src="logo.png" alt="logo" />
            </div>
            <button className={style('btn')} onClick={handleOnClick}>{setProperlyLabel}</button>
            <LoginForm handleOnClose={handleOnClose} isModalOpen={isModalOpen} />
        </header>
    );
};

export default Header;