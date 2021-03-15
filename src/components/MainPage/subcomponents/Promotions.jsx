import React from 'react';

import bemCssModules from 'bem-css-modules';

import { default as PromotionsStyles } from './Promotions.module.scss';

const style = bemCssModules(PromotionsStyles);

const data = [
    {
        title: 'Średnia pizza gratis',
        description: 'Zbieraj pieczątki, a co piątą pizzę dostaniesz od nas za darmo',
        img: '/assets/meal.png',
    },
    {
        title: 'Kup 2, dostajesz 3',
        description: 'Kup 2 pizze w dowolnym rozmiarze, a 3 dostaniesz gratis',
        img: '/assets/pizza.png',
    },
    {
        title: 'Napój 1L Gratis',
        description: 'Do każdego zamówienia powyżej 50zł dostaniesz 1L dowolnego napoju od nas',
        img: '/assets/bottle.png',
    },
    {
        title: '30% rabatu',
        description: 'Jeśli w ciągu tygodnia złożysz co najmniej 3 zamówienia, to otrzymasz od nas 30% rabatu na następne zamówienie',
        img: '/assets/percent.png',
    },
]

const Promotions = ({ scrollTop }) => {

    const checkScroll = () => {
        if (scrollTop > 300) {
            return true;
        } else {
            return false;
        }
    }

    const promotion = data.map((item, index) => (
        <div className={style('promotion', { show: checkScroll() })} key={index}>
            <div className={style('img-wrapper')}>
                <img className={style('img')} src={item.img} />
            </div>
            <h4 className={style('title')}>{item.title}</h4>
            <p className={style('description')}>{item.description}</p>
        </div>
    ))
    return (
        <>
            <h3 className={style('main-title')}>Aktualne promocje</h3>
            <section className={style()}>
                {promotion}
            </section>
        </>
    );
};

export default Promotions;


