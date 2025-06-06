import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import pkg from './package.json' with { type: 'json' }
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import replace from '@rollup/plugin-replace'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.browser': 'true',
      'process.env': '{}',
      global: 'globalThis',
      preventAssignment: true,
    }),
    peerDepsExternal(),
    resolve({ browser: true }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.build.json' }),
    terser(),
    json(),
    nodeResolve({
      browser: true, // 表明是浏览器环境
      preferBuiltins: false, // 不优先使用内置模块
    }),
    nodePolyfills(),
  ],
  external: [...Object.keys(pkg.peerDependencies || {})],
}
