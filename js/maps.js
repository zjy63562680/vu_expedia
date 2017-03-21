

function maps(project){

    text =  project ;
        d3.json("data/success_europe_filtered_changedID.json",function(data){
            var list_values = [];
            var countries = {};
            var sum = 0;



           data['data'].forEach(function(element) {
                if (element['category']['name'] === text){
                    countries[element['location']['country']] = (countries[element['location']['country']] || 0) + 1;
                    };
             });


            for (var key in countries) {
            var value = countries[key];
            sum += value
            list_values.push(value);
        }
        total_projects = 'Total of projects category "' + project + '" in Europe : ' + sum
        var element = document.getElementById("header");
        element.innerHTML = total_projects;

        	
            var max = Math.max(...list_values);
            var min = Math.min(...list_values);

            var color = d3.scale.linear()
            .domain([min, max])
            .range(["#B6D4FF", "blue"]);

    var dataset2 ={};
      for (var key in countries) {
      		dataset2[key] = {numberOfThings: countries[key], fillColor : color(countries[key]) };
      	};


    window.DatamapHR = window.Datamap;
    var hires = new DatamapHR({
      scope: 'world',
      fills: {
          defaultFill: '#F5F5F5',
          lt50: 'black',
          empty: '#E5E4FF'},

          geographyConfig: {
            borderColor: '#FDFDFD',
            popupTemplate: function(geography, data) {
              return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong>' + " <br> Number of Projects : " + data.numberOfThings+ '</div>';
          },
          highlightFillColor: 'red',
      },


      data: dataset2,  

    element: document.getElementById('zoomed-hr'),
    setProjection: function(element) {
        var projection = d3.geo.mercator()
        .center([10, 50])
        .rotate([4.4, 0])
        .scale(600)
        .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
        var path = d3.geo.path()
        .projection(projection);

        return {path: path, projection: projection};
            }
        })


            }); 
        }
