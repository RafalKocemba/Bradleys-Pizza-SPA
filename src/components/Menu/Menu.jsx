import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import bemCssModules from 'bem-css-modules';
import { StoreContext } from '../../store/StoreProvider';

import { default as MenuStyle } from './Menu.module.scss';

const style = bemCssModules(MenuStyle);

const Menu = () => {
    const { user } = useContext(StoreContext);

    const ADMIN_TYPE = 1;
    const USER_TYPE = 0;

    const userComponent = user?.accessLevel === USER_TYPE
        && <li className={style('element', { logged: true })}>
            <Link className={style('link')} to='/my-order' replace>Moje zamówienie</Link>
        </li>;

    const adminComponent = user?.accessLevel === ADMIN_TYPE
        && <li className={style('element', { logged: true })}>
            <Link className={style('link')} to='/manage' replace>Panel administratora</Link>
        </li>;

    return (
        <nav className={style()}>
            <ul className={style('list')}>
                <li className={style('element')}><Link className={style('link')} to='/' replace>Strona główna</Link></li>
                <li className={style('element')}><Link className={style('link')} to='/how-to-order' replace>co i jak?</Link></li>
                <li className={style('element')}><Link className={style('link')} to='/menu' replace>Menu</Link></li>
                {userComponent}
                {adminComponent}
            </ul>
        </nav>
    )
};

export default Menu;