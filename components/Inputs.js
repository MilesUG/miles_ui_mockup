/* eslint-disable react-native/no-inline-styles */
import {Input, Button} from 'react-native-ui-kitten';
import {SvgUri} from 'react-native-svg';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  Keyboard,
} from 'react-native';
import {fill} from '../constants/Icons';
import {withNavigation} from 'react-navigation';

class Inputs extends Component {
  state = {
    focused: false,
    phoneNumber: '',
  };
  focusedInput = () => {
    this.setState({focused: true});
  };

  handleTextChange = value => {
    this.setState({phoneNumber: value});
  };

  backward = () => {
    return (
      <SvgUri
        style={{fill: '#9c9da1', width: 32, height: 32}}
        uri={fill.backward}
      />
    );
  };

  socialScreenOrPassword = () => {
    this.props.navigation.state.routeName === 'Phone'
      ? this.props.navigation.navigate('SociaLogin')
      : this.props.navigation.navigate('Reset');
  };

  buttonIcon = style => {
    return <SvgUri style={{fill: '#fff'}} uri={fill.forward} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          {(this.props.navigation.state.routeName === 'Password' ||
            this.props.navigation.state.routeName === 'Reset') && (
            <View style={styles.backButtonView}>
              <Button
                onPress={() => {
                  this.props.navigation.navigate('Phone');
                }}
                style={styles.backButton}
                icon={this.backward}
              />
            </View>
          )}
          <Image
            style={{
              width: 60,
              height: 60,
              transform: [{translateX: getWidth(100) / 2.6}],
              marginTop: 30,
              marginBottom: 10,
            }}
            source={require('../assets/images/icon.png')}
          />
          <View>
            <Text style={styles.header1}>{this.props.header1}</Text>
          </View>

          <View>
            <Text style={styles.header2}>{this.props.header2}</Text>
          </View>
          <Input
            onSubmitEditing={Keyboard.dismiss}
            style={styles.input}
            size="small"
            value={this.state.phoneNumber}
            onChangeText={this.handleTextChange}
            placeholder={this.props.placeholder}
            placeholderTextColor={styles.input.borderColor}
            onFocus={this.focusedInput}
            keyboardType={this.props.keypadType}
            secureTextEntry={this.props.secureText}
          />
          <View style={{marginTop: 20}}>
            <Text
              onPress={this.socialScreenOrPassword}
              style={styles.socialLink}>
              {this.props.socialOrPassword}
            </Text>
            <Button
              onPress={() => 
                this.props.navigation.state.routeName === 'Password'
                  ? this.props.navigation.navigate('Confirm')
                  : this.props.navigation.navigate(this.props.screenName)
              }
              style={styles.buttonContinue}
              size="medium"
              icon={this.buttonIcon}
            />
          </View>
        </View>
      </View>
    );
  }
}
const getWidth = percentage => {
  if (Dimensions.get('window').width > Dimensions.get('window').height) {
    return (Dimensions.get('window').height * percentage) / 100;
  }
  return (Dimensions.get('window').width * percentage) / 100;
};

// const getHeight = (percentage) => {
//   if (Dimensions.get('window').width > Dimensions.get('window').height) {
//     return (Dimensions.get('window').width * percentage) / 100;
//   }
//   return (Dimensions.get('window').height * percentage) / 100;
// };

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    position: 'relative',
    borderColor: '#dddddd',
    marginTop: 5,
    height: "17.6%",
    backgroundColor: '#fff',
  },
  card: {
    borderColor: '#000',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#fff',
    height: 400,
    paddingLeft: 15,
    paddingRight: 15,
    elevation: 10,
    shadowOffset: {width: 10, height: 10},
    shadowColor: '#a6a7abc9',
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  buttonContinue: {
    borderColor: 'transparent',
    borderRadius: 50,
    width: 46,
    height: 46,
    backgroundColor: '#373F51',
    position: 'relative',
    left: getWidth(100) - 75,
    bottom: 35,
  },
  backButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  backButtonView: {
    position: 'absolute',
    marginTop: 12,
    marginLeft: 4,
  },
  socialLink: {
    marginTop: 15,
    color: '#9c9da1',
    fontSize: 16,
  },
  header1: {
    marginTop: 20,
    fontSize: 18,
  },
  header2: {
    fontSize: 16,
    color: '#a6a7ab',
    marginBottom: 10,
  },
});

export default withNavigation(Inputs);
