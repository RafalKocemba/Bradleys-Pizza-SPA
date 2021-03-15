import React, { useContext, useState } from 'react';

import bemCssModules from 'bem-css-modules';
import CourseDetails from './subcomponents/CourseDetails';
import CoursePopup from './subcomponents/CoursePopup';
import { StoreContext } from '../../store/StoreProvider';

import { default as AdminPanelStyles } from './AdminPanel.module.scss';

const style = bemCssModules(AdminPanelStyles);

const AdminPanel = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const { courses } = useContext(StoreContext);

    const showPopup = () => setIsOpenPopup(true);
    const hidePopup = event => {
        if (event) {
            event.preventDefault();
        }
        setIsOpenPopup(false);
    };

    const coursesElements = courses.map(course => <CourseDetails key={course.id} {...course} />)

    return (
        <section className={style()}>
            {coursesElements}
            <button onClick={showPopup}>Dodaj nowe danie</button>
            <CoursePopup isEditMode={false} isOpenPopup={isOpenPopup} hidePopup={hidePopup} />
        </section>
    );
};

export default AdminPanel;