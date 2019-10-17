import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const makeDevServerPlugins = commandOptions => [
  // serve the base directory + open it in the users
  // defualt browser
  serve({
    open: true,
    contentBase: '.',
    // optionally specify the dev server port via `--port=`
    port: commandOptions.port
  }),
  // watch for bundle rebuilds & reload the page
  livereload({
    watch: ['dist']
  })
];

export default makeDevServerPlugins;
