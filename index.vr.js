import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  Image,
} from 'react-vr';
import _ from 'lodash';

const GRID_SIZE = 8;
const CELL_SIZE = 2;

export default class WizardChess extends React.Component {
  render() {
    return (
      <View style={{
        transform: [
          { rotateX: -90 }
        ]
      }}>
        {_.times( GRID_SIZE, i => (
          <View style={{ flexDirection: 'row' }}>
            {_.times( GRID_SIZE, j => (
              <View style={{
                backgroundColor: (( j + i ) % 2 ) ? '#FFF' : '#AAA',
                transform: [
                  { translate: [-( CELL_SIZE * GRID_SIZE / 2 ), GRID_SIZE * 2, 1] },
                ],
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}>
                <Text style={{
                  color: '#000',
                  fontSize: 0.2,
                }}
                >{String.fromCharCode( 65 + j ) + ( GRID_SIZE - i )}</Text>
                <Image
                  source={{ uri: '../static_assets/pieces/white_pawn.png' }}
                  style={{
                    margin: 0.5,
                    width: 1.2,
                    height: 1.2,
                    transform: [
                      { rotateX: 90 },
                      { translateZ: -0.2 },
                    ],
                  }}
                />

              </View>
            ))}
          </View>
        ))}
      </View>
    );
  }
};

AppRegistry.registerComponent('wizardchess', () => WizardChess);
