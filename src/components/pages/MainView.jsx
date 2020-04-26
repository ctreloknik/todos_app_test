import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import Header from '../header/Header';

import { FAKE_AUTH } from '../../Utils';

function MainView({ children, ...rest }) {
    return (
        <div>
            <Header/>
            {children}
        </div>
    );
}

export default MainView;