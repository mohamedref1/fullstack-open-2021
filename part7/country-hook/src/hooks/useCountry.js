import { useState, useEffect } from 'react'
import axios from 'axios'

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name === '') {
      return
    }
    
    axios
    .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    .then(response => setCountry(response.data[0]))
    .catch((err) => {})
  }, [name])

  return country
}

export default useCountry