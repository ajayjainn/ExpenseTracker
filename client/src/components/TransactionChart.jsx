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

const TransactionChart = ({chartData}) => {
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
