import React from 'react';
import Header from '../header/Header';
import ErrorBoundary from '../common/ErrorBoundary';

import { SecurityCfgCheck } from '../../Utils';

function MainView({ children, ...rest }) {
    const childrenComponent = SecurityCfgCheck.isPageEnabled(rest.pageName) ?
        children : <div>Страница недоступна</div>;

    return (
        <div>
            <Header />
            <ErrorBoundary>
                {childrenComponent}
            </ErrorBoundary>
        </div>
    );
}

export default MainView;