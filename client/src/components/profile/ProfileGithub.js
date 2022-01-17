import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <div>
      <h2 className="text-info my-1 mb-3">Github Repos</h2>
      {repos.map(repo => (
        <div key={repo.id} className="p-1 my-1 border-bottom">
            <h6>
              <a href={repo.html_url} className='text-info ' target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h6>
            <small>{repo.description}</small>
          <div>
            <ul className='mt-2 px-0'>
              <li className='badge bg-info mx-1'>
                Stars: {repo.stargazers_count}
              </li>
              <li className='badge bg-dark mx-1'>
                Watchers: {repo.watchers_count}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
