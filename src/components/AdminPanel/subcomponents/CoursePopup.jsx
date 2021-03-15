import React, { useContext, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import Modal from '../../Modal/Modal';
import request from '../../../helpers/request';
import { StoreContext } from '../../../store/StoreProvider'

import { default as CoursePopupStyles } from './CoursePopup.module.scss';

const style = bemCssModules(CoursePopupStyles);

const CoursePopup = ({
    products = [],
    hidePopup,
    isEditMode = true,
    isOpenPopup,
    id,
    img = '',
    price = 0,
    title = '',
}) => {
    const [formProducts, setFormProducts] = useState(products);
    const [formProduct, setFormProduct] = useState('');
    const [formImg, setFormImg] = useState(img);
    const [formPrice, setFormPrice] = useState(price);
    const [formTitle, setFormTitle] = useState(title);

    const { setCourses } = useContext(StoreContext);

    const handleOnChangeProduct = event => setFormProduct(event.target.value);
    const handleOnChangeImg = event => setFormImg(event.target.value);
    const handleOnChangePrice = event => setFormPrice(event.target.value);
    const handleOnChangeTitle = event => setFormTitle(event.target.value);

    const handleOnSubmit = async event => {
        event.preventDefault();

        const courseObject = {
            products: formProducts,
            id,
            img: formImg,
            price: Number(formPrice),
            title: formTitle,
        };

        if (isEditMode) {
            const { data, status } = await request.put('/courses', courseObject);

            if (status === 202) {
                setCourses(data.courses);
            }
        } else {
            const { data, status } = await request.post('/courses', courseObject);

            if (status === 201) {
                setCourses(data.courses);
            }
        }
        hidePopup();
    };

    const addProduct = event => {
        event.preventDefault();

        setFormProducts(prev => [...prev, formProduct]);
        setFormProduct('');
    };

    const deleteProduct = event => {
        const productToDelete = event.target.dataset.product;
        setFormProducts(prev => prev.filter(product => product !== productToDelete));
    };

    const productsElements = formProducts.map(product => (
        <li key={product}>
            <p>{product}</p>
            <button data-product={product} onClick={deleteProduct}>Usuń</button>
        </li>
    ));

    const correctLabel = isEditMode ? 'Aktualizuj danie' : 'Utwórz danie';


    return (
        <Modal handleOnClose={hidePopup} isOpen={isOpenPopup}>
            <div className={style()}>
                <form className={style('form')} method='submit' onSubmit={handleOnSubmit}>
                    <div className={style('form-row')}>
                        <label>
                            Składniki:
                            <input className={'input'} onChange={handleOnChangeProduct} type='text' value={formProduct} />
                            <button onClick={addProduct}>Dodaj składnik</button>
                        </label>
                    </div>
                    <div className={style('form-row')}>
                        <label>
                            Obrazek url:
                            <input className={'input'} onChange={handleOnChangeImg} type='text' value={formImg} />
                        </label>
                    </div>
                    <div className={style('form-row')}>
                        <label>
                            Cena:
                            <input className={'input'} onChange={handleOnChangePrice} type='number' value={formPrice} />
                        </label>
                    </div>
                    <div className={style('form-row')}>
                        <label>
                            Tytuł:
                            <input className={'input'} onChange={handleOnChangeTitle} type='text' value={formTitle} />
                        </label>
                    </div>
                    <button type='submit'>{correctLabel}</button>
                    <button onClick={hidePopup} type='button'>Anuluj</button>
                </form>
                <p>Lista składników:</p>
                <ul>
                    {productsElements}
                </ul>
            </div>
        </Modal>
    );
};

export default CoursePopup;