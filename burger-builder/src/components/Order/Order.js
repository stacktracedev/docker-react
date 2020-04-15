import React from 'react';

import styles from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for(let name in props.ingredients) {
        ingredients.push({
            name: name,
            amount: props.ingredients[name]
        });
    }

    const ingredientOutput = ingredients.map(ig => (
        <span key={ig.name} className={styles.OutputText}>
            {ig.name} : ({ig.amount})
        </span>
    ));
    return(
        <div className={styles.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>$ {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;
