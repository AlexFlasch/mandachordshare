import { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Stage, Layer, Group, Circle } from 'react-konva';

import MandachordStep from './mandachord-step';
import PlayPauseButton from './play-pause-button';
import palette from '../../palette';

// styles
const StageContainer = styled.div`
  width: 75vw;
  height: 50vh;
`;

class Mandachord extends Component {

  virtualW = 500;
  virtualH = 400;
  numSteps = 64;
  dash1 = this.generateRandomDash(1, 25, 15);
  dash2 = this.generateRandomDash(3, 50, 20);
  circleAnimStarted = false;

  constructor(props) {
    super(props);

    this.state = {
      stageWidth: 0,
      stageHeight: 0,
      stageScale: 0,
      stageRot: 0,
      isDragging: false
    };
    this.resizeMandachord = this.resizeMandachord.bind(this);
    this.startDragging = this.startDragging.bind(this);
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

  startDragging({ evt }) {
    // already dragging. dunno how this happened, but ignore it.
    if (this.state.isDragging) return;

    let lastX = evt.screenX;

    this.setState({ isDragging: true });

    const moveListener = (e) => {
      const speed = 0.1;

      let rot = speed * (e.screenX - lastX);
      // rotate the mandachord
      this.setState((prevState) => ({
        stageRot: prevState.stageRot + rot
      }));

      lastX = e.screenX;
    }

    const mouseUpListener = () => {
      this.setState({ isDragging: false });

      // remove the listener after we've stopped dragging
      window.removeEventListener('mouseup', mouseUpListener);
      window.removeEventListener('mousemove', moveListener);
    }

    // listen across the whole window for mouseup so we can stop panning
    window.addEventListener('mouseup', mouseUpListener);
    // listen for mousemove while dragging so we can rotate
    window.addEventListener('mousemove', moveListener);
  }

  renderSteps() {
    const s = this.state.stageScale;

    const posArr = [...Array(this.numSteps).keys()]
    const steps = posArr.map(i =>
      <Group
        key={i}
        rotation={i * (360 / this.numSteps)}
      >
        <MandachordStep pos={i} />
      </Group>
    );

    return steps;
  }

  generateRandomDash(min, max, length) {
    return Array.from({length: length}, () => Math.floor(min + Math.random() * (max - min)));
  }

  renderPanCircle() {
    const radius = 110;
    const fillColor = '#34495E';

    return (
      <Group onMouseDown={this.startDragging}>
        <Circle
          radius={radius}
          fill={fillColor}
        />
        <Circle
          radius={radius - 5}
          stroke={palette.lotusTheme.accent}
          dash={this.dash1}
        />
        <Circle
          radius={radius - 30}
          stroke={palette.lotusTheme.accent}
          dash={this.dash2}
        />
      </Group>
    );
  }

  renderMandachord() {
    const w = this.state.stageWidth;
    const h = this.state.stageHeight;
    const s = this.state.stageScale;
    const r = this.state.stageRot;

    const steps = this.renderSteps();
    const panCircle = this.renderPanCircle();

    return (
      <StageContainer>
        <Stage
          width={w}
          height={h}
          scaleX={s}
          scaleY={s}>
          <Layer
            x={10}
            y={30}
          >
            <PlayPauseButton />
          </Layer>
          <Layer
            x={(w / 2) / s}
            y={(h + 50) / s}
            rotation={r + 135}
          >
            {steps}
          </Layer>
          <Layer
            x={(w / 2) / s}
            y={(h + 50) / s}
            rotation={r}
          >
            {panCircle}
          </Layer>
        </Stage>
      </StageContainer>
    );
  }

  render() {
    return this.renderMandachord();
  }
}

const mapStateToProps = (state) => {
  return {
    steps: state.steps
  };
}

export default connect(mapStateToProps)(Mandachord);