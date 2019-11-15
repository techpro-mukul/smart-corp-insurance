import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import './style.css';

class CommonMenu
  extends React.Component {

  constructor() {
    super();

    this.state = {
      showMenu: false,
      showLogout: false
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.showLogout = this.showLogout.bind(this);
    this.closeLogout = this.closeLogout.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  showLogout(event) {
    event.preventDefault();

    this.setState({ showLogout: true }, () => {
      document.addEventListener('click', this.closeLogout);
    });
  }

  closeLogout() {
    this.setState({ showLogout: false }, () => {
      document.removeEventListener('click', this.closeLogout);
    });
  }

  render() {

    const { user } = this.props;
    if (user == null) return (<div></div>);
    let menu, logout;
    if (user.userType === 'FARMER') {
      menu = <div style={{ paddingLeft: "20px" }}>
        <a href="/farmerHome" className="menu-link">Home</a>
        <br></br>
        <a href="/uploadFarmDetails" className="menu-link">Upload Farm Details</a>
        <br></br>
        <a href="/uploadInsuranceFile" className="menu-link">Upload Insurance File</a>
        <br></br>
        <a href="/insuranceRelated" className="menu-link">Insurance Related</a>
        <br></br>
        <a href="/checkClaimStatus" className="menu-link">Check Claim Status</a></div>
    }
    if (user.userType === 'INSURER') {
      menu = <div style={{ paddingLeft: "20px" }}>
        <a href="/insurerHome" className="menu-link">Home</a>
        <br></br>
        <a href="/policiesIssued" className="menu-link">Policies Issued</a>
        <br></br>
        <a href="/claimsProcessed" className="menu-link">Claims Processed</a>
      </div>
    }
    if (user.userType === 'WEATHER_DEPT') {
      menu = <div style={{ paddingLeft: "20px" }}>
        <a href="/weatherDeptHome" className="menu-link">Home</a>
        <br></br>
        <a href="/updateWeather" className="menu-link">Uplate</a>
        <br></br>
        <a href="/areaWiz" className="menu-link">Area WIZ</a>
      </div>
    }
    logout = <div style={{ paddingRight: "20px" }}> <a href="/login" className="menu-link" style={{ float: "right" }}>Logout</a></div>
    return (
      <div className="col-md-10" style={{ width: "100%", padding: "0px" }}>

        <div style={{ color: "white", backgroundColor: "black", fontSize: "30px", textAlign: "center" }}>
          <span style={{ float: "left", paddingLeft: "5px" }} onClick={this.showMenu}>&#9776;</span>
          Smart Corp Insurance
          <span className="glyphicon glyphicon-user" style={{ float: "right", paddingLeft: "20px", paddingRight: "10px", paddingTop: "5px" }} onClick={this.showLogout}></span>
        </div>
        {
          this.state.showMenu
            ? (
              <div style={{
                position: "absolute", backgroundColor: "black",
                zIndex: "100", width: "60%", borderStyle: "solid"
              }}>
                {menu}
              </div>
            )
            : (
              null
            )
        }
        {
          this.state.showLogout
            ? (
              <div style={{
                position: "absolute", backgroundColor: "black", marginLeft: "40%",
                zIndex: "100", width: "60%", borderStyle: "solid"
              }}>
                {logout}
              </div>
            )
            : (
              null
            )
        }
        <div style={{ color: "blue", fontSize: "12px", alignContent: "center" }}>
          <span style={{ float: "right" }}>Welcome:
          <span style={{ color: "green", fontSize: "12px", paddingLeft: "5px", paddingRight: "10px", fontWeight: "bold" }}>
              {user.firstName} {user.lastName}
            </span>
          </span>
        </div>
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

const connectedCommonMenu
  = connect(mapState)(CommonMenu
  );
export {
  connectedCommonMenu
    as CommonMenu
};