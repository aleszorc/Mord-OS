import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { AppWindow } from '../../components/OS/components/AppWindow';
import theme from '../../theme';
import uuid from 'react-uuid';
import { Modal } from '../../styles';
import { usePhotosCxt } from '../../store/photos-context';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Main = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: scroll;
  background-color: ${theme.colors.black};
`;

const ThumbnailWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 150px;
  width: 150px;
  &:hover {
    opacity: 0.9;
  }
`;

const ThumbnailPhoto = styled.img`
  object-fit: cover;
  overflow: hidden;
`;

const FullPhotoModal = styled.div`
  ${Modal}
  background-color: ${theme.colors.blackish};
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const FullPhoto = styled.img`
  max-width: 80%;
  max-height: 80%;
`;

const PhotoTitle = styled.p`
  color: ${theme.colors.white};
`;

export const Photos: FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo>();
  const { photos } = usePhotosCxt();

  const selectPhoto = (id: any) => {
    const photo = photos.find((el: any) => el.id === id);
    setSelectedPhoto(photo);
  };

  return (
    <>
      {photos && (
        <AppWindow
          name="Photos"
          color={theme.colors.lightPinkish}
          width="37.5rem"
          height="37.5rem"
        >
          <Main>
            {photos.map((photo: any) => (
              <ThumbnailWrapper
                key={uuid()}
                onClick={() => {
                  setModalIsOpen(!modalIsOpen);
                  selectPhoto(photo.id);
                }}
              >
                <ThumbnailPhoto src={photo.thumbnailUrl} alt={photo.title} />
              </ThumbnailWrapper>
            ))}

            {modalIsOpen && (
              <FullPhotoModal onClick={() => setModalIsOpen(false)}>
                <>
                  <FullPhoto src={selectedPhoto.url} />
                  <PhotoTitle>{selectedPhoto.title}</PhotoTitle>
                </>
              </FullPhotoModal>
            )}
          </Main>
        </AppWindow>
      )}
    </>
  );
};
