import Select from 'react-select';
import styled from 'styled-components';

import palette from '../../palette';
import { transition } from '../../styles/constants';

const DropdownBox = styled(Select)`
  & > div:first-of-type {
    background: none;
    border: none;
    border-bottom: 3px solid ${palette.lotusTheme.accent};
    border-radius: 0;
    box-sizing: border-box;
    box-shadow: none;
    color: ${palette.lotusTheme.primary};
    cursor: pointer;
    font-family: 'Teko', sans-serif;
    font-size: 1.5em;
    height: 35px;
    padding: 5px;
    position: relative;
    ${transition};

    &:hover {
      border-color: ${palette.lotusTheme.primary};
      ${transition};
    }

    /* separator */
    & > div:nth-of-type(2) > span {
      background-color: transparent;
    }
  }

  /* dropdown list */
  & > div:nth-of-type(2) {
    margin: 0;
    background-color: ${palette.lotusTheme.bg};
    border-radius: 0;
    border: 1px solid ${palette.lotusTheme.primary};
    font-family: 'Teko', sans-serif;

    & > * {
      padding: 5px 0;
      color: ${palette.lotusTheme.primary};
      font-size: 1.1em;

      & > *:hover,
      & > *:focus {
        background-color: ${palette.lotusTheme.primary};
        color: ${palette.lotusTheme.bg};
      }
    }
  }

  svg {
    fill: ${palette.lotusTheme.accent};
  }
`;

const DropdownList = styled.div`
  background-color: ${palette.lotusTheme.bg};
  border: 1px solid ${palette.lotusTheme.primary};
  display: ${props => {
    console.log(`dropdown list visibility: ${props.isVisible} `);
    props.isVisible ? 'flex' : 'none';
  }};
  flex-direction: column;
  left: 0;
  position: absolute;
  top: calc(100% + 5px);
  width: 100%;
  z-index: 1;
`;

// passing these noops makes them behave with styled components... ¯\_(ツ)_/¯
const reactSelectStyles = {
  option: () => {},
  singleValue: () => {}
};

export default ({ onChange, items, value, placeholder }) => {
  return (
    <DropdownBox
      onChange={onChange}
      options={items}
      value={value}
      placeholder={placeholder}
      styles={reactSelectStyles}
    />
  );
};
