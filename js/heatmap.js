// Load the data
d3.queue()

    // Point to the data files
    .defer(d3.csv, "data/success_europe_filter.csv")
    .defer(d3.csv, "data/failed_europe_filter.csv")

    // When the data is loaded, run the function 'onDataLoaded'
    .await(onDataLoaded);

// Check the data is properly loadeed
function onDataLoaded(error, dataSucess, dataFailed) {

    if (error) {
        console.log('Error log: ' + error);
    } else {
        filterData(dataSucess);
        filterData(dataFailed);
    }

};

// Filter the data
function filterData(data) {

    var filteredData = d3.nest()

        // Arrange data into months
        .key(function(d) {
            var timestampRaw = d.launched_at * 1000, // Data needs '000' appended to be a valid timestamp
                timestampDate = new Date(timestampRaw), // Converts integer into date object
                timestampMonth = timestampDate.getMonth(); // Gets the month from the date object
            return timestampMonth;
        }).sortKeys((a, b) => d3.ascending(+a, +b)) // Sort by numerical value

        // Then arrange data into top level category
        .key(function(d) {
            return d["category/parent_id"];
        }).sortKeys((a, b) => d3.ascending(+a, +b)) // Sort by numerical value

        // Then arrange data into sub category
        .key(function(d) {
            return d["category/id"];
        }).sortKeys((a, b) => d3.ascending(+a, +b)) // Sort by numerical value

        .entries(data);

    console.log(filteredData);

}

var dataStructure = {
    "monthName": {
        "total": 0,
        "failed": 0,
        "success": 0,
        "percentile": 100,
        "categories": {
            "categoryName": {
                "all": {
                    "total": 0,
                    "failed": 0,
                    "success": 0,
                    "percentile": 100,
                },
                "subCategoryName": {
                    "total": 0,
                    "failed": 0,
                    "success": 0,
                    "percentile": 100,
                },
            }
        }
    },
};
