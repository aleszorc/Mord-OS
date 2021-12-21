import { useEffect } from 'react';
import { useState, createContext, useContext } from 'react';
import { usePhotos } from '../services/data-services';

export const PhotosContext = createContext([] as any);

export const PhotosContextProvider = (props: any) => {
  const { data } = usePhotos();

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (data) {
      setPhotos(data.slice(0, 100));
    }
  }, [data]);

  return (
    <PhotosContext.Provider value={{ photos, setPhotos }}>
      {props.children}
    </PhotosContext.Provider>
  );
};

export const usePhotosCxt = () => useContext(PhotosContext);
