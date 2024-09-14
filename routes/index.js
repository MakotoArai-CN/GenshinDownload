// plugins/GenshinDownload/routes/index.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const router = express.Router();

const {
  ClientLink,
  ServerLink
} = require('../resources/GenshinLink');
// 定义一个异步函数来获取链接数据
async function getLinksFromApi() {
  try {
    const response = await axios.get('https://pan.ciy.cool/f/RQC8/GenshinLink.json', {
      timeout: 500
    });
    const data = JSON.parse(response.data);
    return data;
  } catch (error) {
    return null; // 返回 null 表示获取失败
  }
}

// 主函数，用于获取链接并更新默认值
(async () => {
  try {
    const linksData = await getLinksFromApi();
    if (linksData) {
      const {
        ClientLink: newClientLink,
        ServerLink: newServerLink
      } = linksData;
      ClientLink = newClientLink;
      ServerLink = newServerLink;
    }
  } catch (error) {}
})();

// 调用异步函数并存储结果
// const response = axios.get('https://192.168.1.2/GenshinDownloadApi').then(response => JSON.parse(response.data));


// 合并默认和搜索功能
router.get('/client', function (req, res, next) {
  let client_resource = [];
  const searchQuery = req.query.q; // 获取查询参数
  let foundResources = [];

  // 如果有搜索查询，则执行搜索逻辑
  if (searchQuery) {
    // 遍历 ClientLink 数组中的每一个版本对象
    ClientLink.forEach(versionObj => {
      // 遍历每一个版本
      for (const version in versionObj) {
        if (versionObj.hasOwnProperty(version)) {
          const platforms = versionObj[version];

          // 如果版本号中包含搜索关键字，则加入结果列表
          if (version.includes(searchQuery)) {
            if (platforms.Android) {
              foundResources.push({
                name: `原神${version}`,
                androidLink: platforms.Android.installOfPackage.url,
                pcLink: platforms.Windows.Package.url,
                image: platforms.image
              });
            }
          }
        }
      }
    });

    res.render('GenshinDownload/client', {
      title: '客户端',
      resources: foundResources
    });
  } else {
    // 遍历 ClientLink 数组中的每一个版本对象
    ClientLink.forEach(versionObj => {
      // 遍历每一个版本
      for (const version in versionObj) {
        if (versionObj.hasOwnProperty(version)) {
          const platforms = versionObj[version];

          // 处理 Android 平台信息
          if (platforms.Android) {
            client_resource.push({
              name: `原神${version}`,
              androidLink: platforms.Android.installOfPackage.url,
              pcLink: platforms.Windows.Package.url,
              image: platforms.image
            });
          }
        }
      }
    });

    res.render('GenshinDownload/client', {
      title: '客户端',
      resources: client_resource
    });
  }
});

router.get('/server', function (req, res, next) {
  let servers = [];
  const searchQuery = req.query.q; // 获取查询参数

  // 如果有搜索查询，则执行搜索逻辑
  if (searchQuery) {
    // 遍历 ServerLink 数组中的每一个服务器对象
    ServerLink.forEach(serverObj => {
      // 遍历每一个服务器
      for (const serverName in serverObj) {
        if (serverObj.hasOwnProperty(serverName)) {
          const server = serverObj[serverName];

          // 如果服务器名称中包含搜索关键字，则加入结果列表
          if (serverName.includes(searchQuery)) {
            servers.push({
              name: serverName, // 使用服务器名称作为小标题
              author: server.author,
              image: server.image,
              description: server.description,
              server: server.server
            });
          }
        }
      }
      res.render('GenshinDownload/server', {
        title: '服务端',
        servers: servers
      });
    });
  } else {
    // 直接添加所有服务器信息
    ServerLink.forEach(serverObj => {
      // 遍历每一个服务器
      for (const serverName in serverObj) {
        if (serverObj.hasOwnProperty(serverName)) {
          const server = serverObj[serverName];
          servers.push({
            name: serverName, // 使用服务器名称作为小标题
            image: server.image,
            author: server.author,
            description: server.description,
            server: server.server
          });
        }
      }
      res.render('GenshinDownload/server', {
        title: '服务端',
        servers: servers
      });
    });
  }
});

router.get('/picture', function (req, res, next) {
  const picturesPath = path.join(__dirname, "../static/images/genshin");
  const pictures = fs.readdirSync(picturesPath);
  const picturesUrl = pictures.map(picture => `"./images/genshin/${picture}"`);  
  res.render('GenshinDownload/picture', {
    title: '宣传海报',
    pictures: picturesUrl
  });
});


// 新增的路由，用于提供详细信息
router.get('/details', function (req, res, next) {
  const resourceName = req.query.name.replace(/[^\d.]/g, '');
  let foundResource = null;
  // console.log(resourceName);

  // 遍历 ClientLink 数组
  ClientLink.some(versionObj => {
    // 对每个版本对象进行检查
    Object.keys(versionObj).some(version => {
      // 去除版本键中的中文字符 
      // console.log(version === resourceName);

      if (version === resourceName) {
        foundResource = versionObj[version];
        return true; // 找到匹配项后立即退出内层循环
      }
      return false; // 没有找到匹配项
    });
    return foundResource !== null; // 如果找到匹配项，则退出外层循环
  });

  if (foundResource) {
    res.json({
      androidInstallUrl: foundResource.Android.installOfPackage.url,
      androidInstallMd5: foundResource.Android.installOfPackage.md5,
      androidInstallSize: foundResource.Android.installOfPackage.size,
      androidInstallVersion: foundResource.Android.installOfPackage.version,
      androidInstallTime: foundResource.Android.installOfPackage.time,

      androidDataUrl: foundResource.Android.data.url,
      androidDataMd5: foundResource.Android.data.md5,
      androidDataSize: foundResource.Android.data.size,
      androidDataVersion: foundResource.Android.data.version,
      androidDataTime: foundResource.Android.data.time,

      windowsPackageUrl: foundResource.Windows.Package.url,
      windowsPackageMd5: foundResource.Windows.Package.md5,
      windowsPackageSize: foundResource.Windows.Package.size,
      windowsPackageVersion: foundResource.Windows.Package.version,
      windowsPackageTime: foundResource.Windows.Package.time,

      windowsResourceUrl: foundResource.Windows.Resource.url,
      windowsResourceMd5: foundResource.Windows.Resource.md5,
      windowsResourceSize: foundResource.Windows.Resource.size,
      windowsResourceVersion: foundResource.Windows.Resource.version,
      windowsResourceTime: foundResource.Windows.Resource.time
    });
  } else {
    res.status(404).json({
      message: 'Resource not found'
    });
  }
});

// 404 错误处理
router.all('*', function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, '../../../public/404.html'));
});

module.exports = router;