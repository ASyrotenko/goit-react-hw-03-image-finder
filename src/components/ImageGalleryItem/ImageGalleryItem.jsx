import { Component } from 'react';
import axios from 'axios';
import css from './image-gallery-item.module.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31493701-066eddf0638dc5b7781a5a354';

class ImageGalleryItem extends Component {
  state = {
    images: [],
    totalHits: 0,
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    console.log('prevProps.searchImg :', prevProps.searchImg);
    console.log('this.props.searchImg :', this.props.searchImg);

    console.log('prevState.images :', prevState.images);
    console.log('this.props.images :', this.state.images);

    if (
      prevProps.searchImg !== this.props.searchImg ||
      prevProps.page !== this.props.page
    ) {
      try {
        const response = await axios.get(
          `${BASE_URL}?key=${API_KEY}&q=${this.props.searchImg}&image_type=photo&orientation=horizontal&per_page=12&page=${this.props.page}`
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
        }));
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return (
      <>
        {this.state.images.map(img => (
          <li className={css.ImageGalleryItem} key={img.id}>
            <img
              src={img.webformatURL}
              alt={img.tags}
              className={css.ImageGalleryItemImage}
            />
          </li>
        ))}
      </>
    );
  }
}

export default ImageGalleryItem;
