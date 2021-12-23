import React, { FC, useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Bar, FlexCenter } from '../../../../styles';
import * as Icons from '../../../../assets/icons';
import { Logo } from '../../../../assets/logo/Logo';
import theme from '../../../../theme';
import { useAuth } from '../../../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const InfoBarBox = styled.div`
  ${Bar}
  top: 1rem;
  padding: 0.2rem 0.7rem;
  transition: ${theme.transitions.defaultTransition};
  @media (max-width: 375px) {
    position: relative;
    right: 0;
    left: 0;
    top: 4rem;
    margin: 1rem auto;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DateTime = css`
  font-weight: normal;
  margin: 0;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const DateText = styled.h5`
  ${DateTime}
`;

const TimeText = styled.h5`
  ${DateTime}
  @media (max-width: 375px) {
    font-size: 5rem;
    font-weight: 100;
  }
`;

const ClockIconWrapper = styled.div`
  ${FlexCenter}
  padding-right: 0.3rem;
  @media (max-width: 375px) {
    display: none;
  }
`;

const Settings = styled.div`
  padding-left: 2rem;
`;

const SettingsIconWrapper = styled.div`
  ${FlexCenter}
  cursor: pointer;
  height: 1.8rem;
  width: 1.8rem;
  border: 2px solid ${theme.colors.black};
  border-radius: 1rem;
  &:hover {
    opacity: 0.6;
  }
`;

const SettingsMenu = styled.div`
  ${FlexCenter}
  position: absolute;
  height: 2rem;
  width: 5rem;
  background-color: ${theme.colors.white};
  right: 0;
  bottom: -2rem;
  border-radius: 0.5rem;
  @media (max-width: 375px) {
    width: 4rem;
    bottom: 0.75rem;
  }
`;

const SettingsMenuItem = styled.h5`
  margin: 0;
  cursor: pointer;
`;

export const InfoBar: FC = () => {
  const [dateTime, setDateTime] = useState(null);
  const [settingsMenuIsOpen, setSettingsMenuIsOpen] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const dateTimeInterval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(dateTimeInterval);
  }, [dateTime]);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setSettingsMenuIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const logout = () => {
    setAuth(false);
    navigate('/', { replace: true });
  };

  return (
    <>
      <InfoBarBox style={{ right: dateTime ? '1rem' : '-10rem' }}>
        <Info>
          <DateText>
            {dateTime?.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </DateText>
          <TimeWrapper>
            <ClockIconWrapper>
              <Icons.Clock />
            </ClockIconWrapper>
            <TimeText>
              {dateTime?.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </TimeText>
          </TimeWrapper>
        </Info>
        <Settings>
          <SettingsIconWrapper
            onClick={() => setSettingsMenuIsOpen(!settingsMenuIsOpen)}
          >
            <Logo height={16} />
          </SettingsIconWrapper>
        </Settings>
        {settingsMenuIsOpen && (
          <SettingsMenu ref={menuRef}>
            <SettingsMenuItem onClick={logout}>Log Out</SettingsMenuItem>
          </SettingsMenu>
        )}
      </InfoBarBox>
    </>
  );
};
