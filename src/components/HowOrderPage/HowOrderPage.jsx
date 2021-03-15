import React from 'react';
import bemCssModules from 'bem-css-modules';

import { default as HowOrderPageStyles } from './HowOrderPage.module.scss';

const style = bemCssModules(HowOrderPageStyles);

const HowOrderPage = () => {

    return (
        <section className={style()}>
            <h4 className={style('title')}>Zamów lub zarządzaj na stronie</h4>
            <div className={style('text-wrapper')}>
                <p className={style('user-text')}>{'Login: User\nHasło: 123456'}</p>
                <p className={style('user2-text')}>Jako użytkownik możesz dodawać swoje ulubione pizze do koszyka i zamówić do domu</p>
                <p className={style('admin-text')}>{'Login: Admin\nHasło: ******'}</p>
                <p className={style('admin2-text')}>Jako administrator strony możesz zarządzać menu, w tym: dodawać, edytować, usuwać pizze</p>
                <p className={style('user3-text')}>Tutaj dodasz swoją pizzę do koszyka</p>
                <p className={style('admin3-text')}>W tym miejscu poczujesz się jak prawdziwy gospodarz!</p>
                <p className={style('user4-text')}>A tu znajdziesz swoje wybrane pizze, gotowe do zamówienia!</p>
            </div>
            <div className={style('img-wrapper')}>
                <img className={style('img')} src="assets/mockup.png" alt="mockup" />
            </div>
        </section>
    );
};

export default HowOrderPage;