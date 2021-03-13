// in src/Dashboard.js
import React, { Component } from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import axios from "axios";

import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
} from "recharts";

/**
 * Fetch a list of statistics from the API and display.
 *
 * For now we simply display the statistics that's returned by the API and it's  corresponding description
 * when one item we display it as a counter
 * when multiple items we map it to a graph
 */
class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      statistics: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchStats();
  }

  fetchStats() {
    axios
      .get(this.props.statsApi, {
        headers: this.props.authHeader,
      })
      .then((response) => {
        this.setState({
          loading: false,
          statistics: response.data,
        });

        //this.fetchRoutes();
      })
      .catch((error) => {
        console.log("Error", error);
        this.setState({
          loading: false,
          statistics: false,
          error: true,
        });
      });
  }

  render() {
    const props = this.props;
    return (
      <div>
        {this.state.loading && <Loader />}
        {!this.state.loading && this.state.statistics && (
          <Statistics statistics={this.state.statistics} />
        )}
        {!this.state.loading && !this.state.statistics && (
          <Card>
            <CardContent>Can't load the statistics...</CardContent>
          </Card>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  statsUrl: PropTypes.string,
};

/***
 * Loop through list of statistics and display them
 *
 * If it's a statistic with one Item just display a count, otherwise display a chart
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Statistics = (props) => {
  console.log("props", props);
  return (
    <>
      {props.statistics
        // filter out
        .filter((statistic) => statistic.result && statistic.result.length > 0)
        .map((statistic) => {
          return (
            // for counters use columns
            // for Chars use full width
            <Card
              style={{
                width: statistic.result.length === 1 ? "250px" : "90%",
                height: statistic.result.length === 1 ? "180px" : "600px",
                margin: "0 0 20px 20px",
                display: "inline-block",
              }}
            >
              <CardHeader title={statistic.description} />
              <CardContent
                style={{
                  height: statistic.result.length === 1 ? "180px" : "500px",
                }}
              >
                {statistic.result.length === 1 ? (
                  <Counter data={statistic.result[0]} />
                ) : (
                  <Chart data={statistic.result} />
                )}
              </CardContent>
            </Card>
          );
        })}
    </>
  );
};

const Counter = ({ data }) => {
  return <h3 style={{ fontSize: "25px" }}>{data.counted}</h3>;
};

const Chart = ({ data }) => {
  data = data.map((row, i) => {
    //const format = i === 1  ? '$2 $1, $3' : '$2 $1';
    // we format it with the year now, but it takes a lot of space
    // Pretty charts like Google Analytics only show the months / years when it's relevant
    // For instance when it's the first. This is a little bit more complicated, so for now just always show
    // the year for clarity.
    const format = "$2 $1, $3";
    row.niceDate = new Date(row.date)
      .toString()
      .replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, format);
    return row;
  });

  return (
    <ResponsiveContainer width="100%">
      <AreaChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="niceDate" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="counted"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const Loader = () => {
  return (
    <Card>
      <CardContent>Loading...</CardContent>
    </Card>
  );
};

export default Dashboard;
