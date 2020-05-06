import React from 'react';
import Header from '../header/Header';
import { useHistory } from 'react-router-dom';

function MainView({ children, ...rest }) {
    let history = useHistory();
    let onFail = () => {
        history.push("/login");
    }

    let adaptedChild = null;
    if (typeof children === 'string') {
        adaptedChild = <div>{children}</div>
    } else {
        adaptedChild = React.cloneElement(children, { onFail });
    }

    return (
        <div>
            <Header />
            {adaptedChild}
        </div>
    );
}

export default MainView;