import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import {
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionLink
} from './header.styles';

export const Header = ({ currentUser, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <span>Plantiful Dashboard</span>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/dashboard'>Dashboard</OptionLink>
            <OptionLink to='/inventory'>Inventory</OptionLink>
                {currentUser ? (
                    <OptionLink as='div' onClick={signOutStart}>
                        Sign out
                    </OptionLink>
                ) : (
                    <OptionLink to='/'>Sign in</OptionLink>
                )}
        </OptionsContainer>
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
