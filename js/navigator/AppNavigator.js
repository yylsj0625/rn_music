import React from 'react'
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
// import  StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'
import { Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons  from 'react-native-vector-icons/Ionicons'

import MusicPage from '../page/MusicPage'
import CnodePage from '../page/CnodePage'
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import SongList from '../page/SongList'
import MusicPlayerPage from '../page/MusicPlayerPage'

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
    },
    SongList: {
        screen: SongList,
        navigationOptions: ({ navigation }) => {
            const {params}  = navigation.state
            return {
               title: params ? params.song.val.name : '歌单详情'
           }
        }
    },
    MusicPlayerPage: {
        screen: MusicPlayerPage,
        navigationOptions: ({ navigation }) => {
            const {params}  = navigation.state
            return {
                title: params ? params.play.name : '歌曲详情'
            }
        }
    }
},{
    defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#6b52ae',
        },
    },
    // transitionConfig: () => ({
    //     screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    // }),
});
export const AppBottomTabBar =  createBottomTabNavigator({
    MusicPage: {
        screen: MusicPage,
        navigationOptions: {
            tabBarLabel: '音乐',
            tabBarIcon: ({tintColor, focused}) => (
                <FontAwesome name={'music'} size={24} style={{color: tintColor}}/>
            )
        }
    },
    CnodePage: {
        screen: CnodePage,
        navigationOptions: {
            tabBarLabel: '社区',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons name={'logo-nodejs'} size={24} style={{color: tintColor}}/>
            )
        }
    }
});
const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        }
    }
});

export default createSwitchNavigator({
    init: InitNavigator,
    Main: MainNavigator
})