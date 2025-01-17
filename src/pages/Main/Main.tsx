import WeatherApp from "../../components/WeatherApp/WeatherApp"
import style from './Main.module.scss'

const Main = () => {
    return (
        <div className={style.container}>
            <WeatherApp />
        </div>
    )
}

export default Main