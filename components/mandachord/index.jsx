import { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { Stage, Layer, Group, Circle, Line } from 'react-konva';
import ReactAnimationFrame from 'react-animation-frame';

import MandachordStep from './mandachord-step';
import PlayPauseButton from './play-pause-button';
import Dropdown from '../form-elements/dropdown.jsx';
import palette from '../../palette';

// styles
const MandachordContainer = styled.div`
  display: flex;
  height: 50vh;;
  width: 100%;
`;

const CanvasContainer = styled.div`
  height: 100%;
  width: 80%;
`;

const InstrumentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 20%;
  padding: 5px;
`;

const InstrumentSelection = styled.div`
  padding: 10px 0;
`;

const InstrumentLabel = styled.span`
  color: ${palette.lotusTheme.secondary};
  font-family: 'Teko', sans-serif;
  font-size: 1.65em;
  margin-top: 15px;
  text-transform: uppercase;
`;

const InstrumentDropdown = styled(Dropdown)`
  width: 100%;
`;

class Mandachord extends Component {

  virtualW = 500;
  virtualH = 400;
  numSteps = 64;
  dash1 = this.generateRandomDash(1, 25, 15);
  dash2 = this.generateRandomDash(3, 50, 20);
  circleAnimStarted = false;
  canvasContainer = createRef();
  instruments = [
    { name: 'Adau', value: 1 },
    { name: 'Alpha', value: 2 },
    { name: 'Beta', value: 3 },
    { name: 'Delta', value: 4 },
    { name: 'Druk', value: 5 },
    { name: 'Epsilon', value: 6 },
    { name: 'Gamma', value: 7 },
    { name: 'Horus', value: 8 },
    { name: 'Plokk', value: 9 }
  ];

  constructor(props) {
    super(props);

    this.state = {
      stageWidth: 0,
      stageHeight: 0,
      stageScale: 0,
      stageRot: 0,
      currentNoteRot: 0,
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
    let w = this.canvasContainer.current.clientWidth;
    let h = this.canvasContainer.current.clientHeight;

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

  onAnimationFrame(timestamp, lastTimestamp) {
    if (this.props.isPaused) {
      return;
    }

    const delta = timestamp - lastTimestamp;

    const rot = -1 * (delta / 100) * 4.5;
    
    this.setState(prevState => ({
      stageRot: prevState.stageRot + rot,
      currentNoteRot: prevState.currentNoteRot + rot
    }));
  }

  startDragging({ evt }) {
    if (this.state.isDragging || !this.props.isPaused) return;

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

  renderCurrentNoteMark() {
    const lineColor = '#fff';
    const lineWidth = 1;
    const linePoints = [1.25, 122.5, 2.5, 435]

    return (
      <Group
        rotation={-1 * this.state.currentNoteRot}
      >
        <Line
          stroke={lineColor}
          strokeWidth={lineWidth}
          points={linePoints}
        >
        </Line>
        <Circle
          x={2.5}
          y={432.5}
          radius={5}
          fill={lineColor}
        >
        </Circle>
      </Group>
    );
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
          {this.renderCurrentNoteMark()}
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
    );
  }

  render() {
    return (
      <MandachordContainer>
        <CanvasContainer innerRef={this.canvasContainer}>
          { this.renderMandachord() }
        </CanvasContainer>
        <InstrumentContainer>
          <InstrumentSelection>
            <InstrumentLabel>
              Percussion
            </InstrumentLabel>
            <InstrumentDropdown
              placeholder={'Select an instrument'}
              items={this.instruments}
            />
          </InstrumentSelection>
          <InstrumentSelection>
            <InstrumentLabel>
              Bass
            </InstrumentLabel>
            <InstrumentDropdown
              placeholder={'Select an instrument'}
              items={this.instruments}
            />
          </InstrumentSelection>
          <InstrumentSelection>
            <InstrumentLabel>
              Melody
            </InstrumentLabel>
            <InstrumentDropdown
              placeholder={'Select an instrument'}
              items={this.instruments}
            />
          </InstrumentSelection>
        </InstrumentContainer>
      </MandachordContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isPaused: state.mandachord.isPaused,
  };
}

export default connect(mapStateToProps)(ReactAnimationFrame(Mandachord, 1));