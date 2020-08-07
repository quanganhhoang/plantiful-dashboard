import React from 'react';

import { HomePageContainer } from './homepage.styles';
import SignIn from '../../components/sign-in/sign-in.component';

const HomePage = () => (
    <div>
        <HomePageContainer>
            <SignIn />
        </HomePageContainer>
    </div>
    
);

export default HomePage;