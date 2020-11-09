import PropTypes from "prop-types";

import "./wall.css";

const Wall = (props) => {
  return (
    <div className="wall-container">
      <div className="wall-title">
        <h3>{props.title}</h3>
      </div>
      <div className="wall-body">{props.children}</div>
    </div>
  );
};

Wall.propTypes = {
  title: PropTypes.string,
};
export default Wall;
