import React, { FC, useRef, useCallback } from 'react';
import { AppWindow } from '../../components/OS/components/AppWindow';
import styled, { css } from 'styled-components';
import theme from '../../theme';
import Webcam from 'react-webcam';
import { FlexCenter } from '../../styles';
import { useState } from 'react';
import * as Icons from '../../assets/icons';
import { usePhotosCxt } from '../../store/photos-context';

const Main = styled.div`
  ${FlexCenter}
  background-color: ${theme.colors.black};
  height: 100%;
  width: 100%;
  @media (max-width: 375px) {
    height: 100vh;
    overflow: hidden;
  }
`;

const TakePhotoButton = styled.button`
  ${FlexCenter}
  position: absolute;
  bottom: 0rem;
  height: 3rem;
  width: 3rem;
  background-color: transparent;
  border: 2px solid ${theme.colors.redish};
  border-radius: 1.5rem;
  padding: 0;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 375px) {
    bottom: 1rem;
  }
`;

const RedCircle = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 1.25rem;
  background-color: ${theme.colors.redish};
`;

const ScreenshotWrapper = styled.div`
  position: absolute;
  height: 8rem;
  box-shadow: ${theme.shadows.card};
  right: 0.5rem;
  bottom: 0.5rem;
`;

const ButtonsBox = styled.div`
  position: absolute;
  display: flex;
  bottom: 0.3rem;
  right: 0.3rem;
`;

const Screenshot = styled.img`
  max-height: 100%;
  min-height: 100%;
`;

const Button = css`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 0.75rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const SaveButton = styled.div`
  ${FlexCenter}
  ${Button}
  background-color: ${theme.colors.lightYellowish};
`;

const DeleteButton = styled.div`
  ${FlexCenter}
  ${Button}
  background-color: ${theme.colors.redish};
  margin-left: 0.3rem;
`;

export const Camera: FC = () => {
  const [photo, setPhoto] = useState('');
  const [buttonsIsOpen, setButtonsIsOpen] = useState(false);
  const { photos, setPhotos } = usePhotosCxt();

  const webcamRef = useRef(null);

  const takePhoto = useCallback(() => {
    setPhoto(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  const saveImage = () => {
    if (photo) {
      const allPhotos = [...photos];
      allPhotos.unshift({
        url: photo,
        thumbnailUrl: photo,
      });
      setPhotos(allPhotos);
    }
  };

  return (
    <AppWindow
      name="Camera"
      color={theme.colors.yellowish}
      height="30rem"
      width="40rem"
    >
      <Main>
        <Webcam height={480} width={640} mirrored={true} ref={webcamRef} />
        <TakePhotoButton onClick={takePhoto}>
          <RedCircle />
        </TakePhotoButton>
        {photo && (
          <ScreenshotWrapper>
            <Screenshot
              src={photo}
              alt="screenshot"
              onTouchStart={() => setButtonsIsOpen(true)}
              onMouseEnter={() => setButtonsIsOpen(true)}
              onMouseLeave={() => setButtonsIsOpen(false)}
            />
            {buttonsIsOpen && (
              <ButtonsBox
                onMouseEnter={() => setButtonsIsOpen(true)}
                onMouseLeave={() => setButtonsIsOpen(false)}
              >
                <SaveButton
                  onClick={() => {
                    saveImage();
                    setPhoto('');
                  }}
                >
                  <Icons.Save height="14px" />
                </SaveButton>
                <DeleteButton onClick={() => setPhoto('')}>
                  <Icons.Trash />
                </DeleteButton>
              </ButtonsBox>
            )}
          </ScreenshotWrapper>
        )}
      </Main>
    </AppWindow>
  );
};
