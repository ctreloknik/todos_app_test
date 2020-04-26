import React from 'react';
import {
    useHistory,
    useLocation
} from 'react-router-dom';

import { actions } from "../../redux/sm";
import { connect } from "react-redux";
import { FAKE_AUTH } from '../../Utils';

import './LoginPage.scss';

class LoginPage extends React.Component {
    constructor(props) {
        super();
    }

    onUsernameChange = (event) => {
        const value = event.target.value;
        this.props.usernameChange(value)
    }

    onPasswordChange = (event) => {
        const value = event.target.value;
        this.props.passwordChange(value);
    }

    onSubmit = (callback) => {
        const data = {};
        data.login = this.props.login;
        data.password = this.props.password;
        this.props.loginAction(data, callback);
    }

    render = () => {
        return (
            <div disabled={this.props.isLoading}>
                <LoginFormSubmit onSubmit={this.onSubmit}>
                    <input onChange={this.onUsernameChange}
                        value={this.props.login ? this.props.login : ''}
                        type='text'
                        name='login'
                        placeholder='username'
                        required autoComplete='false' />
                    <input onChange={this.onPasswordChange}
                        value={this.props.password ? this.props.password : ''}
                        type='password'
                        name='password'
                        placeholder='password'
                        required autoComplete='false' />
                    {/* <p>You must log in to view the page at {this.location.from.pathname}</p> */}
                    <button disabled={!this.props.isValid}>Log in</button>
                </LoginFormSubmit>
            </div>
        );
    }
}

function LoginFormSubmit({ children, ...rest }) {
    const history = useHistory();
    const location = useLocation();

    let onSubmit = (event) => {
        const callback = () => {
            let { from } = location.state || { from: { pathname: "/" } };
            FAKE_AUTH.authenticate(() => {
                history.replace(from);
            });
        }

        rest.onSubmit(callback);
        event.preventDefault();
    };

    return (
        <form className='form' onSubmit={onSubmit} >
            {children}
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        password: state.password,
        isLoading: state.isLoading,
        isValid: state.isValid,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        usernameChange: (login) => {
            dispatch(actions.usernameChange(login));
        },
        passwordChange: (pass) => {
            dispatch(actions.passwordChange(pass));
        },
        
        loginAction: (data, callback) => {
            dispatch(actions.loginAction(data, callback));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);