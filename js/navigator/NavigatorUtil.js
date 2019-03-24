import { Alert } from 'react-native'

export default class NavigatorUtil {
    /**
    * @Description: 返回上一页
    * @author yyl
    * @params navigation
    **/
    static goBack (params) {
        const { navigation } = params;
        navigation.goBack();
    }

    /**
    * @Description: 跳转到指定页面
    * @author yyl
    * @params
    **/
    static navigatorToPage (params, page) {
        const { navigation } = NavigatorUtil.navigation
        if (!navigation) {
            Alert.alert('navigation can not be null')
            return
        }
        navigation.navigate(page, {...params})
    }
    /**
    * @Description: 重置到首页
    * @author yyl
    * @params navigation
    **/
    static resetToHomePage (params) {
        const { navigation } = params;
        navigation.navigate('Main')
    }
}