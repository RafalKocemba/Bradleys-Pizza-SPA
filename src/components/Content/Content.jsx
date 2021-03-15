import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import { Redirect, Route, Switch } from 'react-router-dom';


import AdminPanel from '../AdminPanel/AdminPanel';
import Courses from '../Courses/Courses';
import HowOrderPage from '../HowOrderPage/HowOrderPage';
import UserCourses from '../UserCourses/UserCourses';
import { StoreContext } from '../../store/StoreProvider';

import { default as ContentStyles } from './Content.module.scss';
import MainPage from '../MainPage/MainPage';

const style = bemCssModules(ContentStyles);

const ADMIN_TYPE = 1;

const Content = () => {
    const { user } = useContext(StoreContext);

    const isUserLogged = Boolean(user);
    const isAdmin = user?.accessLevel === ADMIN_TYPE;


    return (
        <main className={style()}>
            <Switch>
                <Route exact path='/' render={() => <MainPage />} />
                <Route exact path='/how-to-order' render={() => <HowOrderPage />} />
                <Route exact path='/menu' render={() => <Courses />} />
                {isUserLogged && <Route exact path='/my-order' render={() => <UserCourses />} />}
                {isAdmin && <Route exact path='/manage' render={() => <AdminPanel />} />}
                <Redirect to='/' />
            </Switch>
        </main>
    );

};

export default Content;