<script  setup>
const uglyLink = ref('')

const url = inject('urlApi')

let shortenlink = ref(null)

const shortenLink = async () =>{
    const {data, error} = await useFetch(`${url}/isllinks/`,{
       method:'post', body: {'link': uglyLink.value}
    })
    if (data.value.status == 'success') {

        shortenlink.value = {
            'qr_src': data.value.src,
            'key': data.value.key
        }
    }
}
</script>

<template>
    <div class="main">
        <div class="center">
            <div class="text-center">
                <h2>Free URL Shortener</h2>
                <p>isl.app is a free tool to shorten URLs powered by Ireneaus Short Link. Create short & memorable links in
                    seconds.</p>
                <div class="d-flex flex-lg-row flex-column gap-2 form">
                    <input type="url" class="form-control" v-model="uglyLink" id="" placeholder="Enter Link Here">
                    <button type="button" class="btn " @click="shortenLink"> Shorten URL</button>
                </div> <br>
                <div v-if="shortenlink" class="d-flex flex-lg-row flex-column align-items-center justify-content-between border result bg-light py-3">
                    <div class="px-3 mb-lg-0 mb-2 text-dark "><b>{{uglyLink}}</b></div>
                    <div class="px-3 text-dark d-flex gap-2 ">
                        <a :href="uglyLink" target="_blank" title="goolgle.com" class="px-3">isl.netlify.app/{{shortenlink.key}}</a>
                        <a :href="url + shortenlink.qr_src"><i class="fa-solid fa-qrcode p-1"></i></a>
                        <router-link to="/stats"><i class="fa-solid fa-chart-simple p-1"></i></router-link>
                        <a href="#"><i class="fa-solid fa-copy p-1"></i></a>
                    </div>
                </div>
                <br>
                <p>By clicking Shorten URL, you agree to Rebrandly's Terms of Use, Privacy Policy and Cookie Policy</p>

                <div class="container text-start mt-5">
                    <small class="">
                        ISL URL Shortener for transforming long, ugly links into nice, memorable and trackable
                        short URLs. Use it to shorten links for any social media platforms, blogs, SMS, emails,
                        ads, or pretty much anywhere else you want to share them. Twitter, Facebook, YouTube,
                        Instagram, WhatsApp, emails, SMS, videos. isl.app is the best free alternative to generic
                        URL shorteners like bitly and tinyurl.
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
    @import '~/assets/var'
    .main
        color: $secondary
        .center
            width: 70%
            margin: auto
            display: grid
            place-items: center
            min-height: calc( 100vh - 70px )
            .form
                height: 50px
                button
                    height: 100%
                    background-color: $secondary
                    width: 30%
                    color: $primary
                input
                    width: 70%
            .container
                box-shadow: 0 0 5px 0 $secondary
                padding: 30px
                margin-top: 20px
                border-radius: 50px

    @media screen and (max-width:465px)
        .center
            width: 100% !important
            padding: 20px
            border: 1px solid green
            .form
                height: fit-content !important
                button
                    width: 100% !important
                input
                    width: 100% !important

</style>
