import React from 'react';
import { Link , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class InsurerHomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        if(user.userType !== 'INSURER'){
            return  <Redirect  to="/login" />
        }
        return (
            <div>
                <div className="col-md-10" style={{textAlign:"center"}}>              
                
                    <h3>Dashboard</h3>
                    <p>
                        <Link to="/policiesIssued" className="btn btn-primary" 
                        style={{ width: "220px", marginLeft: "20px", fontSize: "20px" }}>Policies Issued</Link>
                   
                        <Link to="/claimsProcessed" className="btn btn-primary" 
                        style={{ width: "220px", marginLeft: "20px", fontSize: "20px" }}>Claims Processed</Link>
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

const connectedHomePage = connect(mapState, actionCreators)(InsurerHomePage);
export { connectedHomePage as InsurerHomePage };