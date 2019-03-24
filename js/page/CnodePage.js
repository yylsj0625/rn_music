import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RecommendPage from './RecommendPage'
import SingerPage from './SingerPage'
import SearchPage from './SearchPage'

export default class CnodePage extends Component{
    static navigationOptions = {
        header: null
    };
    render () {
        const TopTab = createAppContainer(createMaterialTopTabNavigator({
            SearchPage: {
                screen: SearchPage,
                navigationOptions: {
                    tabBarLabel: '搜索',
                    tabBarIcon: ({tintColor, focused}) => (
                        <Ionicons
                            name={'ios-home'}
                            size={24}
                            style={{color: tintColor}}
                        />
                    )
                }
            }
        }, {
            tabBarOptions: {
                style: {
                    backgroundColor: '#6b52ae'
                },
                activeTintColor: '#ff0'
            }
        }))
        return  <View style={{flex: 1}}>
                    <StatusBar backgroundColor={'#6b52ae'}/>
                    <TopTab/>
               </View>
    }
}