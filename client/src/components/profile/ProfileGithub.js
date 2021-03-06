import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CLIENT_ID = '13dd5c4e5e88aa94288d';
const CLIENT_SECRET = '1d1c07de00dc90c596cbb2bb367c37d54b9d74b7';

class ProfileGithub extends Component {
  state = {
    count: 5,
    sort: 'created: asc',
    repos: []
  };

  componentDidMount() {
    const { username } = this.props;
    const { count, sort } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.container) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success mr-1">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref={container => (this.container = container)}>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
