function drawCharts() {
    fetch('/calculateClimate')
        .then(response => response.json())
        .then(data => {
            const getCropIncomeData = JSON.parse(data.crop_income_img);
            const getCropInsuranceData = JSON.parse(data.insur_income_img);
    
            const years = getCropIncomeData.Crop_Income.Year.map(Number);
            const cropData = getCropIncomeData.Crop_Income.Crop.map(Number);
            const energyData = getCropIncomeData.Crop_Income.Energy.map(Number);
            const allData = getCropIncomeData.Crop_Income.All.map(Number);
            const usData =  getCropIncomeData.Crop_Income.US$0.map(Number);
    
            const year = getCropInsuranceData.Insurance_Income.Year.map(Number);
            const CornData = getCropInsuranceData.Insurance_Income.Corn.map(Number);
            const WheatData = getCropInsuranceData.Insurance_Income.Wheat.map(Number);
            const SoyaData = getCropInsuranceData.Insurance_Income.Soybean.map(Number);
            const getsgData = getCropInsuranceData.Insurance_Income.SG.map(Number);

            // Create the first Highcharts chart for farmEnergyProduction
            Highcharts.chart('chart1', {
                title: {
                    text: 'Total Farm Economy',

                },
                xAxis: {
                    categories: years,
                    title: {
                        text: 'Year',
                    },
                },
                yAxis: {
                    title: {
                        text: 'Total Net Income',
                    },
                },
                series: [
                    { name: 'Crop', data: cropData, color: 'red'},
                    { name: 'Energy', data: energyData, color: 'green'},
                    { name: 'All', data: allData, color: 'blue'},
                    { name: 'US$', data: usData, color: 'orange'}
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
                    text: 'Total Income from Crop Insurance',
                },
                xAxis: {
                    categories: year,
                    title: {
                        text: 'Year',
                    },
                },
                yAxis: {
                    title: {
                        text: 'Income from Crop Insurance',
                    },
                },
                series: [
                    { name: 'Corn', data: CornData, color: 'red'},
                    { name: 'Wheat', data: WheatData, color: 'green'},
                    { name: 'Soyabean', data: SoyaData, color: 'blue'},
                    { name: 'SG', data: getsgData, color: 'yellow'}
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
