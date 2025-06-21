
const dropdowns = document.querySelectorAll('.dropdown select');

for (let select of dropdowns){
    for(code in countryList){
        console.log(code, countryList[code]);
    }

}