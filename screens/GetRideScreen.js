import React from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation'
import { SvgUri } from 'react-native-svg'
import { Button, Input } from 'react-native-ui-kitten'
import {withNavigation} from 'react-navigation';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { outline, fill } from '../constants/Icons';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = (width / height);
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.00689;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01

const customStyle = [
  {
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#f4f4ff"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#e5eafd"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#ece3fd"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#afe5ab"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#fefffd"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#fbedae"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#fbedae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a9daf2"
      }
    ]
  }
];

class GetRideScreen extends React.Component {
  state = {
      x: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      userLocation: {},
      inputLocation: '',
      fav: false
    };
  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        position = JSON.stringify(position)
        console.log(position.coords)
        this.setState({ userLocation: position })
      },
      error => {
        Alert.alert(error.message)
      }
    )
  }

  handleChangeText = (value) => {
    this.setState({ inputLocation: value})
  }

  handleFavIconPress = () => {
    this.state(prevState => ({
      fav: !prevState.fav
    }))
  }
  
  notFav = () => {
    return (
      <SvgUri
        style={{ width: 24, height: 24 }}
        uri={outline.heart}
      />
    );
  };
  
  fav = () => {
    return (
      <SvgUri
        style={{ width: 32, height: 32, fill: '#57e6b7'}}
        uri={fill.heart}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          zoomEnabled={true}
          defaultZoom={100}
          ref={ref => { this.mapView = ref }}
          customMapStyle={customStyle}
        >
          <Marker
            draggable
            coordinate={this.state.x}
            image={require('../assets/images/person.png')}
            onDragEnd={(e) => console.log(e.nativeEvent.coordinate)}
          />
        </MapView>
        <Input
          style={styles.userLocationInput}
          value={this.state.inputLocation}
          size="small"
          placeholder="Search location"
          onChangeText={this.handleChangeText}
          onIconPress={this.handleFavIconPress}
          icon={this.state.fav ? this.fav : this.notFav}
        />
        <Button onPress={() => this.props.navigation.navigate('PickUp')} style={styles.buttonImHere}>I'm Here</Button>
      </View>
    );
  }
}

GetRideScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonImHere: {
    borderRadius: 50,
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 15,
    backgroundColor: '#373F51',
    borderColor: 'transparent'
  },
  userLocationInput: {
    position: "absolute",
    top: height / 10,
    width: width / 1.2,
    borderRadius: 4,
    borderColor: 'transparent',
    height: '15%',
    backgroundColor: '#fff',
  }
})

export default withNavigation(GetRideScreen);