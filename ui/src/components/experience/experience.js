import PropTypes from "prop-types";
import Wall from "../wall/wall";

import "./experience.css";

const Experience = (props) => {
  return (
    <div className="experience-container">
      <div className="experience-name">
        <h1>{props.fullName}</h1>
      </div>
      <Wall title={props.experienceTitle}>{props.children}</Wall>
    </div>
  );
};

Wall.propTypes = {
  fullName: PropTypes.string,
  experienceTitle: PropTypes.string,
};

export default Experience;
