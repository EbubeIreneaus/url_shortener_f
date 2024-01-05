// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css:[
    '@fortawesome/fontawesome-free/css/all.css', '~/assets/main.css',  '~/assets/main.sass', 
  ],
  app:{
    head:{
      title:'Url Shortener'
    }
  }
})
