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
  height: 20px;
  position: relative;
  width: ${(props) => { console.log(props); return props.width }};

  &::before {
    background-image: radial-gradient(ellipse at bottom,
      ${props => transparentize(0.7, props.palette.secondary)} 0%,
      transparent 75%);
    background-position-y: 5px;
    background-repeat-y: no-repeat;
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
  border-bottom: 3px solid ${props => props.palette.accent};
  color: ${props => props.palette.bg};
  height: 90%;
  position: relative;
  ${transition};
  width: 100%;

  &:focus,
  &:active {
    outline: 0;
    border-bottom: 3px solid ${props => props.palette.secondary};
    ${transition};
  }
`;

export default class TextInput extends Component {
  
  constructor(props) {
    super(props);

    const defaultProps = {
      width: '250px'
    };
    props = { ...props, ...defaultProps };

    console.log('props:');
    console.log(props);
    this.props = props;
    this.didMount = false; // this is probably a dirty hack

    this.theme = palette.lotusTheme;
    this.primary = this.theme.primary;
    this.secondary = this.theme.secondary;
    this.bg = this.theme.bg;
    this.accent = this.theme.accent;
  }

  componentDidMount() {
    this.setState({ isFocused: false });
    this.didMount = true;
  }

  setFocus = (val) => {
    if (this.didMount)
      this.setState({ isFocused: val });
  }

  isFocused = () => {
    if (this.didMount)
      return this.state.isFocused;
  }
  
  render() {
    // console.log('this.props:');
    // console.log(this.props);
    return (
      <InputContainer
        palette={this.theme}
        width={this.props.width}
        className={this.isFocused() ? 'focused' : ''}
      >
        <Input
          palette={this.theme}
          onFocus={() => { this.setFocus(true) }}
          onBlur={() => { this.setFocus(false) }}
        />
      </InputContainer>
    );
  }
}