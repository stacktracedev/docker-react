import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummery extends Component {
    render() {
        const ingredientSummery = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>
                        {igKey}
                        </span>: {this.props.ingredients[igKey]}
                    </li>
                );
            });
        return (
            <Auxiliary>
                <h3>Your Orders</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummery}
                </ul>
                <p><strong>Total Price: $ {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkkout?</p>
                <Button btnType={'Danger'} clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType={'Success'} clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Auxiliary>
        )
    }
}

export default OrderSummery;