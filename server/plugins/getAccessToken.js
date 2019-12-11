const rp = require('request-promise')
const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, 'access_token.json')
// console.log(fileName)
const APPID = 'wx318e3b6ceda5d4d5'
const APPSECRET = 'c95da35ba7ca4560e283f788ecc5cf15'
const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`

// 请求 微信 accessToken
const updateAccessToken = async () => {
  const resStr = await rp(URL)
  const res = JSON.parse(resStr)
  // console.log(res)

  // 写文件
  if (res.access_token) {
    fs.writeFileSync(fileName, JSON.stringify({
      access_token: res.access_token,
      createTime: new Date()
    }))
  } else {
    await updateAccessToken()
  }
}

// 读取 access_token
const getAccessToken = async () => {
  try {
    const readRes = fs.readFileSync(fileName, 'utf8')
    const readObj = JSON.parse(readRes)
    // console.log(readObj)

    const createTime = new Date(readObj.createTime).getTime()
    const nowTime = new Date().getTime()
    if((nowTime-createTime) / 1000 / 3600 >= 2) {
      await updateAccessToken()
      await getAccessToken()
    }
    
    return readObj.access_token
  } catch (error) {
    await updateAccessToken()
    await getAccessToken()
  }
}

// 设置定时器 每过两小时提前五分钟获取一次 token
setInterval(async () => {
  await updateAccessToken()
}, (7200 - 300) * 1000);

// updateAccessToken()
// console.log(getAccessToken())

module.exports = getAccessToken