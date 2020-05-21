// in src/Dashboard.js
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

//dummy demo for
const data01 = [
  { day: '05-01', weather: 'sunny' },
  { day: '05-02', weather: 'sunny' },
  { day: '05-03', weather: 'cloudy' },
  { day: '05-04', weather: 'rain' },
  { day: '05-05', weather: 'rain' },
  { day: '05-06', weather: 'cloudy' },
  { day: '05-07', weather: 'cloudy' },
  { day: '05-08', weather: 'sunny' },
  { day: '05-09', weather: 'sunny' },
];

export default () => (
    <Card style={{marginTop:'28px'}}>
        <CardHeader title="Welcome to the administration board" />
        <CardContent>
          {/*
          <div className="line-chart-wrapper">
            <LineChart
              width={400} height={400} data={data01}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis dataKey="day" />
              <YAxis type="category" domain={['cloudy', 'rain', 'sunny']} />
              <Tooltip />
              <Line type="stepAfter" dataKey="weather" stroke="#ff7300" />
            </LineChart>
          </div>
          */}
        </CardContent>
    </Card>
);
