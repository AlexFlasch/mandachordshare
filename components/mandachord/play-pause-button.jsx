import { Component } from 'react';
import { RegularPolygon, Rect, Group } from 'react-konva';
import palette from '../../palette';

export default class PlayPauseButton extends Component {

  color = palette.lotusTheme.accent;
  clickShape = {
    w: 60,
    h: 60
  };

  constructor(props) {
    super(props);

    this.state = {
      isPaused: true
    };

    this.togglePause = this.togglePause.bind(this);
    this.getButton = this.getButton.bind(this);
  }
  
  togglePause() {
    this.setState((prevState) => {
      return {
        isPaused: !prevState.isPaused
      };
    });
  }

  renderPlayButton() {
    return (
      <RegularPolygon
        sides={3}
        fill={this.color}
        rotation={90}
        radius={30}
      />
    );
  }

  renderPauseButton() {
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
      
  getButton() {
    return this.state.isPaused
      ? this.renderPlayButton()
      : this.renderPauseButton();
  }

  render() {
    return (
      <Group>
        {this.getButton()}
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