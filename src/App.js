import Home from "./views/Home";
import WeatherSingle from "./views/WeatherSingle";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthContext } from './contexts/AuthProvider';
import { useContext } from 'react';

function App() {
    const { login, logout, user } = useContext(AuthContext)

    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
                {/* <image src="./images/weather-icon.jpeg/" className="img-fluid" alt="Responsive image" height="25" width="50"></image> */}
                <a className="navbar-brand" href="/">
                    Don't Go Outside, You Might Die
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/weather">Weather</Link>
                    </div>
                    <div className="navbar-nav ml-auto">
                        {
                            (user.loggedIn) ?
                                <button onClick={logout} className="btn btn-primary">Logout</button>
                                :
                                <button onClick={login} className="btn btn-primary">Login</button>
                        }
                    </div>
                </div>
            </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/weather">
                        <Route path=":uid">
                            <Route path=":city" element={<WeatherSingle />} />
                        </Route>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;