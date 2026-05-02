import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

import Dropdown from '../../libs/Dropdown/Dropdown';
import { MenuItem } from '@mui/material';
import { useState } from 'react';
import { Grid } from '@mui/system';

function Dashboard() {
    const [barChart, setBarChart] = useState("1");
    const [pieChart, setPieChart] = useState("1");
    const lists = [
        { key: 1, value: "To Day" },
        { key: 2, value: "This Week" },
        { key: 3, value: "This Month" },
        { key: 4, value: "This Year" },
    ];
    const groupsList = {
        "1": [{
            data: [1200, 1500, 1350],
            label: 'Split Money',
            color: '#19d28b',
        }],
        "2": [{
            data: [7200, 8120, 6980],
            label: 'Split Money',
            color: '#1976d2',
        }],
        "3": [{
            data: [53050, 62300, 75200],
            label: 'Split Money',
            color: '#1976d2',
        }],
        "4": [{
            data: [152005, 180120, 116980],
            label: 'Split Money',
            color: '#1976d2',
        }],
    };
    const piesList = {
        "1": [
            { label: 'Group A', value: 1200, color: '#0088FE' },
            { label: 'Group B', value: 1500, color: '#00C49F' },
            { label: 'Group C', value: 1350, color: '#FFBB28' },
        ],
        "2": [
            { label: 'Group A', value: 7200, color: '#0088FE' },
            { label: 'Group B', value: 8120, color: '#00C49F' },
            { label: 'Group C', value: 6980, color: '#FFBB28' },
        ],
        "3": [
            { label: 'Group A', value: 53500, color: '#0088FE' },
            { label: 'Group B', value: 62300, color: '#00C49F' },
            { label: 'Group C', value: 75200, color: '#FFBB28' },
        ],
        "4": [
            { label: 'Group A', value: 152005, color: '#0088FE' },
            { label: 'Group B', value: 180120, color: '#00C49F' },
            { label: 'Group C', value: 116980, color: '#FFBB28' },
        ],
    };
    const [graphsData, setGraphsData] = useState(groupsList["1"]);
    const [pieData, setPieData] = useState(piesList["1"]);

    const handleBarChange = (e) => {
    const keyVal = String(e.target.value);
        setBarChart(keyVal);
        setGraphsData(groupsList[keyVal]);
    };
    const handlePieChange = (e) => {
    const keyVal = String(e.target.value);
        setPieChart(keyVal);
        setPieData(piesList[keyVal])
    };
    const xAxis = [
        {
            scaleType: 'band',
            data: ['Group A', 'Group B', 'Group C'],
        },
    ];

    const settings = {
        hideLegend: false,
    };

    return (
        <div>
            <Grid container size={12}>
                <Grid size={6} sx={{ border: "2px solid red", borderRadius: "10px" }}>
                    <Grid size={2}>
                        <label>Select Period</label>
                        <Dropdown
                            name={"barChart"}
                            value={barChart}
                            onChange={handleBarChange}
                            list={lists?.map(item =>
                                (<MenuItem value={item.key} key={item.value}>{item.value}</MenuItem>))}
                        />
                    </Grid>
                    <BarChart
                        width={400}
                        height={300}
                        xAxis={xAxis}
                        series={graphsData}
                    />
                </Grid>
                <Grid size={6} sx={{ border: "2px solid red", borderRadius: "10px" }}>
                    <Grid size={2}>
                        <label>Select Grid</label>
                        <Dropdown
                            name={"pieChart"}
                            value={pieChart}
                            onChange={handlePieChange}
                            list={lists?.map(item =>
                                (<MenuItem value={item.key} key={item.value}>{item.value}</MenuItem>))}
                        />
                    </Grid>
                    <PieChart
                        series={[{ innerRadius: 50, outerRadius: 120, data:pieData, arcLabel: 'value' }]}
                        {...settings}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default Dashboard;