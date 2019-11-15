import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { UploadFarm, UploadInsurance, InsuranceRelated, FarmerHomePage } from '../Farmer';
import { PoliciesIssued, ClaimsProcessed, InsurerHomePage } from '../Insurer';
import { WeatherDeptHomePage, UpdateWeather, AreaWiz } from '../WeatherDept';
import { ClaimStatus } from '../Farmer/ClaimStatus';
import { CommonMenu } from '../Common/CommonMenu';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron" style={{padding:"0px", margin:"0px"}}>
                <div  style={{padding:"0px", margin:"0px"}}>
                    <div style={{padding:"10px"}}>
                    <CommonMenu></CommonMenu>
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        
                        
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/farmerHome" component={FarmerHomePage} />
                                <Route path="/uploadFarmDetails" component={UploadFarm} />
                                <Route path="/uploadInsuranceFile" component={UploadInsurance} />
                                <Route path="/insuranceRelated" component={InsuranceRelated} />
                                <Route path="/checkClaimStatus" component={ClaimStatus} />
                                <Route path="/insurerHome" component={InsurerHomePage} />
                                <Route path="/policiesIssued" component={PoliciesIssued} />
                                <Route path="/claimsProcessed" component={ClaimsProcessed} />
                                <Route path="/weatherDeptHome" component={WeatherDeptHomePage} />
                                <Route path="/updateWeather" component={UpdateWeather} />
                                <Route path="/areaWiz" component={AreaWiz} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };