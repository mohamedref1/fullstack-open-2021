import axios from "axios";

const baseURL = "https://restcountries.com/v2/name"

const get = (country) => {
    const fields = "name,capital,population,languages,flag"
    const url = `${baseURL}/${country}?fields=${fields}`

    return axios
            .get(url)
            .then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {get}