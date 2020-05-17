import { MENU_ITEMS } from '../../Utils';

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { actions } from "../../state/actions";
import { connect } from "react-redux";

import './Header.scss';

class MenuItem extends React.Component {
    render() {
        let classItem = 'menu-panel-item';
        let classItemSelected = ' menu-panel-item-selected';

        return isMenuItemVisible(this.props.item, this.props.securityCfg) ? (
            <Link
                className={this.props.selected ? classItem + classItemSelected : classItem}
                to={this.props.item.link}
                onClick={(e) => this.props.itemClick(this.props.item.id)}
            >{this.props.item.text}
            </Link>
        ) : null
    };
}

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedId: undefined
        };
    };

    onMenuItemClick = (selectedItemId) => {
        this.setState({
            selectedId: selectedItemId
        });
        console.log(selectedItemId);
    }

    render = () => {
        const securityCfg = this.props.role;

        const items = MENU_ITEMS.map((item) => <MenuItem
            itemClick={this.onMenuItemClick}
            key={item.link}
            item={item}
            securityCfg={securityCfg}
            selected={this.state.selectedId === item.id}>
        </MenuItem>)

        return (
            <header className="header">
                {items}
                <SignOutBtn logout={this.props.logout} />
                {this.props.name} && {this.props.role}
            </header>
        )
    };
}

function SignOutBtn({ children, ...rest }) {
    let history = useHistory();
    let onSignOut = () => {
        rest.logout(() => history.push("/login"));
    }

    return (<Link to="#" className="menu-panel-item" onClick={onSignOut}>
        Sign out
    </Link>)
}

function isMenuItemVisible(item, role) {
    if (item.hiddenFor && item.hiddenFor.includes(role)) {
        return false;
    } else {
        return true;
    }
}

const mapStateToProps = (state) => {
    state = state.home;
    return {
        name: state.name || localStorage.getItem('user'),
        role: state.role || localStorage.getItem('role')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (callback) => {
            dispatch(actions.logout(callback));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);