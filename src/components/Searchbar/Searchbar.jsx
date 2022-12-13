import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { MdSavedSearch } from 'react-icons/md';
import React, { Component } from 'react'

export default class Searchbar extends Component {
  state = {
    searchInput: '',
  };

  handleChange = e => {
    this.setState({ searchInput: e.currentTarget.value });
  }

  handleSubmit = e => {
    e.preventDefault();
   if (this.state.searchInput.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.searchInput);
    this.setState({ searchInput: '' });
  };

  render() {
    const { searchInput } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
     <div>
     <header className={css.Searchbar}>
     <form className={css.SearchForm} onSubmit={handleSubmit}>
     <button type="submit" className={css.SearchFormButton} >
     <MdSavedSearch style={{ width: 25, height: 25 }} />
    </button>
    <input
     className={css.SearchFormInput}
     value={searchInput}
     type="text"
     autoComplete="off"
     autoFocus
     placeholder="Search images and photos"
     onChange={handleChange}
    />
   </form>
   </header>
   </div>
    )
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}