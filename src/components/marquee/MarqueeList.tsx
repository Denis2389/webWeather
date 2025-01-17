import Marquee from "react-fast-marquee";
import newsData from './marquee.json'
import css from './Marquee.module.scss'

const MarqueeList = () => {
    return (
      <Marquee autoFill={true} direction="left" speed={50} gradient={false}>
        <div className={css.marqContainer}>
          {newsData.news.map((item, index) => (
            <span key={index}> {item.title}</span>
          ))}
        </div>
      </Marquee>
    );
}

export default MarqueeList