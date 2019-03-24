import React, { Component } from 'react'
import { View, Text, SectionList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import FetchUtils from "../utils/FetchUtils";
import { singerList } from "../utils/FetchApi";
import {PinyinUtil} from '../utils/Pinyin'
import NavigatorUtil from '../navigator/NavigatorUtil'
import  Feather from 'react-native-vector-icons/Feather'

const FetchData = new FetchUtils();

export default class SingerPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            singerList: [],
            errorImage: [],
            indexList: []
        }
    }
    componentDidMount(): void {
        FetchData.fetchData(singerList).then(res => {
            let singerArr = [];
            let chat = [];
            let indexList = [];
            if (res.code === 200) {
                res.artists.map(item => {
                    item.indexChat = PinyinUtil.getFirstLetter(item.name).substring(0,1)
                    chat.push(item.indexChat)
                });
                let arr = [...new Set(chat)].sort();
                this.setState({
                    indexList: arr
                })
                arr.map(item => {
                    indexList.push({
                        title: item,
                        data: []
                    })
                });
                for (let j = 0; j < res.artists.length; j ++) {
                    for (let m = 0; m < indexList.length; m ++) {
                        if (indexList[m].title === res.artists[j].indexChat) {
                            indexList[m].data.push(res.artists[j])
                        }
                    }
                }
                console.log(indexList);
                this.setState({
                    singerList: indexList
                })
            }
        })
    }
    onError (idx) {
        console.log(idx);
        this.setState({
            // errorImage: [...this.state.errorImage, idx]
        })
    }
    goPlay (val) {
        NavigatorUtil.navigatorToPage({song: {val, type: 'singer'}},'SongList')
    }
    sectionItem ({item, index}) {
        return <TouchableOpacity onPress={() => this.goPlay(item)
        }>
            <View style={styles.renderItem}>
                <Image style={styles.image} onError={(e) => this.onError(e)} source={{uri: item.img1v1Url}}/>
                <Text style={styles.name}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    }
    renderIndexList () {
     return  this.state.indexList.map((item, index) => {
           return <TouchableOpacity onPress={() => this._onSectionselect(item,index)} key={index}>
                   <Text>{ item } </Text>
           </TouchableOpacity>
       })
    }
    _onSectionselect (item, key) {
        let offset = key * 20;
        const {singerList} = this.state;
        singerList.map((item,index) => {
            if(key > index){        //要滚动的距离就是，点击的字母索引之前的所有内容，所以当 点击字母的索引 大于 sections（变量）的索引时；技术要滚动的高度
                offset = offset + item.data.length*80 + (item.data.length-1);      //每个联系人的item高是60，上下padding各为10;然后每个节点里面有length-1条分割线且高度为1
            }
        });
        //滚动到指定的偏移的位置
        this.refs._sectionList.scrollToLocation({animated: true,  itemIndex: key})
    }
    render () {
        return <View style={{flex: 1}}>
            <SectionList
                ref={'_sectionList'}
                sections={this.state.singerList}
                renderItem={(data) => this.sectionItem(data)}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.title}>{title}</Text>
                )}
                keyExtractor={(item, index) => ''+ index}
            />
            <View style={styles.indexChat}>{this.renderIndexList()}</View>
            </View>
    }
}
const styles = StyleSheet.create({
    renderItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft:10,
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        flex: 1,
        paddingBottom: 10,
        marginLeft: 10,
        borderBottomWidth: 0.3,
        borderBottomColor: '#e8e8e8'
    },
     title: {
        fontWeight: 'bold',
         paddingLeft: 10
     },
    indexChat: {
        position: 'absolute',
        right: 10,
        top: 30,
        backgroundColor: '#f8f8f8',
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }

})