import React, { Component } from 'react';
import PostsList from './PostsList';

class PostsSearch extends Component {
  state = {
    searchQuery: ''
  }

  handleSubmit = event => event.preventDefault();

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { state, handleSubmit, handleInputChange } = this;
    const { searchQuery } = state;

    return (
      <div className="posts-search">
        <form className="posts-search__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="posts-search__search-field"
            name="searchQuery"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for blog posts…"
          />
        </form>
        {searchQuery &&
          <div className="results">
            <PostsList searchQuery={searchQuery} />
          </div>
        }
      </div>
    );
  }
}

export default PostsSearch;
