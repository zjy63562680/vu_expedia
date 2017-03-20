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
            d.parentid = d["category/parent_id"];
            return d.parentid;
        }).sortKeys((a, b) => d3.ascending(+a, +b)) // Sort by numerical value

        // Nest by subcategory
        .key(function(d) {
            d.categoryid = d["category/id"];
            return d.categoryid;
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
        categoryNames = {
            "1": {
                "name":"Art"
            },
            "3": {
                "name":"Comics"
            },
            "6": {
                "name":"Dance"
            },
            "7": {
                "name":"Design"
            },
            "9": {
                "name":"Fashion"
            },
            "10": {
                "name":"Food"
            },
            "11": {
                "name":"Film & Video"
            },
            "12": {
                "name":"Games"
            },
            "13": {
                "name":"Journalism"
            },
            "14": {
                "name":"Music"
            },
            "15": {
                "name":"Photography"
            },
            "16": {
                "name":"Technology"
            },
            "17": {
                "name":"Theater"
            },
            "18": {
                "name":"Publishing"
            },
            "26": {
                "name":"Crafts"
            },
        },
        subcategoryNames = {
            "20": {
                "name":"Conceptual Art"
            },
            "21": {
                "name":"Digital Art"
            },
            "22": {
                "name":"Illustration"
            },
            "23": {
                "name":"Painting"
            },
            "24": {
                "name":"Performance Art"
            },
            "25": {
                "name":"Sculpture"
            },
            "53": {
                "name":"Public Art"
            },
            "54": {
                "name":"Mixed Media"
            },
            "287": {
                "name":"Ceramics"
            },
            "288": {
                "name":"Installations"
            },
            "289": {
                "name":"Textiles"
            },
            "290": {
                "name":"Video Art"
            },
            "249": {
                "name":"Anthologies"
            },
            "250": {
                "name":"Comic Books"
            },
            "251": {
                "name":"Events"
            },
            "252": {
                "name":"Graphic Novels"
            },
            "253": {
                "name":"Webcomics"
            },
            "254": {
                "name":"Performances"
            },
            "255": {
                "name":"Residencies"
            },
            "256": {
                "name":"Spaces"
            },
            "257": {
                "name":"Workshops"
            },
            "27": {
                "name":"Graphic Design"
            },
            "28": {
                "name":"Product Design"
            },
            "258": {
                "name":"Architecture"
            },
            "259": {
                "name":"Civic Design"
            },
            "260": {
                "name":"Interactive Design"
            },
            "261": {
                "name":"Typography"
            },
            "262": {
                "name":"Accessories"
            },
            "263": {
                "name":"Apparel"
            },
            "264": {
                "name":"Childrenswear"
            },
            "265": {
                "name":"Couture"
            },
            "266": {
                "name":"Footwear"
            },
            "267": {
                "name":"Jewelry"
            },
            "268": {
                "name":"Pet Fashion"
            },
            "269": {
                "name":"Ready-to-wear"
            },
            "304": {
                "name":"Bacon"
            },
            "305": {
                "name":"Community Gardens"
            },
            "306": {
                "name":"Cookbooks"
            },
            "307": {
                "name":"Drinks"
            },
            "308": {
                "name":"Events"
            },
            "309": {
                "name":"Farms"
            },
            "310": {
                "name":"Farmer’s Markets"
            },
            "311": {
                "name":"Food Trucks"
            },
            "312": {
                "name":"Restaurants"
            },
            "313": {
                "name":"Small Batch"
            },
            "314": {
                "name":"Spaces"
            },
            "315": {
                "name":"Vegan"
            },
            "29": {
                "name":"Animation"
            },
            "30": {
                "name":"Documentary"
            },
            "31": {
                "name":"Narrative Film"
            },
            "32": {
                "name":"Shorts"
            },
            "33": {
                "name":"Webseries"
            },
            "291": {
                "name":"Action"
            },
            "292": {
                "name":"Comedy"
            },
            "293": {
                "name":"Drama"
            },
            "294": {
                "name":"Experimental"
            },
            "295": {
                "name":"Festivals"
            },
            "296": {
                "name":"Fantasy"
            },
            "297": {
                "name":"Horror"
            },
            "298": {
                "name":"Movie Theaters"
            },
            "299": {
                "name":"Music Videos"
            },
            "300": {
                "name":"Romance"
            },
            "301": {
                "name":"Science Fiction"
            },
            "302": {
                "name":"Thrillers"
            },
            "303": {
                "name":"Television"
            },
            "330": {
                "name":"Family"
            },
            "34": {
                "name":"Tabletop Games "
            },
            "35": {
                "name":"Video games"
            },
            "270": {
                "name":"Gaming Hardware"
            },
            "271": {
                "name":"Live Games"
            },
            "272": {
                "name":"Mobile Games"
            },
            "273": {
                "name":"Playing Cards"
            },
            "274": {
                "name":"Puzzles"
            },
            "357": {
                "name":"Audio"
            },
            "358": {
                "name":"Photo"
            },
            "359": {
                "name":"Print"
            },
            "360": {
                "name":"Video"
            },
            "361": {
                "name":"Web"
            },
            "36": {
                "name":"Classical Music"
            },
            "37": {
                "name":"Country & Folk"
            },
            "38": {
                "name":"Electronic Music"
            },
            "39": {
                "name":"Hip-Hop"
            },
            "40": {
                "name":"Indie Rock"
            },
            "41": {
                "name":"Jazz"
            },
            "42": {
                "name":"Pop"
            },
            "43": {
                "name":"Rock"
            },
            "44": {
                "name":"World Music"
            },
            "241": {
                "name":"Metal"
            },
            "316": {
                "name":"Blues"
            },
            "317": {
                "name":"Chiptune"
            },
            "318": {
                "name":"Faith"
            },
            "319": {
                "name":"Kids"
            },
            "320": {
                "name":"Latin"
            },
            "321": {
                "name":"Punk"
            },
            "322": {
                "name":"R&B"
            },
            "275": {
                "name":"Animals"
            },
            "276": {
                "name":"Fine Art"
            },
            "277": {
                "name":"Nature"
            },
            "278": {
                "name":"People"
            },
            "279": {
                "name":"Places"
            },
            "280": {
                "name":"Photobooks"
            },
            "51": {
                "name":"Software"
            },
            "52": {
                "name":"Hardware"
            },
            "331": {
                "name":"3D Printing"
            },
            "332": {
                "name":"Apps"
            },
            "333": {
                "name":"Camera Equipment"
            },
            "334": {
                "name":"DIY Electronics"
            },
            "335": {
                "name":"Fabrication Tools"
            },
            "336": {
                "name":"Flight"
            },
            "337": {
                "name":"Gadgets"
            },
            "338": {
                "name":"Robots"
            },
            "339": {
                "name":"Sound"
            },
            "340": {
                "name":"Space Exploration"
            },
            "341": {
                "name":"Wearables"
            },
            "342": {
                "name":"Web"
            },
            "362": {
                "name":"Makerspaces"
            },
            "281": {
                "name":"Experimental"
            },
            "282": {
                "name":"Festivals"
            },
            "283": {
                "name":"Immersive"
            },
            "284": {
                "name":"Musicals"
            },
            "285": {
                "name":"Plays"
            },
            "286": {
                "name":"Spaces"
            },
            "45": {
                "name":"Art Books"
            },
            "46": {
                "name":"Children’s Books"
            },
            "47": {
                "name":"Fiction"
            },
            "48": {
                "name":"Nonfiction"
            },
            "49": {
                "name":"Periodicals"
            },
            "50": {
                "name":"Poetry"
            },
            "239": {
                "name":"Radio & Podcasts"
            },
            "323": {
                "name":"Academic"
            },
            "324": {
                "name":"Anthologies"
            },
            "325": {
                "name":"Calendars"
            },
            "326": {
                "name":"Literary Journals"
            },
            "327": {
                "name":"Translations"
            },
            "328": {
                "name":"Young Adult"
            },
            "329": {
                "name":"Zines"
            },
            "323": {
                "name":"Academic"
            },
            "343": {
                "name":"Candles"
            },
            "344": {
                "name":"Crochet"
            },
            "345": {
                "name":"DIY"
            },
            "346": {
                "name":"Embroidery"
            },
            "347": {
                "name":"Glass"
            },
            "348": {
                "name":"Knitting"
            },
            "349": {
                "name":"Letterpress"
            },
            "350": {
                "name":"Pottery"
            },
            "351": {
                "name":"Printing"
            },
            "352": {
                "name":"Quilts"
            },
            "353": {
                "name":"Stationary"
            },
            "354": {
                "name":"Taxidermy"
            },
            "355": {
                "name":"Weaving"
            },
            "356": {
                "name":"Woodworking"
            },
        };

    // Set dataset variables
    var dsMonthNames = [],
        dsCategoryNames = [],
        dsSubcategoryNames = [];

    // Array of flat data
    var flatData = [];

    // Loop through months
    //-------------------
    _.map(data, function (month, i) {

        var monthFailed     = 0,
            monthSuccessful = 0,
            monthTotal      = 0,
            monthPercentage = 0;

        // Assign month name
        month.monthname = monthNames[i];
        month.monthnum = i;

        // Push month names to array
        dsMonthNames.push(month.monthname);

        // Loop through categories
        //-------------------
        _.map(month.values, function (category) {

            var categoryFailed     = 0,
                categorySuccessful = 0,
                categoryTotal      = 0,
                categoryPercentage = 0;

            // Assign category names
            category.categoryname = categoryNames[category.key].name;

            // Push category names to array
            dsCategoryNames.push(category.categoryname);


            // Loop through subcategories
            //-------------------
            _.map(category.values, function (subcategory, i) {

                var subcategoryFailed     = 0,
                    subcategorySuccessful = 0,
                    subcategoryTotal      = 0,
                    subcategoryPercentage = 0;

                // Assign subcategories
                subcategory.subcategoryname = subcategoryNames[subcategory.key].name;

                // Push category names to array
                dsSubcategoryNames.push(subcategory.subcategoryname);

                // Loop through states
                //-------------------
                _.map(subcategory.values, function (state) {

                    // Assign totals to subcategories
                    if (state.key === 'successful') {
                        subcategorySuccessful = state.values.length;
                    }

                    if (state.key === 'failed') {
                        subcategoryFailed = state.values.length;
                    }

                    subcategory.monthname = month.monthname;
                    subcategory.monthnum = month.monthnum;
                    subcategory.categoryname = category.categoryname;
                    subcategory.categorynum = state.values[0].parentid;
                    subcategory.subcategorynum = state.values[0].categoryid;
                    subcategory.failed = subcategoryFailed;
                    subcategory.successful = subcategorySuccessful;
                    subcategory.total = subcategoryFailed + subcategorySuccessful;
                    subcategory.percentile = ((subcategorySuccessful / (subcategoryFailed + subcategorySuccessful)) * 100).toFixed(2);

                });

                if (i === 0) {
                    category.monthname = month.monthname;
                    category.monthnum = month.monthnum;
                    category.subcategoryname = "all";
                    category.subcategorynum = subcategory.categorynum;
                    flatData.push(category);
                }

                // Push data to flat list
                flatData.push(subcategory);

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

    // Merge duplicates in arrays
    dsMonthNames = _.uniqBy(dsMonthNames);
    dsCategoryNames = _.uniqBy(dsCategoryNames);
    dsSubcategoryNames = _.uniqBy(dsSubcategoryNames); // This causes problems with subcategories of the same name

    // Send data to visualisation
    createVisualisation(data, flatData, dsMonthNames, dsCategoryNames, dsSubcategoryNames);

}

// Create visualization
function createVisualisation(rawdata, flatData, months, categories, subcategories) {

    // Create Canvas
    var canvasMargin = {top: 25, right: 25, bottom: 75, left: 75},
        canvasWidth = 960 - canvasMargin.left - canvasMargin.right,
        canvasHeight = 500 - canvasMargin.top - canvasMargin.bottom,
        barPadding = 10,
        barWidth = barWidth = Math.floor(canvasWidth / 12) - 1;

    var canvas = d3.select("body")
        .append("svg")
        .attr("width", canvasWidth + canvasMargin.left + canvasMargin.right)
        .attr("height", canvasHeight + canvasMargin.top + canvasMargin.bottom)
        .append("g")
        .attr("transform", "translate(" + canvasMargin.left + "," + canvasMargin.top + ")");

    // Creates the xAxis
    canvas.selectAll(".month")
        .data(months)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return i * (canvasWidth / months.length) + (barWidth);
        })
        .attr("y", canvasHeight + (canvasMargin.bottom / 2))
        .attr("text-anchor","middle")
        .attr("font-family","sans-serif")
        .attr("font-size","10px")

    ///////////// BELOW

    var cards = canvas.selectAll(".hour")
    .data(flatData, function(d) {
        console.log(d.subcategorynum + ' ' + d.monthnum );
        //return d.day+':'+d.hour;
    });
}
