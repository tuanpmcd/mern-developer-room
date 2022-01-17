import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => (
  <div
    className="p-2 mb-4 border"
    style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" }}
  >
    <div className="row d-flex align-items-center ">
      <div className='col-md-2'>
        <Link className='text-decoration-none d-flex flex-column justify-content-center align-items-center' to={`/profile/${user}`}>
          <img className="rounded-circle mb-2" width={70} src={avatar} alt="" />
          <h6 className='text-info'>{name}</h6>
        </Link>
      </div>
      <div className='col-md-10'>
        <p className="my-1">{text}</p>
        <p style={{fontSize: "12px", opacity: "0.7"}}>Posted on {formatDate(date)}</p>

        {showActions && (
          <>
            <button
              onClick={() => addLike(_id)}
              type="button"
              className="btn btn-light me-1 text-secondary"
            >
              <i className="fas fa-thumbs-up" />{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={() => removeLike(_id)}
              type="button"
              className="btn btn-light me-1 text-secondary me-2"
            >
              <i className="fas fa-thumbs-down" />
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-info btn-sm text-white me-5">
              Discussion{' '}
              {comments.length > 0 && (
                <span>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deletePost(_id)}
                type="button"
                className="btn btn-danger btn-sm"
              >
                <i className="fas fa-times" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
