    const BaseURL = "https://v6.exchangerate-api.com/v6/60d247f8f3552af5a947b9a4/latest/USD";
    let apiKey ="60d247f8f3552af5a947b9a4";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");
for(let select of dropdown){
    for(currCode in countryList){
        let newOptions = document.createElement("option");
        newOptions.innerText = currCode;
        newOptions.value = currCode;
        if(select.name === "From" && currCode === "USD"){
            newOptions.selected = "selected";
        }else if(select.name === "To" && currCode === "INR"){
            newOptions.selected = "selected";
        }
        select.appendChild(newOptions);
    }
    select.addEventListener("change", (evt) => {
       updateFlag(evt.target);
    })
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amtValue = amount.value;
    console.log(amtValue);
    if(amtValue === "" || amtValue <= 0){
        // alert("Please enter a valid amount");
        // return;
        amtValue = 1;
        amount.value = "1";
    }
let URL = `${BaseURL}?apiKey=${apiKey}`;
    fetch(URL)
    .then(response => response.json())
    .then(result => {
        let fromCurr = dropdown[0].value;
        let toCurr = dropdown[1].value;
        let fromRate = result.conversion_rates[fromCurr];
        let toRate = result.conversion_rates[toCurr];
        let total = (toRate / fromRate) * amtValue;
        document.querySelector(".total").innerText = `Total: ${total.toFixed(2)} ${toCurr}`;
    })
    .catch(err => {
        console.error("Error fetching exchange rates:", err);
    });
    

});





