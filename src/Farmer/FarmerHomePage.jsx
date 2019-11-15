import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class FarmerHomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        if (user.userType !== 'FARMER') {
            return <Redirect to="/login" />
        }
        return (
            <div>
                <div className="col-md-10" style={{ textAlign: "center" }}>

                    <h3>Dashboard</h3>
                    <p>
                        <Link to="/uploadFarmDetails"
                            className="btn btn-primary" style={{ width: "220px", marginLeft: "20px", fontSize: "20px" }}
                        >Upload Farm Details</Link>

                        <Link to="/uploadInsuranceFile"
                            className="btn btn-primary" style={{ width: "220px", marginLeft: "20px", fontSize: "20px" }}>
                            Upload Insurance File</Link>
                    </p>
                    <p>
                        <Link to="/insuranceRelated"
                            className="btn btn-primary" style={{ width: "220px", marginLeft: "20px", fontSize: "20px" }}>
                            Insurance Related</Link>

                        <Link to="/checkClaimStatus"
                            className="btn btn-primary" style={{ width: "220px", marginLeft: "20px", fontSize: "20px" }}>
                            Check Claim Status</Link>
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

const connectedHomePage = connect(mapState, actionCreators)(FarmerHomePage);
export { connectedHomePage as FarmerHomePage };