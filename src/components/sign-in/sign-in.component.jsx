import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';

import {
    emailSignInStart
} from '../../redux/user/user.actions';

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
} from './sign-in.styles';

import { Button } from 'antd';

const SignIn = ({ emailSignInStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
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
                <ButtonsBarContainer>
                    <Button 
                        type='submit'
                        size="large"
                        onClick={() => emailSignInStart(email, password)}
                    > 
                        Sign In
                    </Button>
                </ButtonsBarContainer>
            </form>
        </SignInContainer>
    );
};

const mapDispatchToProps = dispatch => ({
    emailSignInStart: (email, password) =>
        dispatch(emailSignInStart({ email, password }))
});

export default connect(
    null,
    mapDispatchToProps
)(SignIn);
