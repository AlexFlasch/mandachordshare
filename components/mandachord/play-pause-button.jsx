import { connect } from 'react-redux';
import { RegularPolygon, Rect, Group } from 'react-konva';

import { playPauseMandachord } from '../../state/actions/mandachord';
import palette from '../../styles/palette';

const PlayPauseButton = ({ isPaused, togglePause }) => {
  const color = palette.lotusTheme.accent;
  const clickShape = {
    w: 60,
    h: 60
  };

  const getPlayButton = () => {
    return <RegularPolygon sides={3} fill={color} rotation={90} radius={30} />;
  };

  const getPauseButton = () => {
    const w = 10;
    const h = 30;
    const padding = 20;
    return (
      <Group x={-w / 2} y={-h / 2}>
        <Rect width={w} height={h} fill={color} />
        <Rect width={w} height={h} fill={color} x={padding} />
      </Group>
    );
  };

  return (
    <Group>
      {isPaused ? getPlayButton() : getPauseButton()}
      <Rect
        onClick={togglePause}
        width={clickShape.w}
        height={clickShape.h}
        x={-clickShape.w / 2}
        y={-clickShape.h / 2}
      />
    </Group>
  );
};

const mapStateToProps = state => {
  const isPaused = state.mandachord.isPaused;
  return { isPaused };
};

const mapDispatchToProps = { togglePause: playPauseMandachord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPauseButton);
