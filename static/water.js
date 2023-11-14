function drawCharts() {
    fetch('/calculateIrrigation')
    .then(response => response.json())
    .then(data => {
        const gwIrrigationData = JSON.parse(data.crop_groundwater_irrigation_data_for_img);
        const gwLevelData = JSON.parse(data.groundwater_level_data_img);

        const years = gwIrrigationData.irrigation.Year.map(Number);
        const cornData = gwIrrigationData.irrigation.Corn.map(Number);
        const wheatData = gwIrrigationData.irrigation.Wheat.map(Number);
        const soybeanData = gwIrrigationData.irrigation.Soybean.map(Number);
        const sgData = gwIrrigationData.irrigation.SG.map(Number);

        const netYears = gwLevelData.gw_level.Year.map(Number);
        const gwLevel = gwLevelData.gw_level.GW_level.map(Number); 
        const minAqLvl = gwLevelData.gw_level.Min_Aq.map(Number);
        const minPlus30 = gwLevelData.gw_level.MinPlus30.map(Number);

        // Create the first Highcharts for cropIrrigationChart

        Highcharts.chart('chart1', {
            title:{
                text: 'Crop Irrigation',
            },
            xAxis: {
                categories: years,
                title:{
                    text: 'Year'
                },
            },
            yAxis: {
                title:{
                    text:'Irrigation',
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
                text: 'Ground Water Level',
            },
            xAxis: {
                categories: netYears,
                title: {
                    text: 'Year',
                },
            },
            yAxis: {
                title: {
                    text: 'GroundWater Level',
                },
            },
            series: [
                { name: 'GW_level', data: gwLevel, color: 'red'},
                { name: 'Min_Aq', data: minAqLvl, color: 'green'},
                { name: 'MinPlus30', data: minPlus30, color: 'blue'}
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


