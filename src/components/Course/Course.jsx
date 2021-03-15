import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';

import request from '../../helpers/request';
import { StoreContext } from '../../store/StoreProvider';

import { default as CourseStyles } from './Course.module.scss';

const style = bemCssModules(CourseStyles);

const Course = ({ products, id, img, isUserContext = false, price, title }) => {
    const { user, setUser } = useContext(StoreContext);
    const history = useHistory();

    const allProducts = products.join(', ');

    const handleOnClick = async () => {
        try {
            const { data, status } = await request.patch(
                '/users',
                {
                    login: user.login,
                    courseId: id,
                }
            );

            if (status === 202) {
                setUser(data.user);
                history.push('/my-order');
            }

        } catch (error) {
            console.warn(error);
        }
    };

    const USER_TYPE = 0;

    const shouldBeBuyButtonVisible = user?.accessLevel === USER_TYPE && !isUserContext;

    return (
        <li className={style()}>
            <article className={style('course-card')}>
                <img src={img} alt={title} className={style('image')} />
                <h3 className={style('title')}>{title}</h3>
                <p className={style('products')}>{`${allProducts}`}</p>
                <div className={style('order-wrapper')}>
                    <p className={style('price')}>{`${price} PLN`}</p>
                    {shouldBeBuyButtonVisible && <button className={style('btn')} onClick={handleOnClick} >Dodaj</button>}
                </div>
            </article>
        </li>
    );
};

export default Course;