import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';

class App extends Component {
  state = {
    query: '',
    page: 1,
    items: [],
  };

  handleFormSubmit = value => {
    this.setState({ query: value, page: 1, items: [] });
  };

  handleOnLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onSearch = response => {
    this.setState(prevState => ({ items: [...prevState.items, ...response] }));
  };

  render() {
    return (
      <>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <main>
          <ImageGallery
            query={this.state.query}
            page={this.state.page}
            onSearch={this.onSearch}
            items={this.state.items}
          />
          {this.state.items.length > 0 && (
            <Button onClick={this.handleOnLoadMoreClick} />
          )}
        </main>
      </>
    );
  }
}

export default App;
