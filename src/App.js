import React, { lazy, Suspense } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { GlobalStyle } from './global.styles';
import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const DashboardPage = lazy(() => import('./pages/dashboard/dashboard.component'));
const InventoryPage = lazy(() => import('./pages/inventory/inventory.component'));
const UpdateInventoryPage = lazy(() => import('./pages/update-inventory/update-inventory.component'));


const App = () => (
    <div>
        <GlobalStyle />
        <Header />
        <Switch>
            <ErrorBoundary>
                <Suspense fallback={<Spinner />}>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/dashboard' component={DashboardPage} />
                    <Route exact path='/inventory' component={InventoryPage} />
                    <Route exact path='/inventory/update' component={UpdateInventoryPage} />
                </Suspense>
            </ErrorBoundary>
        </Switch>
    </div>

);

// createStructuredSelector passes the redux state object to all selectors
const mapStateToProps = createStructuredSelector({
    // currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    // checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);