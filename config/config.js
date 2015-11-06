/**
 * 项目的总体配置
 */
define([
    //常量注入
    'config/constant',

    //路由配置
    'routes/main-route',
    'routes/user-route',

    //服务注入
    'factorys/InjectorFactory',
    'factorys/HttpFactory',
    'factorys/UtilsFactorys',

    //指令
    'directives/CommonDirective',

    //拦截器注入
    'interceptors/FrameHttpInterceptor'
  ],
  {
    //生产环境
    produce: {
      server_url:"http://localhost:8089"
    },
    //测试环境
    test: {
      server_url:"http://localhost:8089"
    },
    timeout: 5000,//连接超时设置
    isDebug: true//是否是测试环境
  });
