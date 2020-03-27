// // babel.config.js

// module.exports = api => {
//     return {
//       plugins: [
//         "@babel/plugin-proposal-nullish-coalescing-operator",
//         "@babel/plugin-proposal-optional-chaining"
//       ],
//       presets: [
//         [
//           "@babel/preset-env",
//           {
//             useBuiltIns: "usage",
//             // caller.target will be the same as the target option from webpack
//             targets: api.caller(caller => caller && caller.target === "node")
//               ? { node: "current" }
//               : { chrome: "58", ie: "8" }
//           }
//         ]
//       ]
//     }
//   }