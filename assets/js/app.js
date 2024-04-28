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
            console.log('API Response:', json.data);
            
            var today = new Date().getDate();
            console.log(today);
            var data = json.data.find(item => parseInt(item.date.gregorian.day) - 1 === today);
            if (!data) {
                console.error('Timings for the current day not found');
                return;
            }

            var timings = data.timings;
            var timingNames = Object.keys(timings);
            let thead=document.querySelector("thead tr");
            var timingsTableBody = document.querySelector('#timingsTableBody tr');
            for (var i = 0; i < timingNames.length; i++) {
                console.log(timingNames[i]);
                var timingTime = timings[timingNames[i]]; 
    console.log(` ${timingTime}`);
                thead.innerHTML+=`
                <th scope="col">${timingNames[i]}</th>
                `
                timingsTableBody.innerHTML+=`                        <td>${timingTime}</td>
                `

            }
            console.log('Timings for the current day:', timings);

            var sesondOneWhole = document.querySelector(".sesondOneWhole");
            var data = json.data;
            let ArrayToCollect = [];
            
            for (let i = 0; i < data.length; i++) {
                let dayNumber = parseInt(data[i].date.gregorian.day);
                if (!ArrayToCollect.includes(dayNumber)) {
                    ArrayToCollect.push(dayNumber);
                }
            }
            ArrayToCollect.sort((a, b) => a - b);
            
            var tableHTML = `
                <table class="table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Day</th>
                            <th scope="col">Fajr</th>
                            <th scope="col">Sunrise</th>
                            <th scope="col">Dhuhr</th>
                            <th scope="col">Asr</th>
                            <th scope="col">Sunset</th>
                            <th scope="col">Maghrib</th>
                            <th scope="col">Isha</th>
                            <th scope="col">Imsak</th>
                            <th scope="col">Midnight</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            let tableAll2 = ''; 

            for (let index = 0; index < ArrayToCollect.length; index++) {
                const element = ArrayToCollect[index];
                let checkedData = data.find(item => parseInt(item.date.gregorian.day) === element);
                if (checkedData) {
                    let namazTimings = checkedData.timings;
                    // Concatenate the table rows for each day
                    tableAll2 += `
                        <tr>    
                            <td>${element}</td>
                            <td>${namazTimings.Fajr}</td>
                            <td>${namazTimings.Sunrise}</td>
                            <td>${namazTimings.Dhuhr}</td>
                            <td>${namazTimings.Asr}</td>
                            <td>${namazTimings.Sunset}</td>
                            <td>${namazTimings.Maghrib}</td>
                            <td>${namazTimings.Isha}</td>
                            <td>${namazTimings.Imsak}</td>
                            <td>${namazTimings.Midnight}</td>
                        </tr>`;
                }
            }
            
            sesondOneWhole.innerHTML = tableAll2; 
            
        //     for(var key in timings){
        //         var row = `<tr>
        //                <td>${key}</td>
        //                <td>${localTimings[key]}</td>
        //            </tr>`;
        // timingsTableBody.innerHTML += row;
        //     }
        })
        .catch(error => console.error('Error fetching data:', error));
}


