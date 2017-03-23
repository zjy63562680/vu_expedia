d3.queue()

    .defer(d3.csv, 'data/_failed.csv')
    .defer(d3.csv, 'data/_succes.csv')
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
           d.parentid = d['category/parent_id'];
           return d.parentid;
       }).sortKeys((a, b) => d3.ascending(+a, +b)) // Sort by numerical value

       // Nest by subcategory
       .key(function(d) {
           d.categoryid = d['category/id'];
           return d.categoryid;
       }).sortKeys((a, b) => d3.ascending(+a, +b)) // Sort by numerical value

       // Nest by state (successful / failed)
       .key(function(d) {
           return d['state'];
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
    var dsMonthNames = [];

    // Array of flat data
    var extendedData = [];

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

                    subcategory.type = "subcategory";
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
                    category.type = "category";
                    category.monthname = month.monthname;
                    category.monthnum = month.monthnum;
                    category.categorynum = categoryNames[categoryIndex].id;
                    category.categoryname = categoryNames[categoryIndex].name;
                    extendedData.push(category);
                }

                // Push data to flat list
                extendedData.push(subcategory);

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

    // Send data to visualisation
    createVisualisation(extendedData);

}

// Create visualization
function createVisualisation(data) {

    // Create Canvas
    var canvasWidth = 800,
        cardWidth = canvasWidth / 12,
        canvasWidthTotal = canvasWidth + (cardWidth * 2),
        cardHeight = 20,
        canvasMargin = {top: 0, right: 0, bottom: cardWidth, left: cardWidth},
        canvasHeight = (cardHeight * 35) + cardHeight,
        gridSize = Math.floor(canvasWidth / 24);

    var canvas = d3.select("body")
        .append("svg")
        .attr("width", canvasWidthTotal)
        .attr("height", canvasHeight)
        .attr("class", "heatmap")

    // Create each element
    var cards = canvas.selectAll(".cards")
    .data(data, function(d) {
        return d.monthnum, d.categorynum;
    });

    cards.enter()
        .append("rect")
        .attr("x", function(d) { return (d.monthnum * cardWidth) + (cardWidth * 2); })
        .attr("y", function(d) { return (d.categorynum * cardHeight) + (cardHeight); })
        .attr("class", function(d) {
            return d.type + ' card cat-' + d.categorynum
        })
        .attr("width", cardWidth)
        .attr("height", cardHeight)
        .style("opacity", function(d) { return (d.percentile / 100)})

    // Create the y axis
    var categoryNames = [];
    cards.enter()
        .append("text")
        .text(function(d, i) {

            // Check if the category has already b
            if (categoryNames.indexOf(d.categorynum) === -1) {
                categoryNames.push(d.categorynum)
                return d.categoryname;
            }

        })
        .attr("x", function(d) { return (cardWidth * 2) - 5; })
        .attr("y", function(d) { return (d.categorynum * cardHeight) + (cardHeight * 1.5); })
        .attr("class", function(d) {
            return d.type + ' axis-y cat-' + d.categorynum
        })

    // Create the x axis
    var monthNames = [],
        month = canvas.selectAll(".month")
    .data(data, function(d) {
        monthNames.push(d.monthname);
        return
    }),
    monthNames = _.uniqBy(monthNames);
    canvas.selectAll(".month")
        .data(monthNames)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return (cardWidth * i) + (cardWidth * 2.5);
        })
        .attr("y", cardHeight / 2)
        .attr("class","axis-x")

    // Bind events
    bindEvents()
}

// Interactions
function bindEvents() {

    var canvas = document.getElementsByClassName('heatmap')[0],
        cards = canvas.getElementsByClassName('card'),
        axis = canvas.getElementsByClassName('axis-y'),
        activeClass = 'active',
        state = 'cat-all';

    changeStates(state, canvas, cards, axis);

    for (var i = 0; i < cards.length ; i++) {
        cards[i].addEventListener('click',
            function () {
                if (!this.classList.contains(activeClass)) {
                    changeStates(this.classList[this.classList.length - 1], canvas, cards, axis);
                    highlightCategory(this.classList[this.classList.length - 1]);
                }
            }, false);
    }

    function highlightCategory(selector) {
        var $activeCategory = canvas.getElementsByClassName(selector);
        _.map(cards, function (el, i) {
            el.classList.remove(activeClass);
        });
        _.map(axis, function (el, i) {
            el.classList.remove(activeClass);
        });
        _.map($activeCategory, function (el, i) {
            el.classList.add(activeClass);
        });
    }
}

function changeStates(state, canvas, cards, axis) {

    console.log(state);

    // This should be done with CSS, however the Y position on <text> els doesn't work yet...
    var cardHeight = 20;

    // Functions to set positions
    function setCardX(position) {
        var newPosition = ((position * cardHeight) + cardHeight);
        return newPosition;
    }

    function setAxisX(position) {
        var newPosition = ((position * cardHeight) + (cardHeight * 1.5));
        return newPosition;
    }

    // Add default state
    canvas.id = state;

    // cat-all
    if (canvas.id === 'cat-all') {

        _.map(cards, function (el, i) {

            switch (el.classList[el.classList.length - 1]) {
                case 'cat-0':
                    el.setAttribute("y", setCardX(0));
                    break
                case 'cat-13':
                    el.setAttribute("y", setCardX(1));
                    break
                case 'cat-19':
                    el.setAttribute("y", setCardX(2));
                    break
                case 'cat-24':
                    el.setAttribute("y", setCardX(3));
                    break
                case 'cat-31':
                    el.setAttribute("y", setCardX(4));
                    break
                case 'cat-40':
                    el.setAttribute("y", setCardX(5));
                    break
                case 'cat-53':
                    el.setAttribute("y", setCardX(6));
                    break
                case 'cat-73':
                    el.setAttribute("y", setCardX(7));
                    break
                case 'cat-81':
                    el.setAttribute("y", setCardX(8));
                    break
                case 'cat-87':
                    el.setAttribute("y", setCardX(9));
                    break
                case 'cat-105':
                    el.setAttribute("y", setCardX(10));
                    break
                case 'cat-112':
                    el.setAttribute("y", setCardX(11));
                    break
                case 'cat-128':
                    el.setAttribute("y", setCardX(12));
                    break
                case 'cat-135':
                    el.setAttribute("y", setCardX(13));
                    break
                case 'cat-151':
                    el.setAttribute("y", setCardX(14));
                    break
                default:
                    el.setAttribute("y", cardHeight * -2);
            }

        });

        _.map(axis, function (el, i) {

            switch (el.classList[el.classList.length - 1]) {
                case 'cat-0':
                    el.setAttribute("y", setAxisX(0));
                    break
                case 'cat-13':
                    el.setAttribute("y", setAxisX(1));
                    break
                case 'cat-19':
                    el.setAttribute("y", setAxisX(2));
                    break
                case 'cat-24':
                    el.setAttribute("y", setAxisX(3));
                    break
                case 'cat-31':
                    el.setAttribute("y", setAxisX(4));
                    break
                case 'cat-40':
                    el.setAttribute("y", setAxisX(5));
                    break
                case 'cat-53':
                    el.setAttribute("y", setAxisX(6));
                    break
                case 'cat-73':
                    el.setAttribute("y", setAxisX(7));
                    break
                case 'cat-81':
                    el.setAttribute("y", setAxisX(8));
                    break
                case 'cat-87':
                    el.setAttribute("y", setAxisX(9));
                    break
                case 'cat-105':
                    el.setAttribute("y", setAxisX(10));
                    break
                case 'cat-112':
                    el.setAttribute("y", setAxisX(11));
                    break
                case 'cat-128':
                    el.setAttribute("y", setAxisX(12));
                    break
                case 'cat-135':
                    el.setAttribute("y", setAxisX(13));
                    break
                case 'cat-151':
                    el.setAttribute("y", setAxisX(14));
                    break
                default:
                    el.setAttribute("y", (0 * cardHeight) - (cardHeight * 2));
            }
        });
    }

    // Art category
    if (canvas.id === 'cat-0') {


        _.map(cards, function (el, i) {

            var artSubCats = ['cat-1', 'cat-2', 'cat-3', 'cat-4', 'cat-5', 'cat-6', 'cat-7', 'cat-8', 'cat-9', 'cat-10', 'cat-11', 'cat-12', 'cat-13'];
            if (el.classList.contains(artSubCats[0], artSubCats[1])) {
                console.log('found');
                // Check here http://stackoverflow.com/questions/6391448/how-to-apply-an-array-of-classes-to-classlist-contains
            }

            switch (el.classList[el.classList.length - 1]) {
                case 'cat-0':
                    el.setAttribute("y", setCardX(0));
                    break
                case 'cat-13':
                    el.setAttribute("y", setCardX(1 + 12));
                    break
                case 'cat-19':
                    el.setAttribute("y", setCardX(2 + 12));
                    break
                case 'cat-24':
                    el.setAttribute("y", setCardX(3 + 12));
                    break
                case 'cat-31':
                    el.setAttribute("y", setCardX(4 + 12));
                    break
                case 'cat-40':
                    el.setAttribute("y", setCardX(5 + 12));
                    break
                case 'cat-53':
                    el.setAttribute("y", setCardX(6 + 12));
                    break
                case 'cat-73':
                    el.setAttribute("y", setCardX(7 + 12));
                    break
                case 'cat-81':
                    el.setAttribute("y", setCardX(8 + 12));
                    break
                case 'cat-87':
                    el.setAttribute("y", setCardX(9 + 12));
                    break
                case 'cat-105':
                    el.setAttribute("y", setCardX(10 + 12));
                    break
                case 'cat-112':
                    el.setAttribute("y", setCardX(11 + 12));
                    break
                case 'cat-128':
                    el.setAttribute("y", setCardX(12 + 12));
                    break
                case 'cat-135':
                    el.setAttribute("y", setCardX(13 + 12));
                    break
                case 'cat-151':
                    el.setAttribute("y", setCardX(14 + 12));
                    break
                default:
                    el.setAttribute("y", cardHeight * -2);
            }

        });

        _.map(axis, function (el, i) {

            switch (el.classList[el.classList.length - 1]) {
                case 'cat-0':
                    el.setAttribute("y", setAxisX(0));
                    break
                case 'cat-13':
                    el.setAttribute("y", setAxisX(1 + 12));
                    break
                case 'cat-19':
                    el.setAttribute("y", setAxisX(2 + 12));
                    break
                case 'cat-24':
                    el.setAttribute("y", setAxisX(3 + 12));
                    break
                case 'cat-31':
                    el.setAttribute("y", setAxisX(4 + 12));
                    break
                case 'cat-40':
                    el.setAttribute("y", setAxisX(5 + 12));
                    break
                case 'cat-53':
                    el.setAttribute("y", setAxisX(6 + 12));
                    break
                case 'cat-73':
                    el.setAttribute("y", setAxisX(7 + 12));
                    break
                case 'cat-81':
                    el.setAttribute("y", setAxisX(8 + 12));
                    break
                case 'cat-87':
                    el.setAttribute("y", setAxisX(9 + 12));
                    break
                case 'cat-105':
                    el.setAttribute("y", setAxisX(10 + 12));
                    break
                case 'cat-112':
                    el.setAttribute("y", setAxisX(11 + 12));
                    break
                case 'cat-128':
                    el.setAttribute("y", setAxisX(12 + 12));
                    break
                case 'cat-135':
                    el.setAttribute("y", setAxisX(13 + 12));
                    break
                case 'cat-151':
                    el.setAttribute("y", setAxisX(14 + 12));
                    break
                default:
                    el.setAttribute("y", (0 * cardHeight) - (cardHeight * 2));
            }
        });
    }
}
