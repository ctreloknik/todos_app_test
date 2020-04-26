import { MENU_ITEMS, FAKE_AUTH } from '../../Utils';

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { actions } from "../../redux/sm";
import { connect } from "react-redux";

import './Header.scss';

class MenuItem extends React.Component {
    render() {
        let classItem = 'menu-panel-item';
        let classItemSelected = ' menu-panel-item-selected';

        return (
            <Link
                className={this.props.selected ? classItem + classItemSelected : classItem}
                to={this.props.item.link}
                onClick={(e) => this.props.itemClick(this.props.item.id)}
            >{this.props.item.text}
            </Link>
        )
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
        const items = MENU_ITEMS.map((item) => <MenuItem
            itemClick={this.onMenuItemClick}
            key={item.link}
            item={item}
            selected={this.state.selectedId === item.id}>
        </MenuItem>)

        return (
            <header className="header">
                {items}
                <SignOutBtn />
                {this.props.name} && {this.props.role}
            </header>
        )
    };
}

function SignOutBtn() {
    let history = useHistory();
    let onSignOut = () => {
        FAKE_AUTH.signout(() => {
            actions.logout();
            history.push("/")
        });
    }

    return (<Link to="#" className="menu-panel-item" onClick={onSignOut}>
        Sign out
    </Link>)
}

const mapStateToProps = (state) => {
    return {
        name: state.name,
        role: state.role
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(actions.logout());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);