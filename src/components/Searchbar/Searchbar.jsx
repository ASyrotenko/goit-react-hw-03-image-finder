import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './searchbar.module.css';
import { ReactComponent as Search } from '../icons/search.svg';

class Searchbar extends Component {
  state = {
    img: '',
  };

  handleChange = e => {
    this.setState({ img: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.img.trim() === '') {
      toast.error('Enter something to find.');
      return;
    }
    this.props.onSubmit(this.state.img);
    this.setState({ img: '' });
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
            name="img"
            value={this.state.img}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
