function drawCharts() {
    fetch('/calculateAgriculture')
    .then(response => response.json())
    .then(data => {
        const cropProductionData = JSON.parse(data.crop_production_img);
        const netCalculationData = JSON.parse(data.net_calc_img);

        const years = cropProductionData.production.Year.map(Number);
        const cornData = cropProductionData.production.Corn.map(Number);
        const wheatData = cropProductionData.production.Wheat.map(Number);
        const soybeanData = cropProductionData.production.Soybean.map(Number);
        const sgData = cropProductionData.production.SG.map(Number);

        const netYears = netCalculationData.Income.Year.map(Number);
        const cornIncome = netCalculationData.Income.Corn.map(Number);
        const wheatIncome = netCalculationData.Income.Wheat.map(Number);
        const soybeanIncome = netCalculationData.Income.Soybean.map(Number);
        const sgIncome = netCalculationData.Income.SG.map(Number);
        const USIncome = netCalculationData.Income.US$0.map(Number);

        // Create the first Highcharts for cropProductionChart

        Highcharts.chart('chart1', {
            title:{
                text: 'Crop Production',
            },
            xAxis: {
                categories: years,
                title:{
                    text: 'Year'
                },
            },
            yAxis: {
                title:{
                    text:'Production',
                },
            },
            series: [
                { name: 'Corn', data: cornData, color: 'red'},
                { name: 'Wheat', data: wheatData, color: 'green'},
                { name: 'Soybean', data: soybeanData, color: 'blue'},
                { name: 'SG', data: sgData, color: 'orange'}
            ],

            exporting: {
                buttons:{
                    contextButton:{
                        menuItems:["downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG"],
                    },
                },
            },
        });
        // Create the second Highcharts chart for energyNetIncomeCalculation
        Highcharts.chart('chart2', {
            title: {
                text: 'Agriculture Net Income Calculation',
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
                { name: 'Corn', data: cornIncome, color: 'red'},
                { name: 'Wheat', data: wheatIncome, color: 'green'},
                { name: 'Soybean', data: soybeanIncome, color: 'blue'},
                { name: 'SG', data: sgIncome, color: 'orange'},
                { name: 'US$0', data: USIncome, color: 'yellow' }
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
    .catch(error =>{
        console.error('Error:',error)
    });
}

// Call the drawCharts function when the page loads
document.addEventListener('DOMContentLoaded', drawCharts);