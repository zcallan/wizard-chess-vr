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
import Chessboard from './chessboard.vr.js';
import Speech from './speech.vr.js';


export default class WizardChess extends React.Component {
  render() {
    return (
      <View>
        <Pano source={{ uri: '../static_assets/pano.jpg' }} />
        <Chessboard />
      </View>
    );
  }
};

AppRegistry.registerComponent('wizardchess', () => WizardChess);
