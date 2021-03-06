import parseArgs from "minimist";

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
})

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  "3000"
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  "localhost"

export default {
  env: {
    baseUrl:
      process.env.BASE_URL ||
      `http://${host}:${port}`
  },
  head: {
    title: "chats",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Social chats"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  css: ["~/assets/scss/app.scss"],
  build: {},
  modules: [
    "@nuxtjs/axios",
    '@nuxtjs/apollo',
    "~/modules/typescript.js",
  ],
  plugins: [
      '~/plugins/eventbus',
      '~/plugins/notifications',
      '~/plugins/vuelidate'
  ],
  axios: {},
  apollo: {
    errorHandler (error) {
        console.error(error.message);
    },
    clientConfigs: {
        default: {
            httpEndpoint: 'http://localhost:4000/graphql',
            wsEndpoint: 'ws://localhost:4080/graphql',
        },
    }
  }
}
