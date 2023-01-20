import { ThreeDots } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './image-gallery.module.css';

const ImageGallery = ({
  query,
  page,
  items,
  onSearch,
  changeLoadingStatus,
  loadingStatus,
}) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        <ImageGalleryItem
          query={query}
          page={page}
          items={items}
          onSearch={onSearch}
          changeLoadingStatus={changeLoadingStatus}
        />
      </ul>
      {loadingStatus && (
        <div className={css.loading}>
          <ThreeDots color="grey" />
        </div>
      )}
    </>
  );
};

export default ImageGallery;
