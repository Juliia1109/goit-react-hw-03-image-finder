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
      const { searchInput } = this.state;
    e.preventDefault();
    this.props.onSubmit(searchInput);
    this.reset();
  }

  reset = () => {
    this.setState({ searchInput: '' });
  };

  render() {
    const { searchInput } = this.state;
    const { handleChange } = this;
    return (
     <div>
     <header className={css.Searchbar}>
     <form className={css.SearchForm} onSubmit={this.handleSubmit}>
     <button type="submit" className={css.SearchFormButton} >
     <MdSavedSearch style={{ width: 25, height: 25 }} />
    </button>
    <input
     className={css.SearchFormInput}
     value={searchInput}
     type="text"
     autocomplete="off"
     autofocus
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