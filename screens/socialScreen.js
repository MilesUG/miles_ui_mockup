/* eslint-disable react-native/no-inline-styles */
import {Button} from 'react-native-ui-kitten';
import {SvgUri} from 'react-native-svg';
import {withNavigation} from 'react-navigation';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {fill} from '../constants/Icons';

class SociaLoginScreen extends Component {
  google = () => {
    return <SvgUri style={{fill: '#fff', marginLeft: -14}} uri={fill.google} />;
  };

  backward = () => {
    return (
      <SvgUri
        style={{fill: '#9c9da1', width: 32, height: 32}}
        uri={fill.backward}
      />
    );
  };

  facebook = style => {
    return (
      <SvgUri style={{fill: '#fff', marginLeft: -12}} uri={fill.facebook} />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.backButtonView}>
            <Button
              onPress={() => {
                this.props.navigation.navigate('Phone');
              }}
              style={styles.backButton}
              icon={this.backward}
            />
          </View>
          <View style={{marginTop: Dimensions.get('window').height / 8}}>
            <View>
              <Text style={styles.header1}>Social account</Text>
            </View>

            <View>
              <Text style={styles.header2}>connect with social account</Text>
            </View>
            <View>
              <Button style={styles.google} icon={this.google}>
                Connect with Google
              </Button>
            </View>
            <View style={{marginTop: '2%'}}>
              <Button style={styles.facebook} icon={this.facebook}>
                Connect with Facebook
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
SociaLoginScreen.navigationOptions = {
  header: null,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButtonView: {
    position: 'absolute',
    marginTop: 12,
    marginLeft: 4,
  },
  google: {
    backgroundColor: '#eb4236',
    borderColor: '#fff',
    borderRadius: 20,
  },
  facebook: {
    backgroundColor: '#3a5999',
    borderColor: '#fff',
    borderRadius: 20,
  },
  socialButtons: {
    borderColor: '#000',
  },
  card: {
    borderColor: '#000',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#fff',
    height: Dimensions.get('window').height / 2,
    paddingLeft: 15,
    paddingRight: 15,
    elevation: 10,
    shadowOffset: {width: 10, height: 10},
    shadowColor: '#a6a7abc9',
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  header1: {
    marginTop: 20,
    fontSize: 18,
  },
  backButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  header2: {
    fontSize: 16,
    color: '#a6a7ab',
    marginBottom: 10,
  },
});

export default withNavigation(SociaLoginScreen);
