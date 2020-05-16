import React from 'react';
import App from '../../App';

import { actions } from "../../redux/actions";
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
            dispatch(actions.checkAutentification());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);