import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class ClaimStatus extends React.Component {
    componentDidMount() {
        this.props.getUsers();

        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then((data) => {
            console.log("data is "+data);
          this.setState({ claimData: data })
        })
        .catch(error => {
            console.log("error is:  "+error);
          });
    }

    constructor(props) {
        super(props);

        this.state = {
            claimData: []
        };
    }

    render() {
      
        const {claimData} = this.state;
        return (
            <div>
                <div className="col-md-10" style={{textAlign:"center"}}>
                    <h3>Claim Status</h3>
                    <div>
                 
                        <table>
                            <tbody>{this.state.claimData.map(function(item, key) {
                                    
                                    return (
                                        <tr key = {key}>
                                            <td>{item.userId}</td>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.body}</td>
                                        </tr>
                                        )
                                    
                                    })}</tbody>
                        </table>

                    </div>
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

const connectedClaimStatus = connect(mapState, actionCreators)(ClaimStatus);
export { connectedClaimStatus as ClaimStatus };