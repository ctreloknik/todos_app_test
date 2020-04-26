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
        this.state = {
            username: '',
            password: '',
            isValid: false,
            isLoading: false
        }
    }

    onUsernameChange = (event) => {
        const value = event.target.value;
        this.setState((state, props) => {
            return {
                username: value,
                isValid: state.password && value
            }
        });
    }

    onPasswordChange = (event) => {
        const value = event.target.value;
        this.setState((state, props) => {
            return {
                password: value,
                isValid: !!(state.username && value)
            }
        });
    }

    onSubmit = (callback) => {
        this.setState({
            isLoading: true
        })

        const data = {};
        data.login = this.state.username;
        data.password = this.state.password;
        this.props.login(data, callback);
    }

    render = () => {
        return (
            <div disabled={this.state.isLoading}>
                <LoginFormSubmit onSubmit={this.onSubmit}>
                    <input onChange={this.onUsernameChange}
                        value={this.state.username}
                        type='text'
                        name='username'
                        placeholder='username'
                        required autoComplete='false' />
                    <input onChange={this.onPasswordChange}
                        value={this.state.password}
                        type='password'
                        name='password'
                        placeholder='password'
                        required autoComplete='false' />
                    {/* <p>You must log in to view the page at {this.location.from.pathname}</p> */}
                    <button disabled={!this.state.isValid}>Log in</button>
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
        username: state,
        password: state,
        isLoading: state.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data, callback) => {
            dispatch(actions.login(data, callback));
        },

        logout: () => {
            dispatch(actions.logout());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);