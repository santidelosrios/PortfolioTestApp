import PropTypes from "prop-types";
import logo from "../../logo.svg";
import Wall from "../wall/wall";

import "./timeline.css";

const Timeline = (props) => {
  return (
    <Wall title={`${props.firstName}'s timeline`}>
      {props.tweets.map((tweet) => {
        return (
          <div className="timeline-body-tweet">
            <div className="tweet-img">
              <img alt="tweet-avatar" src={tweet.tweetImg} />
            </div>
            <div className="tweet-text">
              <b>{tweet.tweetTitle}</b>
              <br />
              <p>{tweet.tweetText}</p>
            </div>
          </div>
        );
      })}
    </Wall>
  );
};

Timeline.propTypes = {
  firstName: PropTypes.string,
  tweets: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};

export default Timeline;
