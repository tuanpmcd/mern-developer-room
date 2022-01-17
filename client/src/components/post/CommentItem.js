import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => (
  <div className="p-1 my-1">
    <div
      className="row bg-light d-flex align-items-center justify-content-center border p-2 mb-2"
      style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" }}
    >
      <div className='col-md-2'>
        <Link
          to={`/profile/${user}`}
          className='text-decoration-none d-flex flex-column align-items-center justify-content-center'
        >
          <img className="rounded-circle mb-2" width={50} src={avatar} alt="" />
          <h6 className='text-info'>{name}</h6>
        </Link>
      </div>
      <div className='col-md-10'>
        <p className="my-1">{text}</p>
        <p style={{ fontSize: "12px", opacity: "0.7" }}>Posted on {formatDate(date)}</p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deleteComment(postId, _id)}
            type="button"
            className="btn btn-danger btn-sm"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
