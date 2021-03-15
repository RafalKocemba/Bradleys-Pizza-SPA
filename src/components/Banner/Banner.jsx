import React from 'react';

import bemCssModules from 'bem-css-modules';

import { default as BannerStyles } from './Banner.module.scss';
import { useLocation } from 'react-router';

const style = bemCssModules(BannerStyles);

const Banner = () => {
    const { pathname } = useLocation();
    const location = pathname === '/' ? true : false;

    return (
        <>
            <div className={style('', { bigger: location })}></div>
            {location && <h1 className={style('title')}>Amerykańska pizza Stanley`a</h1>}
            {location && <h2 className={style('subtitle')}>Dzięki wieloletniej tradycji z przyjemnością dzielimy się tym co najlepsze w naszym menu!</h2>}
        </>
    );
};

export default Banner;