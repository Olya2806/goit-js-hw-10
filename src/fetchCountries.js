export default function fetchCountries(countryName) {
    const COUNRY_URL = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;   

    return fetch(COUNRY_URL).then(response => {
    if (!response.ok) {
    throw new Error(response.status);
        }
        
    return response.json();
})
}