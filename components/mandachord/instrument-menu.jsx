import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import palette from '../../styles/palette';

import Dropdown from '../form-elements/dropdown.jsx';

// import actions
import { changeInstrument } from '../../state/actions/mandachord';

// import constants
import { BASS, MELODY, PERCUSSION } from './constants';

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

const InstrumentMenu = props => {
  // move this out to a constants file eventually
  const instrumentPacks = [
    { label: 'Adau', value: 'ADAU' },
    { label: 'Alpha', value: 'ALPHA' },
    { label: 'Beta', value: 'BETA' },
    { label: 'Delta', value: 'DELTA' },
    { label: 'Druk', value: 'DRUK' },
    { label: 'Epsilon', value: 'EPSILON' },
    { label: 'Gamma', value: 'GAMMA' },
    { label: 'Horos', value: 'HOROS' },
    { label: 'Plokk', value: 'PLOKK' }
  ];

  // TODO: the action/reducer case isn't working properly for this
  // this should be top priority so we can properly send instruments
  // to the audio scheduler via sagas.
  const handleInstrumentChange = role => instrument => {
    props.changeInstrument({
      instrumentType: role,
      instrument: instrument.value
    });
  };

  console.log('instruments: ', props.instruments);

  return (
    <InstrumentContainer>
      <InstrumentSelection>
        <InstrumentLabel>Percussion</InstrumentLabel>
        <InstrumentDropdown
          onChange={handleInstrumentChange(PERCUSSION)}
          value={props.instruments[PERCUSSION]}
          items={instrumentPacks}
        />
      </InstrumentSelection>
      <InstrumentSelection>
        <InstrumentLabel>Bass</InstrumentLabel>
        <InstrumentDropdown
          onChange={handleInstrumentChange(BASS)}
          value={props.instruments[BASS]}
          items={instrumentPacks}
        />
      </InstrumentSelection>
      <InstrumentSelection>
        <InstrumentLabel>Melody</InstrumentLabel>
        <InstrumentDropdown
          onChange={handleInstrumentChange(MELODY)}
          value={props.instruments[MELODY]}
          placeholder={'Select an instrument'}
          items={instrumentPacks}
        />
      </InstrumentSelection>
    </InstrumentContainer>
  );
};

const mapStateToProps = state => ({
  instruments: state.mandachord.instruments
});

const mapDispatchToProps = {
  changeInstrument
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstrumentMenu);
