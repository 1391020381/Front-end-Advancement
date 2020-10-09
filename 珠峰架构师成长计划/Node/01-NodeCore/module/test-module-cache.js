require('./test-module.js')
console.log(require.cache)

// [Object: null prototype]
//  let cache = {
//     '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/Node/01-NodeCore/module/test-module-cache.js': Module {
//       id: '.',
//       path: '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/Node/01-NodeCore/module',
//       exports: {},
//       parent: null,
//       filename: '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/Node/01-NodeCore/module/test-module-cache.js',
//       loaded: false,
//       children: [ [Module] ],
//       paths: [
//         '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/Node/01-NodeCore/module/node_modules',
//         '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/Node/01-NodeCore/node_modules',
//         '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/Node/node_modules',
//         '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/node_modules',
//         '/Users/zhoujin/Desktop/web/Front-end-Advancement/node_modules',
//         '/Users/zhoujin/Desktop/web/node_modules',
//         '/Users/zhoujin/Desktop/node_modules',
//         '/Users/zhoujin/node_modules',
//         '/Users/node_modules',
//         '/node_modules'
//       ]
//     },
//     '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/Node/01-NodeCore/module/test-module.js': Module {
//       id: '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/Node/01-NodeCore/module/test-module.js',
//       path: '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/Node/01-NodeCore/module',
//       exports: { a: 2, test: [Function: test] },
//       parent: Module {
//         id: '.',
//         path: '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/Node/01-NodeCore/module',
//         exports: {},
//         parent: null,
//         filename: '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/Node/01-NodeCore/module/test-module-cache.js',
//         loaded: false,
//         children: [Array],
//         paths: [Array]
//       },
//       filename: '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/Node/01-NodeCore/module/test-module.js',
//       loaded: true,
//       children: [],
//       paths: [
//         '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/Node/01-NodeCore/module/node_modules',
//         '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/Node/01-NodeCore/node_modules',
//         '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/Node/node_modules',
//         '/Users/zhoujin/Desktop/web/Front-end-Advancement/珠峰架构师成长计划/node_modules',
//         '/Users/zhoujin/Desktop/web/Front-end-Advancement/node_modules',
//         '/Users/zhoujin/Desktop/web/node_modules',
//         '/Users/zhoujin/Desktop/node_modules',
//         '/Users/zhoujin/node_modules',
//         '/Users/node_modules',
//         '/node_modules'
//       ]
//     }
//   }