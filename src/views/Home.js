import WeatherList from '../components/WeatherList'
import WeatherForm from '../components/WeatherForm'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'

export default function Home() {
    const { login, user } = useContext(AuthContext)

    return (
        <>
        <div className="card text-center">
            <h5 className="card-header">Home</h5>
            <div className="card-body">
                {(user.loggedIn) ?
                    (
                        <>
                            <p>Welcome, {user.username}</p>
                            <WeatherForm />
                            <WeatherList />
                        </>
                    )
                    :
                    (
                        <>
                            <h5 className="card-title">Welcome to the Weather App</h5>
                            <p className="card-text">Please login to continue</p>
                            <button onClick={login} className="btn btn-primary">Login</button>
                        </>
                    )}
            </div>
        </div>
        </>
    )
}