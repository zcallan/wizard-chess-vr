import React, { Component } from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  Image,
  Animated,
} from 'react-vr';
import _ from 'lodash';
import initialPieces from './initialPieces.js';


const GRID_SIZE = 8;
const CELL_SIZE = 2;
const METRES_FROM_GRID = 1;
const BOARD_X = -( CELL_SIZE * GRID_SIZE / 2 );
const BOARD_Y = GRID_SIZE + METRES_FROM_GRID;
const BOARD_Z = 0;


class Chessboard extends Component {
  state = {
    pieces: initialPieces,
    turn: 'white',
  }

  componentDidMount() {
    setTimeout(() => this.movePiece( 'E2', 'E4' ), 2000 );
  }

  movePiece( from, to ) {
    console.log( from, to, this.state.pieces );

    const piece = this.state.pieces.find( p => p.position === from );
    piece.position = to;
    console.log( piece );

    this.setState( state => ({
      ...state.pieces.filter( p => p.position === from ),
      piece,
    }));
  }

  renderCell( i, j ) {
    const cellName = String.fromCharCode( 65 + j ).toUpperCase() + ( GRID_SIZE - i );
    const piece = this.state.pieces.find( p => p.position === cellName );

    return (
      <View style={{
        backgroundColor: (( j + i ) % 2 ) ? '#FFF' : '#AAA',
        width: CELL_SIZE,
        height: CELL_SIZE,
        position: 'relative',
      }}>
        <Text style={{
          color: '#000',
          fontSize: 0.2,
          position: 'absolute',
        }}>
          {cellName}
        </Text>
      </View>
    )
  }

  renderPieces() {
    const { pieces } = this.state;

    return ( pieces && pieces.length > 0 ) && pieces.map( piece => {
      const { position } = piece;
      const column = position.charCodeAt( 0 ) - 65;
      const row = GRID_SIZE - parseInt( position.charAt( 1 ), 10 );

      return (
        <View style={{
          position: 'absolute',
          top: row * CELL_SIZE,
          left: column * CELL_SIZE,
          width: CELL_SIZE,
          height: CELL_SIZE,
        }}>
          <Text style={{
            fontSize: 0.4,
            color: '#000',
          }}>{piece.type}</Text>
        </View>
      );
    });
  }

  render() {
    const { turn } = this.state;

    return (
      <View>
        <Text style={{
          transform: [
            { translate: [-4, 0, -BOARD_Y] },
          ],
          fontSize: 2,
        }}>{( turn === 'white' ) ? 'Your turn!' : 'Please wait for your turn.'}</Text>

        <View style={{
          transform: [
            { rotateX: -90 },
            { translate: [BOARD_X, BOARD_Y, BOARD_Z] },
          ]
        }}>
          {_.times( GRID_SIZE, i => (
            <View style={{ flexDirection: 'row' }}>
              {_.times( GRID_SIZE, j => this.renderCell( i, j ))}
            </View>
          ))}

          <View style={{ position: 'absolute' }}>
            {this.renderPieces()}
          </View>
        </View>
      </View>
    );
  }
}

export default Chessboard;
