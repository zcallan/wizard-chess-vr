import React, { Component } from 'react';
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

        {( !!piece ) && (
          <Text style={{
            color: '#000',
            fontSize: 0.4,
            position: 'absolute',
          }}>
            {piece.type}
          </Text>
        )}
      </View>
    )
  }

  renderPieces() {
    const { board } = this.state;

    return (
      <View style={{
        position: 'absolute',
        transform: [
          { rotateX: -90 },
          { translate: [BOARD_X, BOARD_Y, BOARD_Z] },
        ]
      }}>
        {board.map( row => (
          <View style={{ flexDirection: 'row' }}>
            {( row && row.length > 0 ) && row.map( piece => piece && (
              <View style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}>
                <Text style={{
                  fontSize: 0.5,
                  color: '#000',
                }}>{piece.type}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    )
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
          position: 'absolute',
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
        </View>

        {/*{this.renderPieces()}*/}
      </View>
    );
  }
}

export default Chessboard;
