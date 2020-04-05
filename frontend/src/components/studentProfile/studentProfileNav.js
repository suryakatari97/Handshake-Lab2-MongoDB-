import React from "react";
import { Link } from "react-router-dom";

//navbar

const StudentProfileAction = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/StudentProfileBasic" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/StudentExperience" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Experience
      </Link>
      <Link to="/StudentEducation" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add Education
      </Link>
    </div>
  );
};

export default StudentProfileAction;
