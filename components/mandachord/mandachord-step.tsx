import { Component } from 'react';
import { Line, Text } from 'react-konva';
import MandachordNote from './mandachord-note';

export default class MandachordStep extends Component {

  constructor(props) {
    super(props);
  }

  drawStep() {
    const pos = this.props.pos;
    const scale = this.props.scale;
    const notesPerStep = 13;

    const posArr = [...Array(notesPerStep).keys()]
    const notes = posArr.map(i =>
      <MandachordNote scale={scale} key={(pos * i) + i} pos={i} />
    )

    const linePoints = [1.75, 75, 3.25, (450 / scale)];
    const lineColor = '#E4F1FE';
    const lineWidth = 1;
    const barLine = (
      <>
        <Line stroke={lineColor} strokeWidth={lineWidth} points={linePoints} width={lineWidth} />
        <Text text={`${(pos / 16) + 1}`} y={475 / scale} x={5} rotation={180} fill={lineColor} />
      </>
    );

    return (
      <>
        { notes }
        { pos % 16 === 0 ? barLine : null }
      </>
    );
  }

  render() {
    return this.drawStep();
  }

}