import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import styles from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let attachClass = [styles.SideDrawer, styles.Close]
    if(props.open) {
        attachClass = [styles.SideDrawer, styles.Open]
    }
    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachClass.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthnticated={props.isAuth}/>
                </nav>
            </div>
        </Auxiliary>
    );
}

export default sideDrawer;