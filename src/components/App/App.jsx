import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import css from './app.module.css';

class App extends Component {
  state = {
    query: '',
    page: 1,
    items: [],
    totalItems: 0,
    loadingStatus: false,
    noResult: false,
  };

  componentDidUpdate() {
    if (this.state.items.length > 12) {
      const { height: cardHeight } = document
        .querySelector('li')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  }

  handleFormSubmit = value => {
    this.setState({
      query: value,
      page: 1,
      items: [],
      noResult: false,
    });
  };

  handleOnLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onSearch = (response, totalItems) => {
    this.setState(prevState => ({
      items: [...prevState.items, ...response],
      totalItems,
    }));

    if (response.length === 0) {
      this.setState({ noResult: true });
    }
  };

  changeLoadingStatus = status => {
    this.setState({ loadingStatus: status });
  };

  render() {
    const { query, page, items, loadingStatus, totalItems, noResult } =
      this.state;
    return (
      <>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <main id="main">
          {noResult && (
            <p className={css.noFoundText}>
              Sorry. There is no images for <b>{query}</b>
            </p>
          )}
          <ImageGallery
            query={query}
            page={page}
            onSearch={this.onSearch}
            items={items}
            changeLoadingStatus={this.changeLoadingStatus}
            loadingStatus={loadingStatus}
          />
          {items.length > 0 && items.length < totalItems && (
            <Button onClick={this.handleOnLoadMoreClick} />
          )}
          {items.length > 0 && items.length >= totalItems && (
            <p className={css.endMessage}>
              Sorry. There is no more images for <b>{query}</b>
            </p>
          )}
        </main>
      </>
    );
  }
}

export default App;
