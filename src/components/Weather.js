import { Link } from 'react-router-dom';


export default function Weather(props) {
    return (
        <div className="card">
            <div className="card-header">
                {
                    (!props.preview) ?
                    (
                        <h2>{ props.weather.main.name }</h2>
                    )
                    :
                    <Link to={`/weather/${props.weather.uid}/${props.weather.main.name}`}>{ props.weather.main.name }</Link>
                }
            </div>
            {
                (!props.preview) ?
                (
                    <div className="card-body">
                        <p>{ props.weather.body }</p>
                    </div>
                )
                :
                ''
            }
        </div>
    )
}