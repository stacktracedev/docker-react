import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import styles from './Auth.module.css'; 

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: ''
            },
        },
        isSignUp: true
    }

    componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirect();
        }
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        const creds = this.state.controls;
        this.props.onAuth(creds.email.value, creds.password.value, this.state.isSignUp);
    }

    inputChangedHandler = (event, identifier) => {
        const updatedForm = {...this.state.controls};
        const updatedElement = updatedForm[identifier];
        updatedElement.value = event.target.value;
        updatedForm[identifier] = updatedElement;
        this.setState({controls: updatedForm});
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        })
    }

    render() {
        const formElementArray = [];
        for(let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementArray.map(formElement => (
            <Input key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value} 
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            
        ));

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        } 

        let authRedirect = null;
        if(this.props.isAuthenticated) {
             authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div className={styles.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.formSubmitHandler}>
                    {form}
                    <Button btnType='Success'>
                        Submit
                    </Button>
                </form>
                <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? 'SIGN-IN' : 'SIGN-UP'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirect: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));