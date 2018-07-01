import { Component } from 'react';
import { Line } from 'react-konva';
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

    const linePoints = [1.5, 75, 25, (6000 / scale)];
    const lineColor = '#E4F1FE';
    const lineWidth = 2.5;
    const barLine = (
      <Line stroke={lineColor} strokeWidth={lineWidth} points={linePoints} width={lineWidth} />
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