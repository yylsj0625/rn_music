import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, Image, ActivityIndicator, Animated, Easing, ScrollView } from 'react-native'
import FetchUtils from "../utils/FetchUtils";
const FetchData = new FetchUtils();
import { playSong } from "../utils/FetchApi";
import  Video  from 'react-native-video'
export default class MusicPlayerPage extends Component{
    constructor(props) {
        super(props)
        this.player = null
        this.state = {
            song: '',
            musicUrl: '',
            duration: '',
            num: 0,
            rotateValue: new Animated.Value(0),
        }

    }
    async componentDidMount(): void {
        let song = this.props.navigation.getParam('play')
        console.log(song);
        this.setState({
            song: song
        })
       await FetchData.fetchData(playSong + song.id).then(res => {
            if (res.code === 200) {
                console.log(res);
                this.setState({
                    musicUrl: res.data[0].url
                })
            }
        } )
        this.startAnimation();
    }
    componentWillUnmount(): void {

    }

    audioPause () {

    }
    audioPlay () {

    }
    resource () {

    }
    videoError  () {

    }
    onBuffer () {

    }
    startAnimation() {
        this.state.rotateValue.setValue(0);
        Animated.timing(this.state.rotateValue, {
            toValue: 1,
            duration: 15000,
            easing: Easing.out(Easing.linear)
        }).start(() => this.startAnimation());
    }

    num () {
        this.setState({
            num: this.state.num++
        })
    }
    onLoad (val) {
        console.log(val);
    }
    render () {
        return <View style={styles.container}>
            <Video source={{uri: this.state.musicUrl}}   // Can be a URL or a local file.
                   ref={(ref) => {
                       this.player = ref
                   }}                                      // Store reference
                   onBuffer={this.onBuffer}                // Callback when remote video is buffering
                   onError={this.videoError}               // Callback when video cannot be loaded
                   style={styles.backgroundVideo} />
                <ScrollView>
                    { this.state.song ? <View >
                        <View>
                            <Animated.Image
                                source={{uri: this.state.song.picUrl}}
                                style={[
                                    styles.record,
                                    {
                                        transform: [{
                                            rotateZ: this.state.rotateValue.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '360deg'],
                                            })
                                        }]
                                    }
                                ]}>
                            </Animated.Image>
                        </View>
                        <View  style={styles.marginBT}>
                            <Button title={'暂停'} onPress={() => this.audioPause()}/>
                        </View>
                        <Button title={'播放'} onPress={() => this.audioPlay()}/>
                    </View> : <ActivityIndicator/>
                    }
                </ScrollView>
            </View>

    }
}
const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    marginBT: {
        marginBottom: 20,
        marginTop: 20
    },
    record: {
        width:240,
        height: 240,
        borderRadius: 120,
        marginTop: 100,
        backgroundColor: '#6b52ae'
    }
})