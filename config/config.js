/**
 * 项目的总体配置
 */
define([
    //路由配置
    'routes/main-route',
    'routes/user-route',

    //服务注入
    'factorys/InjectorFactory',
    'factorys/HttpFactory'
  ],
  {
    'timeout': 5000,//连接超时设置
    'isDebug': true//是否打印debug日志
  });
