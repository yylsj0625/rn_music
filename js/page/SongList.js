import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList, ImageBackground, findNodeHandle, TouchableOpacity, Dimensions  } from 'react-native'
import { musicRecommendSongListDetail, singerSong } from "../utils/FetchApi";
import AntDIcon from 'react-native-vector-icons/AntDesign'
import FetchUtils  from '../utils/FetchUtils'
import NavigatorUtil from "../navigator/NavigatorUtil";
const FetchData = new FetchUtils();

const { width } = Dimensions.get('window')

export default class SongList extends Component{
    constructor(props){
        super(props)
        this.state = {
            song: ''
        }
    }
    componentDidMount(): void {
        let data = this.props.navigation.getParam('song', 'params be null')
        let url = null
        if (data.type === 'recommend') {
            url = musicRecommendSongListDetail + data.val.id
        } else {
            url = singerSong + data.val.id
        }
        FetchData.fetchData(url)
            .then(res => {
                console.log(res);
                if (res.code === 200) {
                    this.setState({
                        song: data.type === 'recommend' ?  res.playlist : {name: res.artist.name, coverImgUrl: res.artist.picUrl, tracks: res.hotSongs}
                    })
                }
            })

    }
    goPlay (val) {
        NavigatorUtil.navigatorToPage({play: {name: val.name, id: val.id, picUrl: val.al.picUrl}},'MusicPlayerPage')
    }
    _renderItem({item, index}) {
        return <TouchableOpacity onPress={() => this.goPlay(item)}>
            <View style={styles.itemContainer} >
                <Text style={[styles.numbers, {color: index + 1 < 4 ? 'red' : '#000'}]}>{index + 1  < 9 ? '0'+ (index + 1) : (index + 1) }</Text>
                <View style={styles.description}>
                    <View style={styles.songName}>
                        <Text style={{width: 0.8 * width}} numberOfLines={1} ellipsizeMode={'tail'}>{item.name}</Text>
                        <Text  style={{width: 0.8 * width}} numberOfLines={1} ellipsizeMode={'tail'}>{
                            item.ar.map((i,idx) => {
                                if (!item.ar.length) return '未知歌手'
                                if(idx < item.ar.length-1) {
                                    return i.name+ '/'
                                } else {
                                    return i.name
                                }
                            })
                        }</Text>
                    </View>
                    <AntDIcon name={'playcircleo'} size={20}/>
                </View>
            </View>
        </TouchableOpacity>
    }
    _flatHeader () {
        return  <View style={styles.image}>
            <ImageBackground
                source={{uri: this.state.song.coverImgUrl}}
                style={{width: '100%', height:200}}>
            </ImageBackground>
        </View>
    }
    render () {
        let { song } = this.state;
        return <View style={styles.container}>
            { this.state.song ?
                <FlatList
                    data={song.tracks}
                    keyExtractor={(item, index) =>'' + item.id}
                    ListHeaderComponent={() => this._flatHeader()}
                    renderItem={({item, index}) => this._renderItem({item, index})}
                /> : <ActivityIndicator style={styles.indicator}/>
            }
            </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e3e3e3',
        padding: 5
    },
    numbers: {
        width: 30,
        marginLeft: 10
    },
    description: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10
    },
    songName: {
      flexDirection: 'column'
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
    image: {
        width: '100%',
        height: 200
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})