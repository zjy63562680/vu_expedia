d3.queue()

    .defer(d3.csv, "data/_failed.csv")
    .defer(d3.csv, "data/_succes.csv")
    .await(onDataLoaded);

function onDataLoaded(error, dataSucess, dataFailed) {

    if (error) {
        console.log('Error log: ' + error);
    } else {
        handleData(dataSucess, dataFailed);
    }

};

function handleData(dataFailed, dataSucess){

    var data = d3.merge([dataFailed, dataSucess]);
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
            "0": {
                "name":"Art",
                "id" : "0",
            },
            "1": {
                "name":"Comics",
                "id":"13",
            },
            "2": {
                "name":"Dance",
                "id":"19",
            },
            "3": {
                "name":"Design",
                "id":"24",
            },
            "4": {
                "name":"Fashion",
                "id":"31",
            },
            "5": {
                "name":"Food",
                "id":"40",
            },
            "6": {
                "name":"Film & Video",
                "id":"53",
            },
            "7": {
                "name":"Games",
                "id":"73",
            },
            "8": {
                "name":"Journalism",
                "id":"81",
            },
            "9": {
                "name":"Music",
                "id":"87",
            },
            "10": {
                "name":"Photography",
                "id":"105",
            },
            "11": {
                "name":"Technology",
                "id":"112",
            },
            "12": {
                "name":"Theater",
                "id":"128",
            },
            "13": {
                "name":"Publishing",
                "id":"135",
            },
            "14": {
                "name":"Crafts",
                "id":"151",
            },
        }
        subcategoryNames = {
            "0": {
                "name":"Art"
            },
            "1": {
                "name":"Conceptual Art"
            },
            "2": {
                "name":"Digital Art"
            },
            "3": {
                "name":"Illustration"
            },
            "4": {
                "name":"Painting"
            },
            "5": {
                "name":"Performance Art"
            },
            "6": {
                "name":"Sculpture"
            },
            "7": {
                "name":"Public Art"
            },
            "8": {
                "name":"Mixed Media"
            },
            "9": {
                "name":"Ceramics"
            },
            "10": {
                "name":"Installations"
            },
            "11": {
                "name":"Textiles"
            },
            "12": {
                "name":"Video Art"
            },
            "13": {
                "name":"Comics"
            },
            "14": {
                "name":"Anthologies"
            },
            "15": {
                "name":"Comic Books"
            },
            "16": {
                "name":"Events"
            },
            "17": {
                "name":"Graphic Novels"
            },
            "18": {
                "name":"Webcomics"
            },
            "19": {
                "name":"Dance"
            },
            "20": {
                "name":"Performances"
            },
            "21": {
                "name":"Residencies"
            },
            "22": {
                "name":"Spaces"
            },
            "23": {
                "name":"Workshops"
            },
            "24": {
                "name":"Design"
            },
            "25": {
                "name":"Graphic Design"
            },
            "26": {
                "name":"Product Design"
            },
            "27": {
                "name":"Architecture"
            },
            "28": {
                "name":"Civic Design"
            },
            "29": {
                "name":"Interactive Design"
            },
            "30": {
                "name":"Typography"
            },
            "31": {
                "name":"Fashion"
            },
            "32": {
                "name":"Accessories"
            },
            "33": {
                "name":"Apparel"
            },
            "34": {
                "name":"Childrenswear"
            },
            "35": {
                "name":"Couture"
            },
            "36": {
                "name":"Footwear"
            },
            "37": {
                "name":"Jewelry"
            },
            "38": {
                "name":"Pet Fashion"
            },
            "39": {
                "name":"Ready-to-wear"
            },
            "40": {
                "name":"Food"
            },
            "41": {
                "name":"Bacon"
            },
            "42": {
                "name":"Community Gardens"
            },
            "43": {
                "name":"Cookbooks"
            },
            "44": {
                "name":"Drinks"
            },
            "45": {
                "name":"Events"
            },
            "46": {
                "name":"Farms"
            },
            "47": {
                "name":"Farmer’s Markets"
            },
            "48": {
                "name":"Food Trucks"
            },
            "49": {
                "name":"Restaurants"
            },
            "50": {
                "name":"Small Batch"
            },
            "51": {
                "name":"Spaces"
            },
            "52": {
                "name":"Vegan"
            },
            "53": {
                "name":"Film & Video"
            },
            "54": {
                "name":"Animation"
            },
            "55": {
                "name":"Documentary"
            },
            "56": {
                "name":"Narrative Film"
            },
            "57": {
                "name":"Shorts"
            },
            "58": {
                "name":"Webseries"
            },
            "59": {
                "name":"Action"
            },
            "60": {
                "name":"Comedy"
            },
            "61": {
                "name":"Drama"
            },
            "62": {
                "name":"Experimental"
            },
            "63": {
                "name":"Festivals"
            },
            "64": {
                "name":"Fantasy"
            },
            "65": {
                "name":"Horror"
            },
            "66": {
                "name":"Movie Theaters"
            },
            "67": {
                "name":"Music Videos"
            },
            "68": {
                "name":"Romance"
            },
            "69": {
                "name":"Science Fiction"
            },
            "70": {
                "name":"Thrillers"
            },
            "71": {
                "name":"Television"
            },
            "72": {
                "name":"Family"
            },
            "73": {
                "name":"Games"
            },
            "74": {
                "name":"Tabletop Games "
            },
            "75": {
                "name":"Video games"
            },
            "76": {
                "name":"Gaming Hardware"
            },
            "77": {
                "name":"Live Games"
            },
            "78": {
                "name":"Mobile Games"
            },
            "79": {
                "name":"Playing Cards"
            },
            "80": {
                "name":"Puzzles"
            },
            "81": {
                "name":"Journalism"
            },
            "82": {
                "name":"Audio"
            },
            "83": {
                "name":"Photo"
            },
            "84": {
                "name":"Print"
            },
            "85": {
                "name":"Video"
            },
            "86": {
                "name":"Web"
            },
            "87": {
                "name":"Music"
            },
            "88": {
                "name":"Classical Music"
            },
            "89": {
                "name":"Country & Folk"
            },
            "90": {
                "name":"Electronic Music"
            },
            "91": {
                "name":"Hip-Hop"
            },
            "92": {
                "name":"Indie Rock"
            },
            "93": {
                "name":"Jazz"
            },
            "94": {
                "name":"Pop"
            },
            "95": {
                "name":"Rock"
            },
            "96": {
                "name":"World Music"
            },
            "97": {
                "name":"Metal"
            },
            "98": {
                "name":"Blues"
            },
            "99": {
                "name":"Chiptune"
            },
            "100": {
                "name":"Faith"
            },
            "101": {
                "name":"Kids"
            },
            "102": {
                "name":"Latin"
            },
            "103": {
                "name":"Punk"
            },
            "104": {
                "name":"R&B"
            },
            "105": {
                "name":"Photography"
            },
            "106": {
                "name":"Animals"
            },
            "107": {
                "name":"Fine Art"
            },
            "108": {
                "name":"Nature"
            },
            "109": {
                "name":"People"
            },
            "110": {
                "name":"Places"
            },
            "111": {
                "name":"Photobooks"
            },
            "112": {
                "name":"Technology"
            },
            "113": {
                "name":"Software"
            },
            "114": {
                "name":"Hardware"
            },
            "115": {
                "name":"3D Printing"
            },
            "116": {
                "name":"Apps"
            },
            "117": {
                "name":"Camera Equipment"
            },
            "118": {
                "name":"DIY Electronics"
            },
            "119": {
                "name":"Fabrication Tools"
            },
            "120": {
                "name":"Flight"
            },
            "121": {
                "name":"Gadgets"
            },
            "122": {
                "name":"Robots"
            },
            "123": {
                "name":"Sound"
            },
            "124": {
                "name":"Space Exploration"
            },
            "125": {
                "name":"Wearables"
            },
            "126": {
                "name":"Web"
            },
            "127": {
                "name":"Makerspaces"
            },
            "128": {
                "name":"Theater"
            },
            "129": {
                "name":"Experimental"
            },
            "130": {
                "name":"Festivals"
            },
            "131": {
                "name":"Immersive"
            },
            "132": {
                "name":"Musicals"
            },
            "133": {
                "name":"Plays"
            },
            "134": {
                "name":"Spaces"
            },
            "135": {
                "name":"Publishing"
            },
            "136": {
                "name":"Art Books"
            },
            "137": {
                "name":"Children’s Books"
            },
            "138": {
                "name":"Fiction"
            },
            "139": {
                "name":"Nonfiction"
            },
            "140": {
                "name":"Periodicals"
            },
            "141": {
                "name":"Poetry"
            },
            "142": {
                "name":"Radio & Podcasts"
            },
            "143": {
                "name":"Academic"
            },
            "144": {
                "name":"Anthologies"
            },
            "145": {
                "name":"Calendars"
            },
            "146": {
                "name":"Literary Journals"
            },
            "147": {
                "name":"Translations"
            },
            "148": {
                "name":"Young Adult"
            },
            "149": {
                "name":"Zines"
            },
            "150": {
                "name":"Academic"
            },
            "151": {
                "name":"Crafts"
            },
            "152": {
                "name":"Candles"
            },
            "153": {
                "name":"Crochet"
            },
            "154": {
                "name":"DIY"
            },
            "155": {
                "name":"Embroidery"
            },
            "156": {
                "name":"Glass"
            },
            "157": {
                "name":"Knitting"
            },
            "158": {
                "name":"Letterpress"
            },
            "159": {
                "name":"Pottery"
            },
            "160": {
                "name":"Printing"
            },
            "161": {
                "name":"Quilts"
            },
            "162": {
                "name":"Stationary"
            },
            "163": {
                "name":"Taxidermy"
            },
            "164": {
                "name":"Weaving"
            },
            "165": {
                "name":"Woodworking"
            },
        };

    // Set dataset variables
    var dsMonthNames = [],
        dsCategoryNames = [];

    // Array of flat data
    var flatData = [];

    // Loop through months
    //-------------------
    _.map(data, function (month, i) {

        // Assign month name
        month.monthname = monthNames[i];
        month.monthnum = i;

        // Push month names to array
        dsMonthNames.push(month.monthname);

        // Loop through categories
        //-------------------
        _.map(month.values, function (category, categoryIndex) {

            var categoryFailed     = 0,
                categorySuccessful = 0,
                categoryTotal      = 0,
                categoryPercentage = 0;


            // Loop through subcategories
            //-------------------
            _.map(category.values, function (subcategory, i) {

                var subcategoryFailed     = 0,
                    subcategorySuccessful = 0,
                    subcategoryTotal      = 0,
                    subcategoryPercentage = 0;

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
                    subcategory.categorynum = state.values[0].categoryid;
                    subcategory.categoryname = subcategoryNames[subcategory.categorynum].name;
                    subcategory.failed = subcategoryFailed;
                    subcategory.successful = subcategorySuccessful;
                    subcategory.total = subcategoryFailed + subcategorySuccessful;
                    subcategory.percentile = ((subcategorySuccessful / (subcategoryFailed + subcategorySuccessful)) * 100).toFixed(2);
                });

                // Adds total per category
                if (i === 0) {
                    category.type = "main";
                    category.monthname = month.monthname;
                    category.monthnum = month.monthnum;
                    category.categorynum = categoryNames[categoryIndex].id;
                    category.categoryname = categoryNames[categoryIndex].name;
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

        });
    });

    // Merge duplicates in arrays
    dsMonthNames = _.uniqBy(dsMonthNames);
    dsCategoryNames = _.uniqBy(dsCategoryNames);

    // Send data to visualisation
    createVisualisation(data, flatData, dsMonthNames, dsCategoryNames);

    console.log(flatData);

}

// Create visualization
function createVisualisation(rawdata, flatData, months, categories, subcategories) {

    // Create Canvas
    var canvasMargin = {top: 25, right: 25, bottom: 75, left: 75},
        canvasWidth = 960 - canvasMargin.left - canvasMargin.right,
        canvasHeight = 5610 - canvasMargin.top - canvasMargin.bottom,
        barPadding = 10,
        barWidth = barWidth = Math.floor(canvasWidth / 12) - 1,
        colors = ["#ff0000"],
        gridSize = Math.floor(canvasWidth / 24);

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

    var cards = canvas.selectAll(".hour")
    .data(flatData, function(d) {
        return d.monthnum+':'+d.categorynum;
    });

    cards.enter().append("rect")
              .attr("x", function(d) { return (d.monthnum - 1) * gridSize; })
              .attr("y", function(d) { return (d.categorynum - 1) * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", function(d) { return (d.main) })
              .attr("width", '34')
              .attr("height", '34')
             .style("fill", colors[0])
             .style("opacity", function(d) { return (d.percentile / 100)})

}
