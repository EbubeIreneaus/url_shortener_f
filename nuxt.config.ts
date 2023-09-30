// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css:[
    '@fortawesome/fontawesome-free/css/all.css', 'bootstrap/dist/css/bootstrap.css', '~/assets/main.sass', 
  ],
  app:{
    head:{
      title:'Url Shortener'
    }
  }
})
