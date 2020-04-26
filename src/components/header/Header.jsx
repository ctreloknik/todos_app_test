import { MENU_ITEMS, FAKE_AUTH } from '../../Utils';

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
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
                <SignOutBtn/>
            </header>
            // <div className="menu-panel">
            //     {items}
            // </div>
        )
    };
}

function SignOutBtn() {
    let history = useHistory();
    let onSignOut = () => {
        FAKE_AUTH.signout(() => history.push("/"));
    }

    return (<Link to="#" className="menu-panel-item" onClick={onSignOut}>
        Sign out
    </Link>)
}

export default Header;
//<header className="header"></header>