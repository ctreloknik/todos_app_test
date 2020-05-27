import React from 'react';
import Header from '../header/Header';

import { SecurityCfgCheck, redirectToPage } from 'Utils';

function MainView({ children, ...rest }) {
    if (!SecurityCfgCheck.isPageEnabled(rest.pageName)) {
        redirectToPage('home');
    }

    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

export default MainView;