import React from 'react'
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  Image,
} from 'react-vr';
import Chessboard from './chessboard.vr.js';


class Pieces extends Component{
    
    export default ({ style }) => (
      <View style={style}>
        <Model
          source={{ obj: asset('pieces/figures.obj')}}
          lit={true}
          style={{ transform: [{scale: [0.6, 1, 0.6]}] }}
        />
      </View>
);
}
