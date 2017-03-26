// Fire functions when the page has loaded
document.addEventListener("DOMContentLoaded", function() {

    bindNavigation();
    handleUrlRequest();
    hideShowViz('hide');
    // URL entered event?

});

// Adds click listeners to tabs
function bindNavigation() {

    var tabs = document.querySelectorAll('.cust-tab');

    Array.prototype.forEach.call(tabs, function(tab){

        tab.addEventListener("click", function(){

            // Get the target ID and change into a class (overwriting the framework this way)
            var target = '.'+ tab.hash.substr(1);

            // Scroll to target
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth'
            });

            window.scrollBy(0, -238); // Offsets the fixed nav

        }, false);

    });
}

function handleUrlRequest () {
    $('.submit').on('click', function (e) {
        e.preventDefault();
        var input = $('.url-input');
        self.json = {};
        json = {};
        $.ajax({
            type: "GET",
            url: $(input).val(),
            data: input.serialize(), // serializes the form's elements.
        }).then(function (data) {
            var title, country, category, goal;

                $(data).find('a[href*="places"]').filter(function(){
                  var data = $(this);
                  country = data.text().trim().split(", ").pop();

                  json.country = country;
                });

                $(data).find('a[href*="categories"]').filter(function(){
                  var data = $(this);
                  category = data.text().trim();

                  json.category = category;
                });

                $(data).find('div.num').filter(function(){
                  var data = $(this);
                  goal = data.attr('data-goal');

                  json.goal = goal;
                });

            if (json.category) {
                var event = new CustomEvent('urlHandled', {
                    'detail': {
                        'country'     : json.country,
                        'category'    : json.category,
                        'subcategory' : 'example',
                        'goal'        : json.goal,
                        'googletrend' : 'example',
                    }
                });
                window.dispatchEvent(event);
                $('.cust-viz.viz-2').html('<iframe class="bubble_chart" src="amaka/bubble_chart.html" height="500"></iframe>');
                hideShowViz('show');
            }
        });
    });
}

function hideShowViz (hideShow) {
    if (hideShow === 'hide') {
        $('.bubble_chart').hide();
    } else if (hideShow === 'show') {
        $('.bubble_chart').show();
    }
}
