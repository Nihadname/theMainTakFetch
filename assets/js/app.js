var x = document.getElementById("x");
let latitude;
let longitude;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    getDataFromApi(latitude, longitude); 
}

function getCurrentYearMonth() {
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 

    var formattedYearMonth = `${year}/${month}`;

    return formattedYearMonth;
}

async function getDataFromApi(latitude, longitude) {
    if (!latitude || !longitude || !getCurrentYearMonth()) {
        console.error('Latitude, longitude, or current year/month is missing');
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        console.log('Current Year/Month:', getCurrentYearMonth());
        return;
    }

    var apiUrl = `http://api.aladhan.com/v1/calendar/${getCurrentYearMonth()}?latitude=${latitude}&longitude=${longitude}&method=2`;
    await fetch(apiUrl)
        .then(res => res.json())
        .then(json => {
            console.log('API Response:', json);
            
            var today = new Date().getDate();
            console.log(today);
            var data = json.data.find(item => parseInt(item.date.gregorian.day) - 1 === today);
            if (!data) {
                console.error('Timings for the current day not found');
                return;
            }

            var timings = data.timings;
            console.log('Timings for the current day:', timings);
        })
        .catch(error => console.error('Error fetching data:', error));
}


