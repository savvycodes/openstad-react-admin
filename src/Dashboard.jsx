// in src/Dashboard.js
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import axios from 'axios';

import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, CartesianGrid} from 'recharts';

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
            loading: true
        }
    }

    componentDidMount() {
        this.fetchStats();
    }

    fetchStats() {
        console.log(' fetchStats this.props.statsUrl', this.props, this.props.statsApi)

        axios.get(this.props.statsApi)
            .then((response) => {

                console.log('response', response.data)

                this.setState({
                    loading: false,
                    statistics: response.data
                });

                //this.fetchRoutes();
            })
            .catch((error) => {
                console.log('Error', error)
                this.setState({
                    loading: false,
                    statistics: false,
                    error: true
                });
            });
    }

    render() {
        const props = this.props;
        return (
            <div>
                {this.state.loading &&
                <Loader/>
                }
                {!this.state.loading && this.state.statistics &&
                <Statistics statistics={this.state.statistics}/>
                }
                {!this.state.loading && !this.state.statistics &&
                <Card>
                    <CardContent>
                        Can't load the statistics...
                    </CardContent>
                </Card>
                }
            </div>
        );
    }
};

Dashboard.propTypes = {
    statsUrl: PropTypes.string
}

/***
 * Loop through list of statistics and display them
 *
 * If it's a statistic with one Item just display a count, otherwise display a chart
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Statistics = (props) => {
    console.log('props', props)
    return (
        <>
            {props.statistics
                // filter out
                .filter(statistic => statistic.result && statistic.result.length > 0)
                .map((statistic) => {
                    return (
                        // for counters use columns
                        // for Chars use full width
                        <Card style={{
                            width: statistic.result.length === 1 ? '23%' : '90%',
                            margin: '0 0 20px 20px',
                            display: 'inline-block'
                        }}>
                            <CardHeader title={statistic.description}/>
                            <CardContent>
                                {statistic.result.length === 1 ?
                                    <Counter data={statistic.result[0]}/> :
                                    <Chart data={statistic.result}/>
                                }
                            </CardContent>
                        </Card>
                    );
                })}
        </>
    )
}


const Counter = ({data}) => {
    console.log('data', data)
    return <h3 style={{fontSize: '25px'}}>{data.counted}</h3>
}

const Chart = ({data}) => {
    return  <LineChart
            width={800} height={500}
            data={data}
            margin={{top: 20, right: 20, bottom: 20, left: 20}}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date"/>
            <YAxis/>
            <Tooltip/>
            <Line type="monotone" dataKey="counted" stroke="#8884d8"/>
        </LineChart>
}

const Loader = () => {
    return <Card>
        <CardContent>
            Loading...
        </CardContent>
    </Card>;
}


export default Dashboard