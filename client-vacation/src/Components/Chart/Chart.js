import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import axios from "axios";
import { loadUser } from "../../actions/authAction";
import PropTypes from "prop-types";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {

      chartData: {
        labels: [],
        datasets: [
          {
            label: "User Follows",
            data: [],
            backgroundColor: [
              "rgba(255,99,132,0.6)",
              "rgba(54,162,235,0.6)",
              "rgba(75,206,86,0.6)",
              "rgba(153,102,255,0.6)",
              "rgba(255,159,64,0.6)",
              "rgba(255,99,132,0.6)"
            ]
          }
        ]
      }
    };
  }
  componentDidMount () {
    const { loadUser} = this.props;
    loadUser(localStorage.getItem("token"));

    console.log(this.props.auth);
    const isAuthenticated = this.props.auth.isAuthenticated;

    if(isAuthenticated !==true) {
      this.props.history.push('/');
    }

    this.interval = setInterval(()=>this.getChart(),1500);
  };

   componentWillUnmount() {
    clearInterval(this.interval)
  }

  getChart() {
    axios.get("/api/vacations/followed").then(res => {
      const numFollowers = res.data.map(followers => followers.followers);
      const description = res.data.map(description => description.description);
      this.setState({
        chartData: {
          labels: description,
          datasets: [
            {
              label: "User Follows",
              data: numFollowers
            }
          ]
        }
      });
    });
  }

  render() {
    return (
      <div className={"chart"}>
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: "Followed Vacations by Users",
              fontSize: 25,
              responsive: true,
                maintainAspectRatio: false,
            },
            legend: {
              display: true,
              position: "bottom"
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}

Chart.propTypes = {
  auth: PropTypes.object,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loadUser }
)(Chart);
