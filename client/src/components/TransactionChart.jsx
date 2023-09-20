import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import { scaleBand } from '@devexpress/dx-chart-core';

import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import { Typography } from '@mui/material';

const TransactionChart = ({chartData}) => {

  if(!chartData.length>0){
    return(
      <Typography variant='h4' sx={{ textAlign: 'center', margin: 5 }}>
        Add a transaction to view chart
      </Typography> 
    )
  }

    return (
      <Paper style={{ marginTop: 20 }}>
        <Chart
          data={chartData}
        >

          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            valueField="Expense"
            argumentField="Category"
          />
          <Animation />
          <EventTracker/>
          <Tooltip />
        </Chart>
      </Paper>
    );
}
export default TransactionChart
