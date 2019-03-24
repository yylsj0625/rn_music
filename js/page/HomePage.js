import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { AppBottomTabBar } from "../navigator/AppNavigator";
import  NavigatorUtil from '../navigator/NavigatorUtil'

export default class HomePage extends Component{
    static navigationOptions = {
        header: null
    }
    componentDidMount(): void {
        NavigatorUtil.navigation = this.props
    }
    render () {
        let Home = createAppContainer(AppBottomTabBar)
        return <Home/>
    }
}