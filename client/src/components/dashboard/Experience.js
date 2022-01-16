import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';
import formatDate from '../../utils/formatDate';

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}
      </td>
      <td>
        <button
          onClick={() => deleteExperience(exp._id)}
          className="btn btn-danger btn-sm"
        >
          <i className="fas fa-times"></i>
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h5 className="my-1">Experience</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
