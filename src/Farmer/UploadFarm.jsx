import React from 'react';
import { connect } from 'react-redux';
import axios, { post } from 'axios';

import { userActions } from '../_actions';

class UploadFarm extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            file: '',
            messageSuccess: '',
            messageError: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            userName: this.props.user.firstName,
            file: event.target.files[0]
        });
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();

        //const { user, file } = this.state;
        this.setState({ userName: 'fff' });
        const { userName, file } = this.state;
        console.log(userName + " " + file);
        if (userName && file) {

            this.setState({ submitted: true, messageSuccess: 'Uploaded Successfully', messageError: '' });
            //this.props.register(userName);
            console.log(file);

            const url = 'http://localhost:8081/uploadFarmDetails';
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
            console.log(userName + " " + file);
            this.setState({ messageError: 'Please select file to upload', messageSuccess: '' });
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
                                    <td style={{ width: "50%", textAlign: "left", fontWeight: "bold" }}>File:</td>
                                    <td style={{ width: "50%", textAlign: "left" }}>
                                        <input type="file"  onChange={this.handleChange} />
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

const connectedUploadFarm = connect(mapState, actionCreators)(UploadFarm);
export { connectedUploadFarm as UploadFarm };