import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

import { FAKE_AUTH } from '../../Utils';

function NoMatch({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                FAKE_AUTH.isAuthenticated ? (
                    <Redirect
                        to={{
                            pathname: "/home",
                            state: { from: location }
                        }}
                    />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default NoMatch;