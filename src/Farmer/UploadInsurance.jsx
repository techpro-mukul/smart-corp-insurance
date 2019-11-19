import React from 'react';
import { connect } from 'react-redux';
import axios, { post } from 'axios';

import { userActions } from '../_actions';

class UploadInsurance extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            file: '',
            uniqueFormId: '',
            messageSuccess: '',
            messageError: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateUniqueFormId = this.updateUniqueFormId.bind(this);
    }

    handleChange(event) {
        this.setState({
            userName: this.props.user.firstName,
            file: event.target.files[0]
        });
        console.log(this.state);
    }

    updateUniqueFormId(event) {
        this.setState({
            uniqueFormId: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        //const { user, file } = this.state;
        this.setState({ userName: 'fff' });
        const { userName, file, uniqueFormId } = this.state;
        console.log(userName + " " + file);
        if (userName && file && uniqueFormId) {

            this.setState({ submitted: true, messageSuccess: 'uploaded successfully', messageError: '' });
            //this.props.register(userName);
            console.log(file);

            const url = 'http://localhost:8081/UploadInsuranceDetails';
            const formData = new FormData();
            formData.append('file', file)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            // Move this to post success
            let farmInsuranceData = JSON.parse(localStorage.getItem("farmInsuranceData")) || {};
            let policyList = farmInsuranceData[uniqueFormId];
            if(policyList){
                policyList.push(uniqueFormId);
            }else{
                policyList = [];
                policyList.push(uniqueFormId);
            }
            farmInsuranceData[uniqueFormId] = policyList;
            localStorage.setItem("farmInsuranceData", JSON.stringify(farmInsuranceData));
            //
            return post(url, formData, config)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log("error is:  " + error);
                });
        } else {
            if (uniqueFormId == "") {
                this.setState({ messageError: 'Select unique farm id', messageSuccess: '' });
            }
            if (file == "") {
                this.setState({ messageError: 'Select file to upload', messageSuccess: '' });
            }
        }
    }

    render() {
        const { user, users } = this.props;
        const { messageSuccess, messageError } = this.state;
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
                            <div style={{ fontWeight: "bold", fontSize: "20px", paddingBottom: "15px" }}>Upload Insurance Details</div>
                            <div className={'form-group alert-success'}>
                                <div className="help-block">{messageSuccess}</div>
                            </div>
                            <div className={'form-group has-error'}>
                                <div className="help-block">{messageError}</div>
                            </div>
                            <table width="80%" style={{ margin: "0 auto", border: "0px solid", textAlign: "center" }}>
                                <tr>
                                    <td style={{ width: "50%", textAlign: "left", fontWeight: "bold" }}>Unique Farm Id: </td>
                                    <td style={{ width: "50%", textAlign: "left" }}>
                                        <select name="uniqueFormId" onChange={this.updateUniqueFormId}
                                            className="form-control" style={{ width: "50%" }}>
                                            <option value="">--Select--</option>
                                            {farmList.map(function (name, index) {
                                                return <option value={name}>{name}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%", textAlign: "left", fontWeight: "bold" }}>Insurance File: </td>
                                    <td style={{ width: "50%", textAlign: "left" }} >
                                        <input type="file" onChange={this.handleChange} style={{ width: "50%" }} />
                                    </td>
                                </tr>
                            </table>
                            <br></br>
                            <button type="submit" className="btn btn-primary">Upload</button>
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

const connectedUploadInsurance = connect(mapState, actionCreators)(UploadInsurance);
export { connectedUploadInsurance as UploadInsurance };