d3.queue()

    .defer(d3.csv, "data/success_europe_filter.csv")
    .defer(d3.csv, "data/failed_europe_filter.csv")
    .await(onDataLoaded);

function onDataLoaded(error, dataSucess, dataFailed) {

    if (error) {
        console.log('Error log: ' + error);
    } else {
        handleData(dataSucess, dataFailed);
    }

};

function handleData(dataSucess, dataFailed){

    var data = d3.merge([dataSucess, dataFailed]);
    structureData(data);

}

function structureData(data) {

    var filteredData = d3.nest()

        // Nest by month
        .key(function(d) {
            var timestampRaw = d.launched_at * 1000, // Data needs '000' appended to be a valid timestamp
                timestampDate = new Date(timestampRaw), // Converts integer into date object
                timestampMonth = timestampDate.getMonth(); // Gets the month from the date object
            return timestampMonth;
        }).sortKeys((a, b) => d3.ascending(+a, +b)) // Sort by numerical value

        // Nest by category
        .key(function(d) {
            return d["category/parent_id"];
        }).sortKeys((a, b) => d3.ascending(+a, +b)) // Sort by numerical value

        // Nest by subcategory
        .key(function(d) {
            return d["category/id"];
        }).sortKeys((a, b) => d3.ascending(+a, +b)) // Sort by numerical value

        // Nest by state (successful / failed)
        .key(function(d) {
            return d["state"];
        })

        .entries(data);

    extendData(filteredData);
}

// Function to add totals to the data
function extendData(data){

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        categoryNames = [],
        subcategoryNames = [];

    // Loop through months
    //-------------------
    _.map(data, function (month, i) {

        var monthFailed     = 0,
            monthSuccessful = 0,
            monthTotal      = 0,
            monthPercentage = 0;

        // Assign month name
        month.month = monthNames[i];

        // Loop through categories
        //-------------------
        _.map(month.values, function (category, i) {

            var categoryFailed     = 0,
                categorySuccessful = 0,
                categoryTotal      = 0,
                categoryPercentage = 0;

            // Assign category names
            category.category = categoryNames[i];

            // Loop through subcategories
            //-------------------
            _.map(category.values, function (subcategory, i) {

                var subcategoryFailed     = 0,
                    subcategorySuccessful = 0,
                    subcategoryTotal      = 0,
                    subcategoryPercentage = 0;

                // Assign subcategory names
                subcategory.subcategory = subcategoryNames[i];

                // Loop through stats
                //-------------------
                _.map(subcategory.values, function (state) {

                    // Assign totals to subcategories
                    if (state.key === 'successful') {
                        subcategorySuccessful = state.values.length;
                    }

                    if (state.key === 'failed') {
                        subcategoryFailed = state.values.length;
                    }

                    subcategory.failed = subcategoryFailed;
                    subcategory.successful = subcategorySuccessful;
                    subcategory.total = subcategoryFailed + subcategorySuccessful;
                    subcategory.percentile = ((subcategorySuccessful / (subcategoryFailed + subcategorySuccessful)) * 100).toFixed(2);

                });

                // Assign totals to categories
                categoryFailed = categoryFailed + subcategory.failed;
                categorySuccessful = categorySuccessful + subcategory.successful;
                categoryTotal = categoryTotal + subcategory.total;

                category.failed = categoryFailed;
                category.successful = categorySuccessful;
                category.total = categoryTotal;
                category.percentile = ((categorySuccessful / (categoryFailed + categorySuccessful)) * 100).toFixed(2);

            });

            // Assign totals to categories
            monthFailed = monthFailed + category.failed;
            monthSuccessful = monthSuccessful + category.successful;
            monthTotal = monthTotal + category.total;

            month.failed = monthFailed;
            month.successful = monthSuccessful;
            month.total = monthTotal;
            month.percentile = ((monthSuccessful / (monthFailed + monthSuccessful)) * 100).toFixed(2);
        });
    });

    console.log(data);

}
