import { useState, useEffect, useContext, createContext } from 'react'
import { getFirestore, getDoc, getDocs, collection, collectionGroup, doc, addDoc, Timestamp, query, orderBy } from '@firebase/firestore'
import { AuthContext } from './AuthProvider'

export const DataContext = createContext()

export const DataProvider = function(props) {
    const [weatherList, setWeatherList] = useState([])
    const { user } = useContext(AuthContext)
    const db = getFirestore()


    useEffect(() => {
        const getWeatherList = async function() {
            const collectionRef = collectionGroup(db, 'weatherList')
            // const collectionSnap = await getDocs(collectionRef)
            const q = query(collectionRef, orderBy('dateCreated', 'desc'))
            const collectionSnap = await getDocs(q)

            const weatherListArr = []

            collectionSnap.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                weatherListArr.push({
                    ...doc.data(),
                    id: doc.id,
                    uid: doc.ref.parent.parent.id // Move up the firestore tree to find the user grandparent id
                })
            })

            setWeatherList(weatherListArr)
        }
        getWeatherList()
    }, [user])


    const addWeather = async function(city) {
        const weather = {
            city: city,
            dateCreated: Timestamp.now()
        }

        const collectionRef = collection(db, "users", user.uid, city) // Double check on this code later
        const docRef = await addDoc(collectionRef, weather)

        weather.id = docRef.id

        setWeatherList([weather, ...weatherList])
    }

    const getWeather = async function(uid, city, callback) {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e325c95def146ec0f6463c1ba75ad893`)
        const data = await res.json()
        callback(data)
        console.log(data)
    }

    // function getWeather(city) {
    //     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e325c95def146ec0f6463c1ba75ad893`)
    //         .then((res) => res.json())
    //         .then((data) => mainWeather(data))
    // /* Replaced console.log with function to convert data gathered from API */
    // }
    
    // function tempConvert(temp) {
    //     return Math.round((temp - 273.15) * 1.8 + 32)
    // }
    
    // function mainWeather(data) {
    
    //     let name = data.name
    //     let weatherMain = data.main.feels_like
    //     let weatherDescription = data.weather[0].description
    //     let weatherHumidity = data.main.humidity
    //     let weatherPressure = data.main.pressure 
    //     let weatherTemp = data.main.temp
    //     let weatherTempMax = data.main.temp_max
    //     let weatherTempMin = data.main.temp_min
    
    //     let clone = myTemplate.content.cloneNode(true);
    //     let td = clone.querySelectorAll('td')
    
    //     td[0].textContent = name
    //     td[1].textContent = tempConvert(weatherMain) 
    //     td[2].textContent = weatherDescription
    //     td[3].textContent = weatherHumidity
    //     td[4].textContent = weatherPressure
    //     td[5].textContent = tempConvert(weatherTemp)
    //     td[6].textContent = tempConvert(weatherTempMax)
    //     td[7].textContent = tempConvert(weatherTempMin)
    
    //     tableBody.appendChild(clone);
    // }
    
    // const myForm = document.getElementById('form')
    
    // myForm.addEventListener('submit', (event)=> {
    //     event.preventDefault()
    //     tableBody.innerHTML = ''
    //     const myForm = document.getElementById('form')
    //     formData = new FormData(myForm)
    //     var city = formData.get("city")
    //     getWeather(city)
    // })



    const value = {
        // city: city,
        // weather: weather,
        weatherList: weatherList,
        // myForm: myForm,
        getWeather: getWeather,
        addWeather: addWeather,
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}