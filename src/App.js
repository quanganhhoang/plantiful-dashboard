import React, { lazy, Suspense, useEffect } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { GlobalStyle } from './global.styles';
import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { 
    selectCurrentUser
} from './redux/user/user.selectors';

import { checkUserSession } from './redux/user/user.actions';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const DashboardPage = lazy(() => import('./pages/dashboard/dashboard.component'));
const InventoryPage = lazy(() => import('./pages/inventory/inventory.component'));
const UpdateInventoryPage = lazy(() => import('./pages/update-inventory/update-inventory.component'));


const App = ( { checkUserSession, currentUser } ) => {
    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    return (
        <div>
            <GlobalStyle />
            <Header />
            <Switch>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                        <Route 
                            exact 
                            path='/' 
                            render={() =>
                                !currentUser ? <HomePage /> : <DashboardPage />
                            }
                        />
                        <Route 
                            exact
                            path='/dashboard'
                            render={() =>
                                !currentUser ? <Redirect to='/' /> : <DashboardPage />
                            }
                        />
                        <Route 
                            exact 
                            path='/inventory' 
                            render={() =>
                                !currentUser ? <Redirect to='/' /> : <InventoryPage />
                            }
                        />
                        <Route 
                            exact 
                            path='/inventory/update' 
                            render={() =>
                                !currentUser ? <Redirect to='/' /> : <UpdateInventoryPage />
                            }
                        />
                    </Suspense>
                </ErrorBoundary>
            </Switch>
        </div>
    )
};

// createStructuredSelector passes the redux state object to all selectors
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);