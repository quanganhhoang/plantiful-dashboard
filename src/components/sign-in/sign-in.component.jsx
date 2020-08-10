import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';

import {
    emailSignInStart
} from '../../redux/user/user.actions';

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer,
    ErrorMessage
} from './sign-in.styles';

import {
    selectCurrentUser,
    selectAuthErrorMessage
} from '../../redux/user/user.selectors';

import { Button } from 'antd';

const SignIn = ({ emailSignInStart, currentUser, errorMessage }) => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [currentUser, errorMessage])

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        emailSignInStart(email, password);
    };

    const handleChange = event => {
        const { value, name } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <SignInContainer>
            <SignInTitle>Sign in with your email and password</SignInTitle>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name='email'
                    type='email'
                    handleChange={handleChange}
                    value={email}
                    label='email'
                    required
                />
                <FormInput
                    name='password'
                    type='password'
                    value={password}
                    handleChange={handleChange}
                    label='password'
                    required
                />
                <input type="submit" style={{display: 'none'}}/>
                <ErrorMessage>{errorMessage}</ErrorMessage>
                <ButtonsBarContainer>
                    <Button 
                        type='primary'
                        size="large"
                        loading={isLoading}
                        onClick={(e) => handleSubmit(e)}
                    > 
                        Sign In
                    </Button>
                </ButtonsBarContainer>
            </form>
        </SignInContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    errorMessage: selectAuthErrorMessage
});

const mapDispatchToProps = dispatch => ({
    emailSignInStart: (email, password) =>
        dispatch(emailSignInStart({ email, password }))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
