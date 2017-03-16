d3.queue()

    .defer(d3.csv, "data/success_europe_filter.csv")
    .defer(d3.csv, "data/failed_europe_filter.csv")
    .await(onDataLoaded);


function onDataLoaded(error, dataSucess, dataFailed) {

    if (error) {
        console.log('Error log: ' + error);
    } else {
        filterData(dataSucess);
        filterData(dataFailed);
    }

};

function filterData(data) {

    var filteredData = d3.nest()
        .key(function(d) { return d.currency; })
        .entries(data);
    console.log(filteredData);

}
