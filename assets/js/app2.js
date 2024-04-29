let newp = document.createElement("p");
let newp2 = document.createElement("p");
let newp3 = document.createElement("p");
let resultContainer = document.querySelector(".result");

async function getDataFromApi() {
    resultContainer.innerHTML = ''; 
    let city = document.querySelector(".city").value.trim();
    
    if (city === '') {
        alert("Please enter a city name.");
        return;
    }

    try {
        let apiUrl = `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${city}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        if (data.location && data.location.country) {
            newp.textContent = "City: " + city;
            resultContainer.appendChild(newp);

            newp2.textContent = "Country: " + data.location.country;
            resultContainer.appendChild(newp2);

            newp3.textContent = "Temperature: " + data.current.temp_c + "°C";
            resultContainer.appendChild(newp3);
        } else {
            console.error("Country information not found in the data.");
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

