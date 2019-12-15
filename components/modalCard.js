import { Button, Text } from 'react-native-ui-kitten';
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    BackHandler
} from 'react-native';
import { getWidth, getHeight } from '../utils/getWidth';

class CardModal extends Component {
    state = {
        hidden: false
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleCloseClick)
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleCloseClick = () => {
        this.setState(prevState => ({
            hidden: !prevState.hidden
        }))
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.hidden !== this.props.hidden) {
            this.setState({ hidden: this.props.hidden })
        }
    }
    render() {

        return (this.state.hidden &&
            <View style={[{ position: 'absolute', bottom: 0 }, styles.cardModal]}>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.modalText} category='s1'>Delete Favourite</Text>
                    <Text
                        style={[{ color: '#94959a' }, styles.modalText]}
                        category='c1'>
                        Are you sure you want to delete?
                    </Text>
                </View>
                <View>
                    <Button style={styles.modalButtons} status="basic">
                        Yes
                    </Button>
                    <Button
                        style={[{ position: 'absolute', right: 0 }, styles.modalButtons]}
                        onPress={this.handleCloseClick}
                        status="basic">
                        No
                    </Button>
                </View>
            </View>
        )
    }
}


export const styles = StyleSheet.create({
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

export default CardModal