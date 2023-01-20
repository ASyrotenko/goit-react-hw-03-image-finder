import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';

class App extends Component {
  state = {
    search: '',
    page: 1,
  };
  handleFormSubmit = img => {
    this.setState({ search: img, page: 1 });
  };

  handleOnLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    return (
      <>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <main>
          <ImageGallery searchImg={this.state.search} page={this.state.page} />
          <Button onClick={this.handleOnLoadMoreClick} />
        </main>
      </>
    );
  }
}

export default App;
