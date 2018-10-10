import { Component } from 'react';
import { connect } from 'react-redux';
import { RegularPolygon, Rect, Group } from 'react-konva';

import store from '../../state/store';
import { playPauseMandachord } from '../../state/actions/mandachord';
import palette from '../../palette';


const mapStateToProps = (state) => {
  return {
    isPaused: getIsPaused(state)
  };
};

class PlayPauseButton extends Component {

  color = palette.lotusTheme.accent;
  clickShape = {
    w: 60,
    h: 60
  };

  constructor(props) {
    super(props);

    this.togglePause = this.togglePause.bind(this);
    this.getButton = this.getButton.bind(this);

    this.buttonIcon = this.getButton(isPaused());
  }
  
  togglePause() {
    store.dispatch(playPauseMandachord(!store.getState().mandachord.isPaused));
  }

  getPlayButton() {
    return (
      <RegularPolygon
        sides={3}
        fill={this.color}
        rotation={90}
        radius={30}
      />
    );
  }

  getPauseButton() {
    const w = 10;
    const h = 30;
    const padding = 20
    return (
      <Group
        x={-w / 2}
        y={-h / 2}
      >
        <Rect width={w} height={h} fill={this.color} />
        <Rect width={w} height={h} fill={this.color} x={padding} />
      </Group>
    );
  }

  getButton(isPaused) {
    return isPaused
      ? this.getPlayButton()
      : this.getPauseButton();
  }

  render() {
    return (
      <Group>
        {this.buttonIcon}
        <Rect
          onClick={this.togglePause}
          width={this.clickShape.w}
          height={this.clickShape.h}
          x={-this.clickShape.w / 2}
          y={-this.clickShape.h / 2}
        >
        </Rect>
      </Group>
    )
  }
        
}

export default connect()(PlayPauseButton);