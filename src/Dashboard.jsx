// in src/Dashboard.js
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import {LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';

//dummy demo for
const data01 = [
    {day: '05-01', weather: 'sunny'},
    {day: '05-02', weather: 'sunny'},
    {day: '05-03', weather: 'cloudy'},
    {day: '05-04', weather: 'rain'},
    {day: '05-05', weather: 'rain'},
    {day: '05-06', weather: 'cloudy'},
    {day: '05-07', weather: 'cloudy'},
    {day: '05-08', weather: 'sunny'},
    {day: '05-09', weather: 'sunny'},
];


/**
 * Fetch a list of statistics from the API and display.
 *
 * For now we simply display the statistics that's returned by the API and it's  corresponding description
 * when one item we display it as a counter
 * when multiple items we map it to a graph
 */
class Dashboard extends Component  {

    propTypes = {
        statsUrl: PropTypes.string
    }

    constructor() {
        super();

        this.state = {
            statistics: null,
            loading: false
        }
    }

    componentDidMount() {
        this.fetchStats();
    }

    fetchStats () {
        axios.get(this.props.statsUrl)
            .then( (response) => {

                const appResource =  response.data;
                const resources = appResource.revisions[appResource.revisions.length -1].resources;

                this.setState({
                    loading: false,
                    statistics:  response
                });

                //this.fetchRoutes();
            })
            .catch(function (error) {
                console.log('Error', error)
                this.setState({
                    loading: false,
                    statistics: false,
                    error:  true
                });
            });
    }

    render () {
        const props = this.props;
        return (
            <>
                {this.state.loading &&
                    <Loader />
                }
                {!this.state.loading && this.state.statistics &&
                    <Statistics statistics={this.state.statistics} />
                }
                {!this.state.loading && !this.state.statistics &&
                    <Card>
                        Can't load the statisitics...
                    </Card>
                }
            }
            </>


        )
    }
};


/***
 * Loop through list of statistics and display them
 *
 * If it's a statistic with one Item just display a count, otherwise display a chart
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Statistics = () => {
    return (
        <>
            {this.props.statistics
            .filter(statistic => !!statistic.results && statistic.results.length > 0)
            .map((statistic) => {
                return (
                    <Card>
                        <CardHeader>
                            {statistic.description}
                        </CardHeader>
                        <CardContent>
                        {statistic.results.length === 1 ?
                            <Counter data={statistic.result[0]} /> :
                            <Chart data={statistic.result}  />
                        }
                        </CardContent>
                    </Card>
                )
            })}
        </>
    )
}


const Counter = ({data}) => {
    return <h3>{data.counter}</h3>
}

const Chart = ({data}) => {
    return <LineChart
        width={400} height={400} data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis dataKey="date" />
        <YAxis type="category" domain={data.map(value => value.counted)} />
        <Tooltip />
        <Line type="stepAfter" dataKey="weather" stroke="#ff7300" />
    </LineChart>

}

const Loader = () => {
    return <Card> Loading... </Card>;
}




export default Dashboard