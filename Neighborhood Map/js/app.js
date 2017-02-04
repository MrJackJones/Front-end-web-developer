var map;

var Marker = function(title, longitude, lattitude){
    this.title =  ko.observable(title);
    this.visible =  ko.observable(true);
    //Google Map LatLng API
    var myLatlng = new google.maps.LatLng(lattitude, longitude);
    //Google Map InfoWindow API
    var infoWindow = new google.maps.InfoWindow({
        content: "None"
    });

    this.info = infoWindow;
    //For each marker I call out to wikipedia to get some information. If there is no information that comes back, I
    //fail gracefully and add that no information was found.
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + this.title() + "&format=json&callback=wikiCallback",
        dataType: "jsonp",
        context: this
    }).done(function (data){
        if(data[2][0]){
            infoWindow.setContent(data[2][0]);
        }
    }).fail(function (){
        infoWindow.setContent("Information Unavailable for [" + this.title() + "]");
    });

    //Google Map Marker API
    this.marker = new google.maps.Marker({
        position: myLatlng,
        animation: google.maps.Animation.DROP,
        title: this.title()
    });

    //This function will both toggle the bounce the animation as well as show/hide the info window. I had some
    //trouble with the scoping so I had to figure out if I was being called from the DOM or a click to the marker
    //itself and change mark based on scope. It's not the cleanest implementation but I'm running low on time.
    this.toggleBounce = function(){
        var mark = (this.getAnimation) ? this : this.marker;
        if (mark.getAnimation() !== null) {
            mark.setAnimation(null);
            infoWindow.close();
        } else {
            viewModel.clearMarkers();
            mark.setAnimation(google.maps.Animation.BOUNCE);
            infoWindow.open(map, mark);
        }
    };

    this.marker.addListener("click", this.toggleBounce);

    //This sets the marker to the map, or to 'null' which removes the marker.
    this.onMap = ko.computed(function() {
        if(this.visible()){
            this.marker.setMap(map);
        } else  {
            this.marker.setMap(null);
        }
    }, this);

}

var ViewModel = function() {
    //Reference back to the ViewModel
    var self = this;

    //Knockout observable variables that will drive the functionality
    this.markerList = ko.observableArray([]);
    this.filter = ko.observable("");

    this.init = function(){
        // Create a map object and specify the DOM element for display. This will never be built again.
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 40.7523351, lng: -73.9758471},
            zoom: 12
        });

        //For each address above, I find the lattitude and longitude using Google Maps geocoding service. I then use this
        //to place all of the markers on the map. If I fail, I report out to the console that no information was available.
        locations.forEach(function(marker){
            $.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + marker.address + "&key=AIzaSyAxssFh-aC4nbjUWd5vz83FHhDnDjwucuA",
                dataType: "json"
            }).done(function (data){
                var lat = data.results[0].geometry.location.lat;
                var long = data.results[0].geometry.location.lng;
                self.markerList.push(new Marker(marker.title, long, lat));
            }).fail(function (){
                // Error message
                alert("Call using location info: [" + marker.address + "] has failed to find an address.");
                console.log("Call using location info: [" + marker.address + "] has failed to find an address.")
            });
        });
    }


    //I bound this change to act on the base list, and return only the values that successfully pass the filter. I then
    //toggle the visible state of the Marker based on that information.
    this.filteredMarkers = ko.computed(function () {
        return ko.utils.arrayFilter(self.markerList(), function (marker) {
            if(!self.filter() || marker.title().toLowerCase().indexOf(self.filter().toLowerCase()) > -1){
                marker.visible(true);
                return true;
            } else {
                marker.visible(false);
                return false;
            }
        });
    });

    this.clearMarkers = function(){
        for(var i = 0; i < self.markerList().length; i++){
            var mark = self.markerList()[i];
            if (mark.marker.getAnimation() !== null){
                mark.marker.setAnimation(null);
                mark.info.close();
            }
        }
    }
};

// Error message
function googleError() {
    alert("Map Error")
}

var viewModel = new ViewModel();
ko.applyBindings(viewModel);


