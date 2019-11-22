import React from 'react';
import { connect } from 'react-redux';
import axios, { post } from 'axios';

import { userActions } from '../_actions';

class UpdateWeather extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            farmId: '',
            SWLongi: '',
            SWLati: '',
            NWLongi: '',
            NWLati: '',
            NELongi: '',
            NELati: '',
            SELongi: '',
            SELati: '',
            messageSuccess: '',
            messageError: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            userName: this.props.user.firstName
        });
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();

        //const { user, file } = this.state;
        this.setState({ userName: 'fff' });
        const { userName, farmId, SWLongi, SWLati, NWLongi, NWLati, NELongi, NELati, SELongi, SELati } = this.state;
        console.log(userName + " " + farmId + " " + SWLongi + " " + SWLati + " " + NWLongi + " " + NWLati + " " + NELongi + " " + NELati + " " + SELongi + " " + SELati);
        if (userName && farmId && SWLongi && SWLati && NWLongi && NWLati && NELongi && NELati && SELongi && SELati) {

            this.setState({ submitted: true, messageSuccess: 'Farm details added Successfully', messageError: '' });
            //this.props.register(userName);
            //localStorage.removeItem("allFarmDetails");
            //localStorage.removeItem("farmInsuranceData");
            let farmDetails = JSON.parse(localStorage.getItem("allFarmDetails")) || {};
            let currentUserFarms = farmDetails[this.props.user.username];
            if (currentUserFarms) {
                if (!currentUserFarms['farmList'].includes(farmId)) {
                    currentUserFarms['farmList'].push(farmId);
                }
            }
            else {
                currentUserFarms = {};
                currentUserFarms.username = this.props.user.username;
                currentUserFarms.farmList = [];
                currentUserFarms.farmList.push(farmId);

            }
            farmDetails[this.props.user.username] = currentUserFarms;
            localStorage.setItem("allFarmDetails", JSON.stringify(farmDetails));

            const url = 'http://localhost:8081/UpdateWeatherDetails';
            const formData = new FormData();
            formData.append('file', farmId)
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
            console.log(userName + " " + farmId + " " + SWLongi + " " + SWLati + " " + NWLongi + " " + NWLati + " " + NELongi + " " + NELati + " " + SELongi + " " + SELati);
            this.setState({ messageError: 'Please enter all details', messageSuccess: '' });
        }
    }

    render() {
        const { user, users } = this.props;
        const { messageSuccess, messageError } = this.state;
        return (
            <div>
                <div className="col-md-10" style={{ textAlign: "center" }}>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div style={{ fontWeight: "bold", fontSize: "20px", paddingBottom: "15px" }}>Upload Farm Details</div>
                            <div className={'form-group alert-success'}>
                                <div className="help-block">{messageSuccess}</div>
                            </div>
                            <div className={'form-group has-error'}>
                                <div className="help-block">{messageError}</div>
                            </div>
                            <table width="80%" style={{ margin: "0 auto", border: "0px solid", textAlign: "center" }}>
                                <tr>
                                    <td style={{ width: "50%", textAlign: "left", fontWeight: "bold" }}>Farm Id:</td>
                                    <td style={{ width: "50%", textAlign: "left" }}>
                                        <input type="text" name="farmId" onChange={this.handleChange} />
                                        <br></br><br></br>
                                    </td>
                                    <td style={{ width: "50%", textAlign: "left" }}>

                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%", textAlign: "left", fontWeight: "bold" }}>SW:</td>
                                    <td style={{ width: "50%", textAlign: "left" }}>
                                    
                                        <input type="text" name="SWLongi" onChange={this.handleChange} />
                                        <br></br><span style={{ fontSize: "10px", paddingLeft:"20%" }}>Longitude:</span>
                                    </td>
                                    <td style={{ width: "50%", textAlign: "left" }}>
                                        <input type="text" name="SWLati" onChange={this.handleChange} />
                                        <br></br><span style={{ fontSize: "10px", paddingLeft:"35%" }}>Latitude:</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%", textAlign: "left", fontWeight: "bold" }}>NW:</td>
                                    <td style={{ width: "50%", textAlign: "left" }}>
                                       <input type="text" name="NWLongi" onChange={this.handleChange} />
                                       <br></br><span style={{ fontSize: "10px", paddingLeft:"20%" }}>Longitude:</span>
                                    </td>
                                    <td style={{ width: "50%", textAlign: "left" }}>
                                        <input type="text" name="NWLati" onChange={this.handleChange} />
                                        <br></br><span style={{ fontSize: "10px", paddingLeft:"35%" }}>Latitude:</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%", textAlign: "left", fontWeight: "bold" }}>NE:</td>
                                    <td style={{ width: "50%", textAlign: "left" }}>
                                        <input type="text" name="NELongi" onChange={this.handleChange} />
                                        <br></br><span style={{ fontSize: "10px", paddingLeft:"20%" }}>Longitude:</span>
                                    </td>
                                    <td style={{ width: "50%", textAlign: "left" }}>
                                        <input type="text" name="NELati" onChange={this.handleChange} />
                                        <br></br><span style={{ fontSize: "10px", paddingLeft:"35%" }}>Latitude:</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%", textAlign: "left", fontWeight: "bold" }}>SE:</td>
                                    <td style={{ width: "50%", textAlign: "left" }}>
                                        <input type="text" name="SELongi" onChange={this.handleChange} />
                                        <br></br><span style={{ fontSize: "10px", paddingLeft:"20%" }}>Longitude:</span>
                                    </td>
                                    <td style={{ width: "50%", textAlign: "left" }}>
                                        <input type="text" name="SELati" onChange={this.handleChange} />
                                        <br></br><span style={{ fontSize: "10px", paddingLeft:"35%" }}>Latitude:</span>
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

const connectedUpdateWeather = connect(mapState, actionCreators)(UpdateWeather);
export { connectedUpdateWeather as UpdateWeather };