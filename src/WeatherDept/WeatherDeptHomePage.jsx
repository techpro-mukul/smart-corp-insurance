import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class WeatherDeptHomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        if(user.userType !== 'WEATHER_DEPT'){
            return  <Redirect  to="/login" />
        } 
        return (
            <div>
                <div className="col-md-10" style={{textAlign:"center"}}>             
                    <h3>Weather Department Dashboard</h3>
                    <p>
                        <Link to="/updateWeather" className="btn btn-primary" 
                        style={{ width: "220px", marginLeft: "20px", fontSize: "20px" }}>Update</Link>

                        <Link to="/areaWiz" className="btn btn-primary" 
                        style={{ width: "220px", marginLeft: "20px", fontSize: "20px" }} >Area WIZ</Link>
                    </p>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedWeatherDeptHomePage = connect(mapState, actionCreators)(WeatherDeptHomePage);
export { connectedWeatherDeptHomePage as WeatherDeptHomePage };