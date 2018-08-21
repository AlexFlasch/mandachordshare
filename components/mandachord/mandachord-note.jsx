import { Arc } from 'react-konva';
import { transparentize, lighten } from 'polished';

export default (props) => {

  const toggleNote = () => {
    props.onClick(props.pos);
  }

  const getNoteColor = () => {
    const pos = props.pos;
    let color;

    // note is in metronome section
    if (pos < 5) {
      color = '#F62459';
    }
    // note is in mallet section
    else if (pos > 9) {
      color = '#67809F';
    }
    // note is in resonator section
    else {
      color = '#4B77BE';
    }

    return color;
  }

  const drawNote = () => {
    const stepHeight = 275;
    const panCircleSize = 100;
    const notesPerStep = 13;

    const pos = props.pos;
    const scale = props.scale;
    // 270deg (start at top) (360 degrees / (16 notes per bar * 4 bars)) * step offset
    const angle = 360 / 64;
    // make size 40 so there's space
    const innerRadius = panCircleSize + (pos * (stepHeight / notesPerStep)) / scale;
    const outerRadius = innerRadius + (stepHeight / notesPerStep) / scale;

    const color = getNoteColor();
    const strokeColor = color;
    const fillColor = props.isActive
      ? lighten(0.05, color)
      : transparentize(0.6, color);

    return (
      <Arc
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={1}
        offsetX={-25 - (pos * 2)}
        angle={angle}
        onClick={toggleNote}
      />
    );
  }

  return drawNote();
}