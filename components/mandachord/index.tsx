import { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Stage, Layer } from 'react-konva';
import MandachordStep from './mandachord-step';

// styles
const StageContainer = styled.div`
  width: 75vw;
  height: 50vh;
`;

export default class Mandachord extends Component {

  virtualW = 500;
  virtualH = 333.33;

  constructor(props) {
    super(props);

    this.state = { stageWidth: 0, stageHeight: 0 };
    this.resizeMandachord = this.resizeMandachord.bind(this);
  }

  componentDidMount() {
    this.resizeMandachord();

    window.addEventListener('resize', this.resizeMandachord);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeMandachord);
  }

  resizeMandachord() {
    let stageContainer = ReactDOM.findDOMNode(this);
    let w = stageContainer.clientWidth;
    let h = stageContainer.clientHeight;

    let s = Math.min(
      w / this.virtualW,
      h / this.virtualH
    );

    this.setState({
      stageWidth: w,
      stageHeight: h,
      stageScale: s
    });
  }

  renderSteps() {
    let w = this.state.stageWidth;
    let h = this.state.stageHeight;
    const s = this.state.stageScale;
    const numSteps = 48;

    const posArr = [...Array(numSteps).keys()]
    const steps = posArr.map(i =>
      <Layer
        x={(w / 2) / s}
        y={h / s}
        rotation={i * 7.5}
      >
        <MandachordStep scale={s} key={i} pos={i} />
      </Layer>
    );

    return steps;
  }

  renderMandachord() {
    let w = this.state.stageWidth;
    let h = this.state.stageHeight;
    let s = this.state.stageScale;

    const steps = this.renderSteps();

    return (
      <StageContainer>
        <Stage
          width={w}
          height={h}
          scaleX={s}
          scaleY={s}>
            { steps }
        </Stage>
      </StageContainer>
    );
  }

  render() {
    return this.renderMandachord();
  }
}
