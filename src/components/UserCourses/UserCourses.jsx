import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import Course from '../Course/Course'
import Paypal from './subcomponents/Paypal';
import { StoreContext } from '../../store/StoreProvider';

import { default as UserCoursesStyles } from './UserCourses.module.scss'

const style = bemCssModules(UserCoursesStyles);


const UserStyles = () => {
    const { user, courses } = useContext(StoreContext);

    const buyedCourses = courses
        .filter(course => user.courses.includes(course.id))
        .map(course => <Course isUserContext={true} key={course.id} {...course} />);


    return (
        <>
            <section className={style()}>
                <h2 className={style('title')}>Twoje zamówienie</h2>
                <Paypal />
                <ul className={style('list')}>
                    {buyedCourses}
                </ul>
            </section>
        </>
    );
};

export default UserStyles;