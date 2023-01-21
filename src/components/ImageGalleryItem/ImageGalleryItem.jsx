import { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import css from './image-gallery-item.module.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31493701-066eddf0638dc5b7781a5a354';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    largeImg: '',
    largeImgAlt: '',
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.query !== this.props.query ||
      prevProps.page !== this.props.page
    ) {
      try {
        this.props.changeLoadingStatus(true);
        const response = await axios.get(
          `${BASE_URL}?key=${API_KEY}&q=${this.props.query}&image_type=photo&orientation=horizontal&per_page=12&page=${this.props.page}`
        );
        this.props.onSearch(response.data.hits, response.data.totalHits);
      } catch (error) {
        console.log(error);
      } finally {
        this.props.changeLoadingStatus(false);
      }
    }
  }

  showModal = e => {
    this.setState({
      showModal: true,
      largeImg: e.currentTarget.dataset.url,
      largeImgAlt: e.currentTarget.alt,
    });
  };

  closeModal = e => {
    this.setState({ showModal: false, largeImg: '', largeImgAlt: '' });
  };

  render() {
    return (
      <>
        {this.props.items.map(item => (
          <li className={css.ImageGalleryItem} key={item.id}>
            <img
              name="img"
              data-url={item.largeImageURL}
              src={item.webformatURL}
              alt={item.tags}
              className={css.ImageGalleryItemImage}
              onClick={this.showModal}
            />
          </li>
        ))}
        {this.state.showModal && (
          <Modal
            url={this.state.largeImg}
            closeModal={this.closeModal}
            alt={this.state.largeImgAlt}
          />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  items: PropTypes.array,
  onSearch: PropTypes.func.isRequired,
  changeLoadingStatus: PropTypes.func.isRequired,
  loadingStatus: PropTypes.bool,
};
