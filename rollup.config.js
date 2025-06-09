import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'build/index.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'build/index.cjs.js',
      format: 'cjs',
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
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.build.json' }),
    terser(),
    json(),
    nodePolyfills({
      include: ['global', 'process'],
    }),
    postcss({
      extract: false,
      inject: true,
      minimize: true,
    }),
  ],
  external: [...Object.keys(pkg.peerDependencies || {})],
}
