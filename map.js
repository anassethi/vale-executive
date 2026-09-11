// ==========================================
// VALE EXECUTIVE CARS - GOOGLE MAPS
// ==========================================

let valeMap;
let directionsService;

let pickupAutocomplete;
let dropoffAutocomplete;

let returnPickupAutocomplete;
let returnDropoffAutocomplete;

let oneWayRenderer;
let returnOutboundRenderer;
let returnJourneyRenderer;

// Store calculated route information
window.valeMapData = {
    oneWay: {
        distanceMeters: 0,
        distanceMiles: 0,
        distanceKm: 0
    },

    return: {
        outbound: {
            distanceMeters: 0,
            distanceMiles: 0,
            distanceKm: 0
        },

        returnJourney: {
            distanceMeters: 0,
            distanceMiles: 0,
            distanceKm: 0
        }
    }
};


// ==========================================
// GOOGLE MAPS INITIALIZATION
// ==========================================

window.initMap = function () {

    directionsService = new google.maps.DirectionsService();

    const mapElement = document.getElementById("map");

    if (!mapElement) {
        console.log("No map element found on this page.");
        return;
    }

    valeMap = new google.maps.Map(mapElement, {
        center: {
            lat: 51.505,
            lng: -0.09
        },

        zoom: 10,

        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
    });


    // ==========================================
    // ONE WAY PAGE
    // ==========================================

    const pickupInput = document.getElementById("pickup");
    const dropoffInput = document.getElementById("dropoff");

    if (pickupInput && dropoffInput) {

        pickupAutocomplete = new google.maps.places.Autocomplete(
            pickupInput,
            {
                fields: [
                    "formatted_address",
                    "geometry",
                    "name",
                    "place_id"
                ]
            }
        );

        dropoffAutocomplete = new google.maps.places.Autocomplete(
            dropoffInput,
            {
                fields: [
                    "formatted_address",
                    "geometry",
                    "name",
                    "place_id"
                ]
            }
        );


        pickupAutocomplete.addListener("place_changed", function () {
            checkOneWayRoute();
        });

        dropoffAutocomplete.addListener("place_changed", function () {
            checkOneWayRoute();
        });


        oneWayRenderer = new google.maps.DirectionsRenderer({
            map: valeMap,
            suppressMarkers: false
        });
    }


    // ==========================================
    // RETURN PAGE
    // ==========================================

    const returnPickupInput =
        document.getElementById("returnPickup");

    const returnDropoffInput =
        document.getElementById("returnDropoff");


    if (pickupInput &&
        dropoffInput &&
        returnPickupInput &&
        returnDropoffInput) {

        returnPickupAutocomplete =
            new google.maps.places.Autocomplete(
                returnPickupInput,
                {
                    fields: [
                        "formatted_address",
                        "geometry",
                        "name",
                        "place_id"
                    ]
                }
            );


        returnDropoffAutocomplete =
            new google.maps.places.Autocomplete(
                returnDropoffInput,
                {
                    fields: [
                        "formatted_address",
                        "geometry",
                        "name",
                        "place_id"
                    ]
                }
            );


        returnPickupAutocomplete.addListener(
            "place_changed",
            function () {
                checkReturnRoutes();
            }
        );


        returnDropoffAutocomplete.addListener(
            "place_changed",
            function () {
                checkReturnRoutes();
            }
        );


        returnOutboundRenderer =
            new google.maps.DirectionsRenderer({
                map: valeMap,
                suppressMarkers: false,
                preserveViewport: true
            });


        returnJourneyRenderer =
            new google.maps.DirectionsRenderer({
                map: valeMap,
                suppressMarkers: false,
                preserveViewport: true
            });
    }


    updateMapStatus("Select pickup and drop-off locations.");
};


// ==========================================
// ONE WAY ROUTE
// ==========================================

function checkOneWayRoute() {

    if (!pickupAutocomplete || !dropoffAutocomplete) {
        return;
    }

    const pickupPlace =
        pickupAutocomplete.getPlace();

    const dropoffPlace =
        dropoffAutocomplete.getPlace();


    if (
        !pickupPlace ||
        !pickupPlace.geometry ||
        !dropoffPlace ||
        !dropoffPlace.geometry
    ) {
        updateMapStatus(
            "Select both pickup and drop-off locations."
        );

        return;
    }


    calculateOneWayRoute(
        pickupPlace,
        dropoffPlace
    );
}


function calculateOneWayRoute(
    pickupPlace,
    dropoffPlace
) {

    updateMapStatus("Calculating route...");


    directionsService.route(
        {
            origin: pickupPlace.geometry.location,
            destination: dropoffPlace.geometry.location,

            travelMode:
                google.maps.TravelMode.DRIVING
        },

        function (result, status) {

            if (status !== "OK") {

                console.error(
                    "Google Maps route error:",
                    status
                );

                updateMapStatus(
                    "Unable to calculate this route."
                );

                return;
            }


            oneWayRenderer.setDirections(result);


            const leg =
                result.routes[0].legs[0];


            saveOneWayDistance(
                leg.distance.value
            );


            updateMapStatus(
                `Route calculated: ${leg.distance.text}`
            );
        }
    );
}


// ==========================================
// RETURN ROUTES
// ==========================================

function checkReturnRoutes() {

    if (
        !returnPickupAutocomplete ||
        !returnDropoffAutocomplete
    ) {
        return;
    }


    const pickupPlace =
        document.getElementById("pickup").value;

    const dropoffPlace =
        document.getElementById("dropoff").value;

    const returnPickupPlace =
        returnPickupAutocomplete.getPlace();

    const returnDropoffPlace =
        returnDropoffAutocomplete.getPlace();


    if (!pickupPlace || !dropoffPlace) {
        return;
    }


    if (
        !returnPickupPlace ||
        !returnPickupPlace.geometry ||
        !returnDropoffPlace ||
        !returnDropoffPlace.geometry
    ) {
        return;
    }


    // First route
    calculateReturnOutboundRoute();


    // Second route
    calculateReturnJourneyRoute(
        returnPickupPlace,
        returnDropoffPlace
    );
}


// ==========================================
// RETURN - OUTBOUND ROUTE
// ==========================================

function calculateReturnOutboundRoute() {

    const pickupInput =
        document.getElementById("pickup");

    const dropoffInput =
        document.getElementById("dropoff");


    if (
        !pickupInput.value ||
        !dropoffInput.value
    ) {
        return;
    }


    updateMapStatus("Calculating outbound route...");


    directionsService.route(
        {
            origin: pickupInput.value,

            destination:
                dropoffInput.value,

            travelMode:
                google.maps.TravelMode.DRIVING
        },

        function (result, status) {

            if (status !== "OK") {

                console.error(
                    "Outbound route error:",
                    status
                );

                return;
            }


            returnOutboundRenderer.setDirections(
                result
            );


            const leg =
                result.routes[0].legs[0];


            saveReturnOutboundDistance(
                leg.distance.value
            );


            updateMapStatus(
                `Outbound route: ${leg.distance.text}`
            );
        }
    );
}


// ==========================================
// RETURN - SECOND ROUTE
// ==========================================

function calculateReturnJourneyRoute(
    pickupPlace,
    dropoffPlace
) {

    updateMapStatus("Calculating return route...");


    directionsService.route(
        {
            origin:
                pickupPlace.geometry.location,

            destination:
                dropoffPlace.geometry.location,

            travelMode:
                google.maps.TravelMode.DRIVING
        },

        function (result, status) {

            if (status !== "OK") {

                console.error(
                    "Return route error:",
                    status
                );

                updateMapStatus(
                    "Unable to calculate return route."
                );

                return;
            }


            returnJourneyRenderer.setDirections(
                result
            );


            const leg =
                result.routes[0].legs[0];


            saveReturnJourneyDistance(
                leg.distance.value
            );


            updateMapStatus(
                `Return route: ${leg.distance.text}`
            );
        }
    );
}


// ==========================================
// SAVE ONE WAY DISTANCE
// ==========================================

function saveOneWayDistance(meters) {

    const miles =
        meters / 1609.344;

    const km =
        meters / 1000;


    window.valeMapData.oneWay = {

        distanceMeters: meters,

        distanceMiles:
            Number(miles.toFixed(2)),

        distanceKm:
            Number(km.toFixed(2))
    };


    const distanceMilesInput =
        document.getElementById("distanceMiles");

    const distanceKmInput =
        document.getElementById("distanceKm");


    if (distanceMilesInput) {

        distanceMilesInput.value =
            miles.toFixed(2);
    }


    if (distanceKmInput) {

        distanceKmInput.value =
            km.toFixed(2);
    }
}


// ==========================================
// SAVE RETURN OUTBOUND DISTANCE
// ==========================================

function saveReturnOutboundDistance(meters) {

    const miles =
        meters / 1609.344;

    const km =
        meters / 1000;


    window.valeMapData.return.outbound = {

        distanceMeters: meters,

        distanceMiles:
            Number(miles.toFixed(2)),

        distanceKm:
            Number(km.toFixed(2))
    };


    const input =
        document.getElementById(
            "outboundDistanceMiles"
        );


    if (input) {

        input.value =
            miles.toFixed(2);
    }
}


// ==========================================
// SAVE RETURN JOURNEY DISTANCE
// ==========================================

function saveReturnJourneyDistance(meters) {

    const miles =
        meters / 1609.344;

    const km =
        meters / 1000;


    window.valeMapData.return.returnJourney = {

        distanceMeters: meters,

        distanceMiles:
            Number(miles.toFixed(2)),

        distanceKm:
            Number(km.toFixed(2))
    };


    const input =
        document.getElementById(
            "returnDistanceMiles"
        );


    if (input) {

        input.value =
            miles.toFixed(2);
    }


    updateMapStatus(
        "Both routes calculated successfully."
    );
}


// ==========================================
// MAP STATUS
// ==========================================

function updateMapStatus(message) {

    const status =
        document.getElementById("routeStatus");

    if (status) {
        status.textContent = message;
    }
}