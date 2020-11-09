import PropTypes from "prop-types";
import "./avatar.css";

const Avatar = (props) => {
  return (
    <div className="avatar-container">
      <img src={props.imgSrc} className="img" alt="avatar" />
    </div>
  );
};

Avatar.propTypes = {
  imgSrc: PropTypes.string,
};

export default Avatar;
