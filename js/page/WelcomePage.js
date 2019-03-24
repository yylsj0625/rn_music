import React, { Component } from 'react'
import { View,Text, Button } from 'react-native'
import NavigatorUtil from '../navigator/NavigatorUtil'

export default class WelcomePage extends Component{
    render () {
        return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>
                我是 WelcomePage
            </Text>
            <Button
            title={'go to HomePage'}
            onPress={() => {

                NavigatorUtil.resetToHomePage(this.props)
            }}
            />
        </View>
    }
}