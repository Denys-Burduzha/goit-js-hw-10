

const DEBOUNCE_DELAY = 300;

import './css/styles.css';
import RestCountriesAPI from "./fetchCountries";
import  debounce  from 'lodash.debounce';
export { refs };

const refs = {
  searchBox: document.querySelector("input#search-box"),
  countryList: document.querySelector(".country-list"),
  countryInfo: document.querySelector(".country-info"),
};
let name = '';
const fetchCountries = new RestCountriesAPI();

refs.searchBox.addEventListener("input",
    debounce(onSearch, DEBOUNCE_DELAY, { trailing: true }));

function onSearch(event) {
  event.preventDefault();
  
  name = event.path[0].value.trim();
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';

  if (name !== "") {
   fetchCountries.name = name;
   fetchCountries.fetchCountries(name).then(countryGetInfo => {
  
      renderCountryInfo(countryGetInfo);
    });
  }
};

function renderCountryInfo(countryGetInfo) {

    for (const key in countryGetInfo) {
    if (Object.hasOwnProperty.call(countryGetInfo, key)) {
        
      const element = countryGetInfo[key];

      const { name, capital, population, flags, languages
      } = element;
        
      if (countryGetInfo.length > 1 && countryGetInfo.length < 10) {

        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        
        return AddCountryList(countryGetInfo);
      }
      
      if (countryGetInfo.length === 1) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        
        return AddCountryFullInfo(countryGetInfo);
      };
      
      if (countryGetInfo.length > 10) {
        
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
      }

      function AddCountryFullInfo(_countryGetInfo) {
      
        return refs.countryInfo.insertAdjacentHTML("beforeend", `<div class="flag-country-block">
        <img
          class="flag"
          src="${flags.svg}"
          alt="flag"
        />
        <h1>${name.official}</h1>
      </div>
      <ul class="country-info-details">
        <li class="country-info-item">
          <h2>Capital:</h2>
          <span class="info-value">${capital}</span>
        </li>
        <li class="country-info-item">
          <h2>Population:</h2>
          <span class="info-value">${population}</span
          >
        </li>
        <li class="country-info-item">
          <h2>Languages:</h2>
          <span class="info-value">${Object.values(languages)}</span
          >
        </li>
      </ul>`);
    }
    }
  };
};

function AddCountryList(countryGetInfo) {
  const markup = countryGetInfo.map((item) => {
    console.log(item);
    return `<li class="country-list-item">
        <img
          class="flag-list"
          src="${item.flags.svg}"
          alt="flag"
          />
        <h2 class="list-item-h2">${item.name.official}</h2>
      </li>`
  }).join("");

  refs.countryList.insertAdjacentHTML("beforeend", markup);
};






