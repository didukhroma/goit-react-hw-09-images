import { useState, useEffect } from 'react';
import ImageGallery from '../ImageGallery';
import Searchbar from '../Searchbar';
import apiService from '../../utils/api/apiService';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import scrollTo from '../../utils/scroll/scroll.js';
import styles from './App.module.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalPic, setModalPic] = useState('');
  const [modalAltText, setModalAltText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getImages();
    if (images.length !== 0) {
      scrollTo();
    }
  }, [query]);

  const getImages = async () => {
    const dataImages = await apiService(query, currentPage);
    if (!dataImages) {
      setIsLoading(true);
      return;
    }
    setImages([...images, ...dataImages]);
    setCurrentPage(currentPage + 1);
    setIsLoading(false);
  };

  const submitHandler = text => {
    const isSpecificQuery =
      text.toLowerCase() === query.toLowerCase() && images.length !== 0;
    if (isSpecificQuery) {
      setError(
        'Please enter a more specific word or explore the button "Load more"',
      );
      alert(error);
      return;
    }
    setQuery(text);
    setImages([]);
    setCurrentPage(1);
    setError(null);
  };

  const toggleModal = (modalImg, tags) => {
    setShowModal(!showModal);
    setModalPic(modalImg);
    setModalAltText(tags);
  };

  const handleClickLoadMore = () => {
    setIsLoading(true);
    getImages();
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={submitHandler} isLoading={isLoading} />
      <ImageGallery images={images} toggleModal={toggleModal} />
      {showModal && (
        <Modal src={modalPic} alt={modalAltText} onClose={toggleModal} />
      )}
      {images.length !== 0 && (
        <Button title={'Load more'} handleClickLoadMore={handleClickLoadMore} />
      )}
    </div>
  );
};

export default App;
