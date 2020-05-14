import React from 'react';
import Header from '../header/Header';

import { SecurityCfgCheck } from '../../Utils';

function MainView({ children, ...rest }) {
    const childrenComponent = SecurityCfgCheck.isPageEnabled(rest.pageName) ? 
        children : 'Страница недоступна';

    return (
        <div>
            <Header />
            {childrenComponent}
        </div>
    );
}

export default MainView;