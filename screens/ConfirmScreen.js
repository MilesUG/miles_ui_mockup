/* eslint-disable react-native/no-inline-styles */
import React, {Component, createRef} from 'react';
import {Input, Button} from 'react-native-ui-kitten';
import {View, StyleSheet, Image, Dimensions, Text, Alert} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {withNavigation} from 'react-navigation'
import {styles} from '../components/Inputs';
import {fill} from '../constants/Icons';

class ConfirmScreen extends Component {
  input1 = createRef();
  input2 = createRef();
  input3 = createRef();
  input4 = createRef();
  state = {
    codeNumOne: '',
    codeNumTwo: '',
    codeNumThree: '',
    codeNumFour: '',
    otp: '',
  };

  buttonIcon = style => {
    return <SvgUri style={{fill: '#fff'}} uri={fill.forward} />;
  };

  handleTextChange1 = value => {
    this.setState({codeNumOne: value});
    this.setState({otp: this.state.otp.concat(value)});
    !value ? this.input1.current.focus() : this.input2.current.focus();
  };

  handleTextChange2 = value => {
    this.setState({codeNumTwo: value});
    this.setState({otp: this.state.otp.concat(value)});
    !value ? this.input1.current.focus() : this.input3.current.focus();
  };

  handleTextChange3 = value => {
    this.setState({codeNumThree: value});
    this.setState({otp: this.state.otp.concat(value)});
    !value ? this.input2.current.focus() : this.input4.current.focus();
  };

  handleTextChange4 = value => {
    const code = '1234';
    this.setState({codeNumFour: value});
    this.setState({otp: this.state.otp.concat(value)});
    // wait for state
    // setTimeout(() => {
    //   if (code === this.state.otp) {
    //     value && Alert.alert('code confirmed');
    //   } else {
    //     value && Alert.alert('code unconfirmed');
    //   }
    // }, 30);
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.card}>
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
              <Text style={styles.header1}>Are you new to miles?</Text>
            </View>

            <View>
              <Text style={styles.header2}>
                Enter the 6 digit sent to your mobile number.
              </Text>
              <View style={{marginBottom: 10}}>
                <Text style={{color: '#fe4c5a', fontWeight: 'bold'}}>
                  0754669999
                </Text>
              </View>
            </View>
            <View>
              <Input
                style={styless.input}
                size="small"
                maxLength={1}
                value={this.state.codeNumOne}
                ref={this.input1}
                secureTextEntry={true}
                onChangeText={this.handleTextChange1}
                keyboardType="number-pad"
              />
              <Input
                style={[styless.input, styless.secondInput]}
                size="small"
                maxLength={1}
                onKeyPress={({nativeEvent: {key: keyValue}}) => {
                  if (keyValue === 'Backspace') {
                    this.input1.current.focus();
                  }
                }}
                value={this.state.codeNumTwo}
                ref={this.input2}
                secureTextEntry={true}
                onChangeText={this.handleTextChange2}
                keyboardType="number-pad"
              />
              <Input
                style={[styless.input, styless.thirdInput]}
                size="small"
                maxLength={1}
                onKeyPress={({nativeEvent: {key: keyValue}}) => {
                  if (keyValue === 'Backspace') {
                    this.input2.current.focus();
                  }
                }}
                value={this.state.codeNumThree}
                ref={this.input3}
                secureTextEntry={true}
                onChangeText={this.handleTextChange3}
                keyboardType="number-pad"
              />
              <Input
                style={[styless.input, styless.fourthInput]}
                size="small"
                maxLength={1}
                value={this.state.codeNumFour}
                ref={this.input4}
                onKeyPress={({nativeEvent: {key: keyValue}}) => {
                  if (keyValue === 'Backspace') {
                    this.input3.current.focus();
                  }
                }}
                secureTextEntry={true}
                onChangeText={this.handleTextChange4}
                keyboardType="number-pad"
              />
              <View style={{position: 'absolute', bottom: 132}}>
                <Text
                  onPress={this.socialScreenOrPassword}
                  style={styless.socialLink}>
                  Resend code in:{' '}
                  <Text style={{color: '#000', fontWeight: 'bold'}}>00:59</Text>
                </Text>
                <Button
                  style={[styles.buttonContinue, {'bottom': '19%'}]}
                  size="medium"
                  icon={this.buttonIcon}
                  onPress={() => this.props.navigation.navigate('GetRide')}
                />
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}

ConfirmScreen.navigationOptions = {
  header: null,
};

const getWidth = percentage => {
  if (Dimensions.get('window').width > Dimensions.get('window').height) {
    return (Dimensions.get('window').height * percentage) / 100;
  }
  return (Dimensions.get('window').width * percentage) / 100;
};

const styless = StyleSheet.create({
  input: {
    borderColor: '#dddddd',
    backgroundColor: '#fff',
    width: '22%',
    height: "17.6%",
    fontSize: 12,
    textAlignVertical: 'center',
    position: 'relative',
  },
  secondInput: {
    bottom: "17.5%",
    left: "26%",
  },
  thirdInput: {
    bottom: "35%",
    left: "50%",
  },
  fourthInput: {
    bottom: "52.5%",
    left:" 75%",
  },
  socialLink: {
    color: '#9c9da1',
    fontSize: 16,
  },
});

export default withNavigation(ConfirmScreen);
