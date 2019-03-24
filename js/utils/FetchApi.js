const MUSIC_URL = 'http://42.51.207.166:9000'
const NODE_URL = 'https://cnodejs.org/api/v1'

// 获取banners
export const musicBanner = `${MUSIC_URL}/banner`
// 获取 推荐歌单
export const musicRecommendSongList = `${MUSIC_URL}/personalized`
// 获取 推荐歌单详情
export const musicRecommendSongListDetail = `${MUSIC_URL}/playlist/detail?id=`
// 获取 推荐新歌
export const musicRecommendNewSong = `${MUSIC_URL}/personalized/newsong`
// 播放歌曲
export const playSong = `${MUSIC_URL}/music/url?id=`
// 获取歌手
export const singerList = `${MUSIC_URL}/top/artists?offset=0&limit=50`
// 获取歌手单曲
export const singerSong = `${MUSIC_URL}/artists?id=`