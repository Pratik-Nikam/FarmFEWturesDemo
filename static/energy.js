function drawCharts() {
    fetch('/calculateEnergy')
        .then(response => response.json())
        .then(data => {
            const farmEnergyProductionData = JSON.parse(data.farm_energy_production_img_data);
            const energyNetCalculationData = JSON.parse(data.energy_net_calc_img_data);

            const years = farmEnergyProductionData.energy.Year.map(Number);
            const windData = farmEnergyProductionData.energy.Wind.map(Number);
            const solarData = farmEnergyProductionData.energy.Solar.map(Number);
            const zeroMwhData = farmEnergyProductionData.energy.zeroMWh.map(Number);

            const netYears = energyNetCalculationData.Income.Year.map(Number);
            const windIncome = energyNetCalculationData.Income.Wind.map(Number); 
            const solarIncome = energyNetCalculationData.Income.Solar.map(Number);
            const us$0Income = energyNetCalculationData.Income.US$0.map(Number);

            // Create the first Highcharts chart for farmEnergyProduction
            Highcharts.chart('chart1', {
                title: {
                    text: 'Farm Energy Production',
                },
                xAxis: {
                    categories: years,
                    title: {
                        text: 'Year',
                    },
                },
                yAxis: {
                    title: {
                        text: 'Production',
                    },
                },
                series: [
                    { name: 'Wind', data: windData, color: 'red' },
                    { name: 'Solar', data: solarData, color: 'green' },
                    { name: '0 MWh', data: zeroMwhData, color: 'blue' },
                ],
                // Add exporting options
                exporting: {
                    buttons: {
                        contextButton: {
                            menuItems: ["downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG"],
                        },
                    },
                },
            });

            // Create the second Highcharts chart for energyNetIncomeCalculation
            Highcharts.chart('chart2', {
                title: {
                    text: 'Energy Net Income Calculation',
                },
                xAxis: {
                    categories: netYears,
                    title: {
                        text: 'Year',
                    },
                },
                yAxis: {
                    title: {
                        text: 'Income',
                    },
                },
                series: [
                    { name: 'Wind', data: windIncome, color: 'red' },
                    { name: 'Solar', data: solarIncome, color: 'green' },
                    { name: 'US$0', data: us$0Income, color: 'yellow' },
                ],
                // Add exporting options
                exporting: {
                    buttons: {
                        contextButton: {
                            menuItems: ["downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG"],
                        },
                    },
                },
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Call the drawCharts function when the page loads
document.addEventListener('DOMContentLoaded', drawCharts);
