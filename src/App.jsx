import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import Banner from './components/Banner/Banner';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Header from '../src/components/Header/Header';
import Menu from './components/Menu/Menu';
import StoreProvider from './store/StoreProvider';

import './App.scss';

const App = () => (
    <StoreProvider>
        <Router>
            <div className={'wrapper'}>
                <Header />
                <Menu />
                <Banner />
                <Content />
                <Footer />
            </div>
        </Router>
    </StoreProvider>
);

export default App;