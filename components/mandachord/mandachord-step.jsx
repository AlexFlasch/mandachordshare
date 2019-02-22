import { Component } from 'react';
import { connect } from 'react-redux';
import { Line, Text, Group } from 'react-konva';
import palette from '../../styles/palette';

import MandachordNote from './mandachord-note';

const MandachordStep = props => {
  const DEBUG_STEP_POS = false;

  const notesPerStep = 13;

  const drawStep = () => {
    const pos = props.pos;

    const posArr = [...Array(notesPerStep).keys()];
    const notes = posArr.map(i => (
      <MandachordNote key={pos * i + i} stepPos={pos} notePos={i} />
    ));

    const stepMarker = (
      <Text text={pos.toString()} y={450} x={6} rotation={180} fill="#000" />
    );

    const linePoints = [1.25, 122.5, 2.5, 425];
    const lineColor = '#E4F1FE';
    const lineWidth = 0.5;
    const isLoopPoint = pos === 0;
    const isBarMarker = pos % 8 === 0 && pos % 16 === 0;
    const loopDashPattern = isLoopPoint ? [3, 1] : [];
    const barLine = (
      <>
        <Line
          stroke={lineColor}
          strokeWidth={lineWidth}
          dash={loopDashPattern}
          points={linePoints}
          width={lineWidth}
          opacity={isBarMarker ? 1 : 0.45}
        />
        {isBarMarker ? (
          <>
            {/* text outline, using only stroke produces a very aliased looking text at smaller sizes like this */}
            <Text
              text={`${pos / 16 + 1}`}
              y={437.5}
              x={6}
              rotation={180}
              fill={palette.lotusTheme.bg}
              stroke={palette.lotusTheme.bg}
              strokeWidth={2}
            />
            {/* the actual white part of the text */}
            <Text
              text={`${pos / 16 + 1}`}
              y={437.5}
              x={6}
              rotation={180}
              fill={lineColor}
            />
          </>
        ) : null}
      </>
    );

    return (
      <>
        <Group rotation="90">{notes}</Group>
        {DEBUG_STEP_POS ? stepMarker : null}
        {pos % 8 === 0 ? barLine : null}
      </>
    );
  };

  return drawStep();
};

export default connect()(MandachordStep);
