async function getDataFromApi(city) {
    let City = document.querySelector(".city").value;
    console.log("City:", City);
    
    if (!City) {
        console.error("City is undefined or empty.");
        return;
    }
let here=document.querySelector(".here")
    let newp=document.createElement("p");
    newp.textContent="city:"+City;
    here.appendChild(newp);
 

    let apiUrl = `https://api.weatherapi.com/v1/current.json?key=6bc15cfb31414fbda9f95625221905&q=${City}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        if (data.location && data.location.country) {
            let newp2 = document.createElement("p");
            newp2.textContent = "Country: " + data.location.country;
            here.appendChild(newp2);
            let newp3=document.createElement("p")
        } else {
            console.error("Country information not found in the data.");
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

getDataFromApi();
