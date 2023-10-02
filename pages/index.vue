<script  setup>
const uglyLink = ref('')
let tooltipout
const { b_end, f_end } = inject('url')

let shortenedlink = ref(null)

const shortenLink = async () => {
    if (uglyLink.value.startsWith('http://') == false && uglyLink.value.startsWith('https://') == false) {
        alert("link must start with http://")

        return
    }
    const { data, error } = await useFetch(`${b_end.value}isllinks/`, {
        method: 'post', body: { 'link': uglyLink.value }
    })
    if (data.value.status == 'success') {

        shortenedlink.value = {
            'qr_src': data.value.src,
            'key': data.value.key,
            'link': data.value.link
        }
    }

}
const copy_url = (e) => {
    navigator.clipboard.writeText(`${f_end.value + shortenedlink.value.key}`)
    let tooltip = document.querySelector('.tooltip')
    tooltip.classList.add('tooltip-show')
    tooltipout = setTimeout(() => {
        tooltip.classList.remove('tooltip-show')
    }, 1500)

}
onUnmounted(() => {
    clearTimeout(tooltipout)
})
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

                <div v-if="shortenedlink" class="d-flex flex-lg-row flex-column align-items-center 
                justify-content-between border result bg-light py-3">
                    <a :href="f_end + shortenedlink.key" target="_blank" :title="f_end + shortenedlink.key" class="px-3 py-2">
                       {{ f_end }} {{ shortenedlink.key }}
                    </a>
                    <div class="px-3 text-dark d-flex gap-2 ">


                        <a :href="`${b_end + shortenedlink.qr_src}`" target="_blank">
                            <i class="fa-solid fa-qrcode p-1"></i>
                        </a>

                        <!-- <NuxtLink :to="`stats/${shortenedlink.key}`">
                            <i class="fa-solid fa-chart-simple p-1"></i>
                        </NuxtLink> -->
                        <div class="position-relative copy-icon">
                            <a href="#" @click="copy_url($event)"><i class="fa-solid fa-copy p-1"></i>
                            </a>
                            <span class="tooltip">copied</span>
                        </div>
                    </div>
                </div>
                <br>
                <p>By clicking Shorten URL, you agree to ISL's Terms of Use, Privacy Policy and Cookie Policy</p>

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
                
    .tooltip
        visibility: hidden
        width: 120px
        background-color: $secondary
        color: white 
        text-align: center
        padding: 5px 0
        border-radius: 6px

        /* Position the tooltip text */
        position: absolute
        z-index: 1
        bottom: 125%
        left: 50%
        margin-left: -60px

        /* Fade in tooltip */
        opacity: 0 
        transition: opacity 0.6s
        

        /* Tooltip arrow */
        &:after 
            content: ""
            position: absolute
            top: 100%
            left: 50%
            margin-left: -5px
            border-width: 5px
            border-style: solid
            border-color: #555 transparent transparent transparent
        

        /* Show the tooltip text when you mouse over the tooltip container */
    .tooltip-show 
        visibility: visible !important
        opacity: 1 !important

    @media screen and (max-width:768px)
        .center
            width: 100% !important
            padding: 20px
            border: 1px solid green
            overflow: hidden
            .form
                height: fit-content !important
                button
                    width: 100% !important
                input
                    width: 100% !important
            .result
                width: 100% !important
                border: 1px solid red !important
                

</style>
