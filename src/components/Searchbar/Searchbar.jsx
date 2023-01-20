import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './searchbar.module.css';
import { ReactComponent as Search } from '../icons/search.svg';

class Searchbar extends Component {
  // state = {
  //   query: '',
  // };

  // handleChange = e => {
  //   this.setState({ query: e.currentTarget.value });
  // };

  handleSubmit = e => {
    e.preventDefault();
    const { value } = e.currentTarget.elements.query;
    if (value.trim() === '') {
      toast.error('Enter something to find.');
      return;
    }
    // console.log(e.currentTarget.elements.query.value);
    this.props.onSubmit(value);
    e.currentTarget.elements.query.value = '';
    // this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.SearchBar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <Search width="25" />
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            name="query"
            // value={this.state.query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            // onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
