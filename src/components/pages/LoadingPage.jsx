import React from 'react';
import App from '../../App';

import { loginOperations } from "../../state/ducks/login/index";
import { connect } from "react-redux";

class LoadingPage extends React.Component {
    componentDidMount = () => {
        this.props.checkAutentification();
    }

    render = () => {
        if (this.props.isAppLoaded) {
            this.isAppLoaded = true;
        }

        return (<>
            {this.isAppLoaded ? <App /> : <div>Loading...</div>}
        </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAppLoaded: state.login.isAppLoaded
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkAutentification: (login) => {
            dispatch(loginOperations.checkAutentification());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);