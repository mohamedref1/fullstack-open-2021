import React, {useEffect, useState} from 'react'
import CountryForm from './components/CountryForm'
import CountryDisplay from './components/CountryDisplay'
import CountriesList from './components/CountryList'
import countryService from './services/countries'
import weatherService from './services/weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState('')
  const [weather, setWeather] = useState({})

  useEffect(() => {
    if(newCountry === '') {
      setCountries([])
      return
    }

    countryService
      .get(newCountry)
      .then(countries => setCountries(countries))

  }, [newCountry])

  useEffect(() => {
    if (countries.length !== 1) {
      return
    }

    const cityName = countries[0].capital

    weatherService
      .get(cityName)
      .then(weather => setWeather(weather))
  }, [countries])

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const handleInputChange = (event) => {
    setNewCountry(event.target.value)
  }

  const showSelectedCountry = (event) => {
    setNewCountry(event.target.value)
  }

  const numOfCountries = countries.length

  return (
    <div>
      <CountryForm onSubmit={handleSubmit}
                   onChange={handleInputChange}
                   value={newCountry} />
      <div>
        {numOfCountries > 10
          ? 'Too many matches, specify another filter'
          : numOfCountries <= 10 && numOfCountries > 1
          ? <CountriesList countries={countries}
                           onClick={showSelectedCountry}
            />
          : numOfCountries === 1
          ? <CountryDisplay name={countries[0].name}
                            capital={countries[0].capital}
                            population={countries[0].population}
                            languages={countries[0].languages}
                            flag={countries[0].flag}
                            temp={weather.temp}
                            windSpeed={weather.windSpeed}
                            windDeg={weather.windDeg}
            />
          : ''
        }
      </div>
    </div>
  )
}

export default App