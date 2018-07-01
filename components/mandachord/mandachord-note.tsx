import { Component } from 'react';
import { Arc, Text } from 'react-konva';

export default class MandachordNote extends Component {

  constructor(props) {
    super(props);
  }

  drawNote() {
    const pos = this.props.pos;
    const scale = this.props.scale;
    // 270deg (start at top) (360 degrees / (16 notes per bar * 4 bars)) * step offset
    const angle = 7.5;
    // make size 40 so there's space
    const innerRadius = 50 + (pos * 25) / scale;
    const outerRadius = innerRadius + 25 / scale;
    
    let strokeColor;
    let fillColor;

    // note is in metronome section
    if (pos < 5) {
      strokeColor = '#F62459';
      fillColor = 'rgba(246, 36, 89, 0.4)';
    }
    // note is in mallet section
    else if (pos > 9) {
      strokeColor = '#67809F';
      fillColor = 'rgba(103, 128, 159, 0.4)';
    }
    // note is in resonator section
    else {
      strokeColor = '#1F3A93';
      fillColor = 'rgba(31, 58, 147, 0.4)';
    }

    return (
      <Arc
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={1}
        offsetX={-25 - (pos * 2)}
        angle={angle}
      />
    );
  }

  render() {
    return this.drawNote();
  }
}