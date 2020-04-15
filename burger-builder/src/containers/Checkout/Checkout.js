import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import ContactInfo from './../ContactInfo/ContactInfo';

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-info');
    }

    render() {
        let summary = <Redirect to="/" />
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummery
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelHandler}
                        checkoutContinued={this.checkoutContinueHandler}/>
                    <Route path={this.props.match.url + '/contact-info'}
                        component={ContactInfo}/>
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}

export default connect(mapStateToProps)(Checkout);