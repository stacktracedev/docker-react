import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import styles from './Layout.module.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar isAuth={this.props.isAuthnticated} drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuthnticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={styles.Layout}>
                    {this.props.children}
                </main>
            </Auxiliary >
        )
    };
}

const mapStateToProps = state => {
    return {
        isAuthnticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps, null)(Layout);