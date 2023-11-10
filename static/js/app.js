// Setting up the function for the charts to be utilized
function buildCharts(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let samples = data.samples;
        let resultArray = samples.filter((sampleDictionary) => sampleDictionary.id == sample);
        let result = resultArray[0];

        let otuIDs = result.otu_ids;
        let otuLabels = result.otu_labels;
        let sampleValues = result.sample_values;

        // Setting layout for the Bubble Chart
        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: { title: "OTU ID"},
            margin: { t: 30, l: 30}
        };
        
        // Defining data to be used for the Bubble Chart
        let bubbleData = [
            {
                x: otuIDs,
                y: sampleValues,
                text: otuLabels,
                mode: "markers",
                marker: {
                    size: sampleValues,
                    color: otuIDs,
                    colorscale: "Earth"
                }
            }
        ]
        
        // Using Plotly to generate the Bubble Chart
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        // Defining data to be used for the Bar Chart
        let yticks = otuIDs.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(); 
        let barData = [
            {
                y: yticks,
                x: sampleValues.slice(0,10).reverse(),
                text: otuLabels.slice(0,10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ]

        // Setting Layout for the Bar Chart
        let barLayout = {
            title: "Top Ten Bacteria Cultures Found",
            margin: { t: 30, l: 150}
        }

        // Using Plotly to generate the Bar Chart
        Plotly.newPlot("bar", barData, barLayout)
    });
}

// Building the Demographic Info Panel
function buildMetadata(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let metadata = data.metadata;

        let resultArray = metadata.filter(sampleDictionary => sampleDictionary.id == sample);

        let result = resultArray[0];

        let PANEL = d3.select("#sample-metadata");

        PANEL.html("");

        for (key in result) {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`)
        }

        // Running the function for the Gauge Chart created in bonus.js
        buildGauge(result.wfreq);

    })        
}

// Defining the data to be used in the charts
function init() {
    let selector = d3.select("#selDataset");
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let sampleNames = data.names;

        for(let i = 0; i < sampleNames.length; i++){
            selector.append("option").text(sampleNames[i]).property("value", sampleNames[i])
        }
        let firstSample = sampleNames[0];
        buildCharts(firstSample);
        BiquadFilterNode;
        buildMetadata(firstSample);
    })
}

// Creating the function to update displayed values based on the Test Subject selected from the dropdown.
function optionChanged(newSample){
    buildCharts(newSample);
    buildMetadata(newSample);
}

init();