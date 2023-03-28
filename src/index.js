import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import {fetchCountries} from './fetchCountries.js';

const inputEl = document.querySelector('#search-box');
const coutryListEl = document.querySelector('.country-list');
const wantedCounrtyInfoBox = document.querySelector('.country-info')

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onSearchCountryInput, DEBOUNCE_DELAY));

function onSearchCountryInput(e) {
    e.preventDefault();

    let wantedСountryName = e.target.value.trim()

    if (wantedСountryName === "") {
        coutryListEl.innerHTML = '';
        wantedCounrtyInfoBox.innerHTML = '';
        return;
    }

    fetchCountries(wantedСountryName)
        .then((data) => {
            if (data.length > 10) {
                Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
                coutryListEl.innerHTML = ""
                wantedCounrtyInfoBox.innerHTML = '';
                return
            }
            if (data.length <= 10 && data.length >= 2) {
                coutryListEl.innerHTML = createCountryList(data);
                wantedCounrtyInfoBox.innerHTML = '';
                console.log(data);
                return
            }
            if (data.length === 1) {
                console.log(data)
                wantedCounrtyInfoBox.innerHTML = createWantedCountryInfo(data); 
                coutryListEl.innerHTML = '';
                return
            } 
            
        }).catch((error) => {
            coutryListEl.innerHTML = "";
            wantedCounrtyInfoBox.innerHTML = '';
            if(error.message === "404") {
                inputEl.value = ""
                return Notiflix.Notify.failure('Oops, there is no country with that name');
            }
            console.log(error);
    })
}


function createCountryList(countries) {
    return countries.map((country) => `<li class="wanted-country_item">
    <img src="${country.flags.svg}" alt="Flag" class="wanted-country_img" width="30" height="20" />
    <p class="wanted-country_name">${country.name.official}</p>
    </li>`).join("");
}

function createWantedCountryInfo(countries) {
    return countries.map((country) => `<ul class="one-country-info">
    <li class="one-country-main-info"><img src="${country.flags.svg}" alt="Flag" class="one-country-img" width="50" height="30"/><p>${country.name.official}</p></li>
    <li class="one-country-item"><p><span class="one-country-text">Capital:</span> ${country.capital}</p></li>
    <li class="one-country-item"><p><span class="one-country-text">Population:</span> ${country.population}</p></li>
    <li class="one-country-item"><p><span class="one-country-text">Languages:</span> ${Object.values(country.languages)}</p></li>
    </ul>`).join("");
}

