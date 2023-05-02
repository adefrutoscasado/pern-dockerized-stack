export let API_HOST
export let PRODUCTION
export let DEVELOPMENT

try {
  API_HOST = process.env.API_HOST
} catch (err) {
  if (err.message === 'process is not defined') {
    console.error(
      'process.env.API_HOST is not defined. Define it to be able to make api calls. You can set it at "webpack.config.ts" DefinePlugin option or pass it through build params using "npm run build -- --env API_HOST=$API_HOST"'
    )
  } else throw err
}

try {
  // @ts-ignore: process.env.PRODUCTION can be a boolean
  PRODUCTION = process.env.PRODUCTION === true || process.env.PRODUCTION === 'true' || process.env.PRODUCTION.toLowerCase?.() === 'production'
  DEVELOPMENT = !PRODUCTION
} catch (err) {
  if (err.message === 'process is not defined') {
    console.error(
      'process.env.PRODUCTION is not defined. You can set it at "webpack.config.ts" DefinePlugin option or pass it through build params using "npm run build -- --env PRODUCTION=$PRODUCTION"'
    )
  } else throw err
}

console.log({
  API_HOST,
  PRODUCTION,
  DEVELOPMENT
})