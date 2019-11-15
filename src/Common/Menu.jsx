import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class Menu extends React.Component {
    
    render() {

        const { user } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h3>Smart Corp Insurance</h3>
                <div style={{color:"blue", fontSize: "12px"}}>
                    <Link to="/farmerHome" className="btn btn-link">Home</Link>
                    Welcome: <text style={{color:"green", fontSize: "10px"}}>{user.firstName}</text>
                    
                    <Link to="/login" className="btn btn-link">Logout</Link></div>                    
            </div>
        );
    }
}

function mapState(state) {
    const { authentication } = state;
    const { user } = authentication;
    return { user };
}

const connectedMenu = connect(mapState)(Menu);
export { connectedMenu as Menu };