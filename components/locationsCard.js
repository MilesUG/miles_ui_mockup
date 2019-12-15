/* eslint-disable react-native/no-inline-styles */
import { Input, Button, Text, Layout, Modal } from 'react-native-ui-kitten';
import { SvgUri } from 'react-native-svg';
import { withNavigation } from 'react-navigation'
import React, { Component } from 'react';
import {
    View,
    BackHandler,
    StyleSheet
} from 'react-native';
import { getWidth, getHeight } from '../utils/getWidth';
import { fill, outline } from '../constants/Icons';
import CardModal from './modalCard'


class LocationsCard extends Component {
    state = {
        location: '',
        typing: false,
        confirmDelete: false,
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onHandleDeleteModal)
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    cancelIcon = style => {
        return <SvgUri style={{ fill: '#c1c1c1' }} uri={fill.cancel} />;
    };
    heartIcon = style => {
        return <SvgUri style={{ fill: '#57e6b7', width: 24, height: 24 }} uri={fill.heart} />;
    };
    pinIcon = style => {
        return <SvgUri style={{ fill: this.props.titleColor, width: 24, height: 24 }} uri={fill.pin} />;
    };
    deletePlace = style => {
        return <SvgUri style={{ fill: '#f86b7e', width: 24, height: 24 }} uri={outline.minus} />;
    }
    deletePlaceFill = style => {
        return <SvgUri style={{ fill: '#f86b7e', width: 24, height: 24 }} uri={fill.minus} />;
    }
    handleChangeText = value => {
        this.setState({ location: value, typing: true })
    }
    onCancelIcon = () => {
        this.setState({ location: '', typing: false })
    }
    clockIcon = () => {
        return <SvgUri style={{ fill: '#7f828b', width: 24, height: 24 }} uri={fill.clock} />;
    }
    buttonIcon = style => {
        return <SvgUri style={{ fill: '#fff' }} uri={fill.forward} />;
    };
    onHandleDeleteModal = () => {
        this.setState(prevState => ({
            confirmDelete: !prevState.confirmDelete
        }))
    }

    onHandleContinue = () => {
        this.props.navigation.navigate('DropOff')
        this.setState({
            confirmDelete: false
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View>
                        <Text style={[styles.titleFont, { color: this.props.titleColor }]}>{this.props.cardTitle}</Text>
                    </View>
                    <View>
                        <Input
                            size="small"
                            style={styles.input}
                            value={this.state.location}
                            icon={this.state.typing && this.cancelIcon}
                            onChangeText={this.handleChangeText}
                            onIconPress={this.onCancelIcon}
                        />
                        <View>
                            <Button
                                style={[{ left: 0, top: 15 }, styles.deletePlace]}
                                icon={this.pinIcon}
                            />
                            <Text onPress={() => this.props.navigation.navigate('GetRide')} style={{ marginTop: 25, marginLeft: 40, color: "#c1c1c1" }}>Tap to select from map</Text>
                            <Button
                                style={[{ marginTop: 0 }, styles.buttonContinue]}
                                onPress={this.onHandleContinue}
                                icon={this.buttonIcon}
                            />
                        </View>
                    </View>
                </View>
                <View className="placesVisted">
                    <View style={styles.favoritePlaces}>
                        <View style={styles.favTitle}><Text style={{ fontWeight: 'bold' }} category='h6'>Favourite places</Text></View>
                        <View>
                            <View>
                                <Button
                                    style={[{ top: -6, left: -12 }, styles.deletePlace]}
                                    icon={this.heartIcon}
                                />
                            </View>
                            <View style={{ marginLeft: 30 }}>
                                <Text style={{ fontWeight: 'bold' }} category='s1'>Creative solutions-office</Text>
                                <Text style={{ fontWeight: 'bold', color: '#c1c1c1' }} category='c2'>No. 29 deal pl, colombo</Text>
                            </View>
                            <Button style={styles.deletePlace}
                                onPress={this.onHandleDeleteModal}
                                icon={this.state.confirmDelete ? this.deletePlaceFill : this.deletePlace}
                            />
                        </View>
                        <View style={{ marginTop: 25 }}>
                            <View style={styles.favTitle}><Text style={{ fontWeight: 'bold' }} category='h6'>Recently visited places</Text></View>
                            <View>
                                <View>
                                    <Button style={[{ top: -6, left: -12 }, styles.deletePlace]}
                                        icon={this.clockIcon}
                                    />
                                </View>
                                <View style={{ marginLeft: 30 }}>
                                    <Text style={{ color: '#94959a', fontWeight: 'bold' }} category="s1">Naguru - block 25</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <CardModal hidden={this.state.confirmDelete} />
            </View>
        )
    }
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        borderColor: '#dddddd',
        marginTop: 5,
        height: '35%',
        backgroundColor: '#fff',
    },
    titleFont: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        fontWeight: 'bold'
    },
    modalButtons: {
        width: 155,
        backgroundColor: '#ffffff',
        borderColor: '#94959a',
        borderRadius: 50,
        marginTop: 10,
    },
    cardModal: {
        borderColor: '#000',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 20,
        width: getWidth(100),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        marginTop: getHeight(100) - 168

    },
    card: {
        borderColor: '#000',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#fff',
        height: getWidth(100) - 200,
        paddingLeft: 15,
        paddingRight: 15,
        elevation: 10,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: '#a6a7abc9',
        shadowOpacity: 0.5,
        shadowRadius: 20,
        paddingTop: 10
    },
    buttonContinue: {
        borderColor: 'transparent',
        borderRadius: 50,
        width: 46,
        height: 46,
        backgroundColor: '#373F51',
        position: 'relative',
        left: getWidth(100) - 75,
        bottom: 30,
    },
    deletePlace: {
        backgroundColor: 'transparent',
        width: 0,
        height: 0,
        position: 'absolute',
        right: 0,
        borderColor: 'transparent'
    },
    favoritePlaces: {
        padding: 15
    },
    favTitle: {
        marginBottom: 19
    }
});

export default withNavigation(LocationsCard)