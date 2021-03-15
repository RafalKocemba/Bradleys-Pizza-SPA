import React, { useEffect, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import Promotions from './subcomponents/Promotions';

import { default as MainPageStyles } from './MainPage.module.scss';

const style = bemCssModules(MainPageStyles);

const MainPage = () => {

    const [scrollTop, setScrollPosition] = useState(window.scrollY);
    useEffect(() => {
        const updateScroll = () => {
            setScrollPosition(window.scrollY);
        };
        document.addEventListener("scroll", updateScroll);

        return () => {
            document.removeEventListener("scroll", updateScroll);
        };
    }, []);


    return (
        <>
            <Promotions scrollTop={scrollTop} />
        </>
    );
};

export default MainPage;