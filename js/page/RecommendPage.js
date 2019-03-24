import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native'
import FetchUtils  from '../utils/FetchUtils'
import NavigatorUtil from '../navigator/NavigatorUtil'
import Swiper from 'react-native-swiper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { musicBanner, musicRecommendNewSong, musicRecommendSongList } from "../utils/FetchApi";
const FetchData = new FetchUtils();
const { width } = Dimensions.get('window')
export default class RecommendPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            banners: [],
            recommendListArr: [],
            recommendSing: []
        }
    }
    async componentDidMount(): void {
        FetchData.fetchNetData(musicBanner).then(res => {
            if (res.code === 200) {
                this.setState({
                    banners: res.banners
                })
            }
        });
        await FetchData.fetchNetData(musicRecommendSongList).then(res => {
            if (res.code === 200) {
                this.setState({
                    recommendListArr: res.result
                })
            }
        });
    }
    flastHader () {
        let imageArr = this.state.banners.length ? this.state.banners.map((item, index) => {
            return  <Image source={{uri: item.picUrl}} style={{height: 150}} key={index}/>
        }) :  <View style={styles.slide1}>
            <Text style={styles.text}>Hello Music</Text>
        </View>
        return <Swiper autoplayTimeout={10} style={styles.wrapper} autoplay={true}>
            {imageArr}
        </Swiper>
    }
    sectionRecommendItem () {
        const { recommendListArr } = this.state
        let recommendListItem = recommendListArr.length ? recommendListArr.map((item, index) => {
            return <TouchableOpacity onPress={() => this.goDetail(item)} key={index}>
                <View  style={styles.recommendItem}>
                    <View style={styles.recommendBox}>
                        <Image source={{uri: item.picUrl}} style={{width: 0.3* width, height: 0.3* width,borderRadius: 5}}/>
                        <Text>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        }) : null
        return recommendListItem
    }
    goDetail (val) {
        NavigatorUtil.navigatorToPage({song: {val, type: 'recommend', name: val.name}},'SongList')
    }
    sectionTitle (title)  {
        return <View style={styles.sectionTitle}>
                <View style={styles.titleBox}>
                    <Ionicons name={'ios-star-outline'} size={20} style={{color: '#6b52ae'}}/>
                    <Text style={styles.secTitle}>{title}</Text>
                    <Ionicons name={'ios-star-outline'} size={20} style={{color: '#6b52ae'}}/>
                </View>
            </View>

    }
    render () {
        return  (
            <View style={{flex: 1}}>
                <ScrollView>
                    {this.flastHader()}
                    { this.state.recommendListArr.length ? <View>
                        {this.sectionTitle('推荐歌单')}
                        <View style={styles.recommendWrapper}>
                            {this.sectionRecommendItem()}
                        </View>
                    </View> : <ActivityIndicator style={styles.indeicator}/>}

                </ScrollView>
            </View>
            )
    }
}
const styles = StyleSheet.create({
    wrapper: {
        height: 150
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    text: {
        color: '#999',
        fontSize: 30,
        fontWeight: 'bold',
    },
    sectionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderColor: '#666',
        padding: 3,
        shadowRadius: 2,
        borderRadius: 2,
        margin: 2,
        elevation: 2
    },
    recommendWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    recommendItem: {
        width: 0.3 * width,
        marginTop: 10,
        marginBottom: 10,
        borderRadius:5
    },
    recommendBox: {


    },
    itemRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemImage: {
        width: 50,
        margin: 5
    },
    itemText: {
        fontSize: 12,
        color: '#333'
    },
    icons: {
        position: 'absolute',
        right: 10,
        color: '#678'
    },
    secTitle: {
        marginLeft: 5,
        marginRight: 5,
    },
    sectionTitle: {
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    titleBox: {
        width: 200,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#6b52ae'
    },
    indeicator: {
       marginTop: 50
    }
});