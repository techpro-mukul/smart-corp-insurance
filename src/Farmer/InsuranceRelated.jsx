import React from 'react';
import { connect } from 'react-redux';
import axios, { post } from 'axios';

import { userActions } from '../_actions';

class InsuranceRelated extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            uniqueFormId: '',
            insurancePolicy: '',
            policyList:[],
            claimReason: '',
            messageSuccess: '',
            messageError: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFarm = this.handleChangeFarm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            userName: this.props.user.firstName,
            [name]: value
        });
        console.log(this.state);
    }

    handleChangeFarm(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        let farmInsuranceData = JSON.parse(localStorage.getItem("farmInsuranceData")) || {};
        let policies = farmInsuranceData[value];
        if(!policies){
            policies = [];
        }
        this.setState({
            policyList: policies
         
        });
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();

        //const { user, file } = this.state;
        this.setState({ userName: 'fff' });
        const { userName, file, uniqueFormId, insurancePolicy, claimReason } = this.state;
        if (userName && uniqueFormId && insurancePolicy && claimReason) {

            this.setState({ submitted: true, messageSuccess: 'Updated Successfully', messageError: '' });
            //this.props.register(userName);
            console.log(file);

            const url = 'http://localhost:8081/InsuranceRelatedDetails';
            const formData = new FormData();
            formData.append('file', file)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            return post(url, formData, config)
                .then(response => console.log(response))
                .catch(error => {
                    console.log("error is:  " + error);
                });
        } else {
            if (uniqueFormId == "") {
                this.setState({ messageError: 'Select unique farm id', messageSuccess: '' });
            }
            if (insurancePolicy == "") {
                this.setState({ messageError: 'Select insurance policy', messageSuccess: '' });
            }
            if (claimReason == "") {
                this.setState({ messageError: 'Select claim reason', messageSuccess: '' });
            }
        }
    }

    render() {
        const { user, users } = this.props;
        const { messageSuccess, messageError, policyList } = this.state;
        let farmDetails = JSON.parse(localStorage.getItem("allFarmDetails")) || {};
        let currentUserFarms = farmDetails[this.props.user.username];
        let farmList = [];
        if (currentUserFarms) {
            farmList = currentUserFarms.farmList;
        }
        return (
            <div>
                <div className="col-md-10" style={{ textAlign: "center" }}>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div style={{ fontWeight: "bold", fontSize: "20px", paddingBottom: "15px" }}>Claim Related</div>
                            <div className={'form-group alert-success'}>
                                <div className="help-block">{messageSuccess}</div>
                            </div>
                            <div className={'form-group has-error'}>
                                <div className="help-block">{messageError}</div>
                            </div>
                            <table width="80%" style={{ margin: "0 auto", border: "0px solid", textAlign: "center" }}>
                                <tr>
                                    <td style={{ width: "50%", textAlign: "left", fontWeight: "bold" }}>Unique Farm Id:</td>
                                    <td style={{ width: "50%", textAlign: "left" }}>
                                        <select name="uniqueFormId" onChange={this.handleChangeFarm}
                                            className="form-control" style={{ width: "50%" }} >
                                            <option value="" >--Select--</option>
                                                {farmList.map(function (name, index) {
                                                     return <option value={name}>{name}</option>
                                                })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%", textAlign: "left", fontWeight: "bold" }}>Insurance Policy:</td>
                                    <td style={{ width: "50%", textAlign: "left" }}>
                                        <select name="insurancePolicy" onChange={this.handleChange}
                                            className="form-control" style={{ width: "50%" }}>
                                            <option value="" selected>--Select--</option>
                                                {policyList.map(function (name, index) {
                                                     return <option value={name}>{name}</option>
                                                })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%", textAlign: "left", fontWeight: "bold" }}>Claim Reason:</td>
                                    <td style={{ width: "50%", textAlign: "left" }}>
                                        <select name="claimReason" onChange={this.handleChange}
                                            className="form-control" style={{ width: "50%" }}>
                                            <option value="">--Select--</option>
                                            <option value="1">Draught</option>
                                            <option value="2">Flood</option>
                                        </select>
                                    </td>
                                </tr>
                            </table>
                            <br></br>
                            <button type="submit" className="btn btn-primary">Submit Claim</button>
                        </form>
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

const connectedInsuranceRelated = connect(mapState, actionCreators)(InsuranceRelated);
export { connectedInsuranceRelated as InsuranceRelated };