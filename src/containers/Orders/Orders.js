import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from './../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.onOrdersFetched(this.props.token);
    }

    render() {
        let orders = <Spinner />
        if(!this.props.loading) {
            orders = (
                <div>
                    {this.props.orders.map(order => (
                        <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
                    ))};
                </div>
            );
        }
        return orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrdersFetched: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));