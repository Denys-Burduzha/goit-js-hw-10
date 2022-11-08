


import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './index';

export default class fetchCountries {
    constructor(){
        this.searchName = '';
        this.page = 1;
        this.countryGetInfo = '';
    }

    fetchCountries(name) {

    return fetch(`https://restcountries.com/v3.1/name/${this.searchName}?fields=name,capital,population,flags,languages`)
            .then((response) => {
                if (!response.ok) {
                    Notify.failure("Oops, there is no country with that name");
                    refs.countryInfo.innerHTML = '';
                    refs.countryList.innerHTML = '';
                    throw new Error(response.status);
                    
                }
                
                return response.json();
          
            })
            .then(data => {
                console.log(data);
                if (data.length > 10) {
                    Notify.info("Too many matches found. Please enter a more specific name.");
                }
                this.page += 1;
                this.countryGetInfo = data;
                return this.countryGetInfo;
            });
    
};

    get name() {
        return this.searchName;
    }
    
    set name(newName) {
        this.searchName = newName;
    }
};










