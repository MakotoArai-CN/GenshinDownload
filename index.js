module.exports = {
    author: "Makoto",
    version: "0.0.1",
    description: "原神下载插件",
    icon: "mdi-cloud-download",
    pathname: "GenshinDownload",
    name: "下载",
    subnav: [{
            name: "客户端",
            href: "/GenshinDownload/client",
        },
        {
            name: "服务端",
            href: "/GenshinDownload/server"
        },
        {
            name: "海报图",
            href: "/GenshinDownload/picture"
        },
    ],
    router: require('./routes/index')
};