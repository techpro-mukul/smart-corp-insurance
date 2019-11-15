import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class FarmerMenu
 extends React.Component {
    
    render() {

        const { user } = this.props;
        return (
            <div className="col-md-10 col-md-offset-3">
               
                <div style={{color:"green", fontSize: "30px", textAlign: "center"}}><span style={{float:"left"}}>&#9776;</span>Smart Corp Insurance<span class="glyphicon glyphicon-user" style={{float:"right"}}></span></div>
                <div style={{color:"blue", fontSize: "12px", alignContent: "center"}}>                    
                    <span style={{float:"right"}}>Welcome: <text style={{color:"green", fontSize: "10px"}}>{user.firstName}</text></span>
                    <br></br>
                    <Link to="/farmerHome" className="btn btn-link" style={{float:"left", padding:"0px"}}>Home</Link>         
                    <Link to="/login" className="btn btn-link" style={{float:"right", padding:"0px"}}>Logout</Link></div> 
                    <br></br>                   
            </div>
        );
    }
}

function mapState(state) {
    const { authentication } = state;
    const { user } = authentication;
    return { user };
}

const connectedFarmerMenu
 = connect(mapState)(FarmerMenu
);
export { connectedFarmerMenu
 as FarmerMenu
 };