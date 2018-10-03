import { Component } from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import palette from '../../palette';

const transition = `
  transition-property: all;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
`;

const InputContainer = styled.div`
  box-sizing: border-box;
  color: ${palette.lotusTheme.primary}
  font-family: 'Teko', sans-serif;
  font-size: 1.5em;
  height: 35px;
  position: relative;
  width: ${(props) => props.width};

  &::before {
    background-image: radial-gradient(ellipse at bottom,
      ${transparentize(0.7, palette.lotusTheme.secondary)} 0%,
      transparent 75%);
    background-position-y: 5px;
    background-repeat: no-repeat;
    content: '';
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    ${transition};
  }

  &.focused::before {
    opacity: 1;
  }
`;

const Input = styled.input`
  background: none;
  border: none;
  border-bottom: 3px solid ${palette.lotusTheme.accent};
  box-sizing: border-box;
  color: ${palette.lotusTheme.secondary};
  font-family: inherit;
  font-size: inherit;
  height: 35px;
  left: 0;
  padding: 0.25em 0;
  position: absolute;
  top: 0;
  ${transition};
  width: 100%;

  &:focus,
  &:active {
    outline: 0;
    border-bottom: 3px solid ${palette.lotusTheme.secondary};
    ${transition};
  }
`;

export const INITIAL_STATE = { isFocused: false, isMounted: false };

export default class TextInput extends Component {
  
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.setState({ isFocused: false, isMounted: true });
  }

  setFocus = (isFocused) => () => {
    this.setState({ isFocused });
  }

  updatePlaceholder = () => {
    if
  }

  render() {
    const { isFocused } = this.state;

    return (
      <InputContainer
        palette={this.theme}
        width={this.props.width}
        className={isFocused ? 'focused' : ''}
      >
        { this.props.placeholder }
        <Input
          palette={this.theme}
          onFocus={this.setFocus(true)}
          onBlur={this.setFocus(false)}
          onChange={this.props.onChange}
        />
      </InputContainer>
    );
  }
}

TextInput.defaultProps = {
  width: '250px',
  onChange = () => {},
};