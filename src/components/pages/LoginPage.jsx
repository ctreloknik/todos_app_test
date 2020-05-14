import React from 'react';
import {
    useHistory,
    useLocation,
    Redirect
} from 'react-router-dom';

import { actions } from "../../redux/actions";
import { connect } from "react-redux";

import { isAuthenticated } from '../../Utils';

import './LoginPage.scss';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.isLoginEdited = false;
        this.isPassEdited = false;
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
        if (!this.isLoginEdited && this.props.login) {
            this.isLoginEdited = true;
        }
        if (!this.isPassEdited && this.props.password) {
            this.isPassEdited = true;
        }

        return isAuthenticated() ? (
            <Redirect
                to={{
                    pathname: "/home",
                    state: { from: { pathname: "/" } }
                }}
            />
        ) : (
                <div className='login-form-wrapper' disabled={this.props.isLoading}>
                    <LoginFormSubmit onSubmit={this.onSubmit}>
                        <div>
                            <input onChange={this.onUsernameChange}
                                value={this.props.login ? this.props.login : ''}
                                type='text'
                                name='login'
                                className='login-input-field'
                                placeholder='Username'
                                required autoComplete='false' />
                            <input onChange={this.onPasswordChange}
                                value={this.props.password ? this.props.password : ''}
                                type='password'
                                name='password'
                                className='login-input-field'
                                placeholder='Password'
                                required autoComplete='false' />
                            <button className='login-submit-btn' disabled={!this.props.isValid}>Log in</button>
                        </div>
                    </LoginFormSubmit>
                    <div>
                        {!this.isLoginEdited || !(this.isLoginEdited && !this.props.login) ? null : 'Введите логин'}
                    </div>
                    <div>
                        {!this.isPassEdited || !(this.isPassEdited && !this.props.password) ? null : 'Введите пароль'}
                    </div>
                    <div>
                        {this.props.errorText}
                    </div>
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
            history.replace(from);
        }

        rest.onSubmit(callback);
        event.preventDefault();
    };

    return (
        <form className='login-form' onSubmit={onSubmit} >
            {children}
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login ? state.login : '',
        password: state.password ? state.password : '',
        isLoading: state.isLoading,
        isValid: state.isValid,
        errorText: state.errorText || ''
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