import { Component } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import css from './image-gallery-item.module.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31493701-066eddf0638dc5b7781a5a354';

class ImageGalleryItem extends Component {
  state = {
    loading: false,
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query === this.props.query) {
      console.log('prevProps.query :', prevProps.query);
      console.log('this.props.query :', this.props.query);
    }

    if (
      prevProps.query !== this.props.query ||
      prevProps.page !== this.props.page
    ) {
      try {
        this.setState({ loading: true });
        const response = await axios.get(
          `${BASE_URL}?key=${API_KEY}&q=${this.props.query}&image_type=photo&orientation=horizontal&per_page=12&page=${this.props.page}`
        );

        this.props.onSearch(response.data.hits);
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    return (
      <>
        {this.state.loading && <Oval />}
        {this.props.items.map(item => (
          <li className={css.ImageGalleryItem} key={item.id}>
            <img
              src={item.webformatURL}
              alt={item.tags}
              className={css.ImageGalleryItemImage}
            />
          </li>
        ))}
      </>
    );
  }
}

export default ImageGalleryItem;
