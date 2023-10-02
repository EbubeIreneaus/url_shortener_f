<script  setup>
const b_end = ref('https://isl.up.railway.app/')
const f_end = ref('http://isl.netlify.app/')
provide('url', {b_end, f_end})

onMounted(() => {
    document.getElementById('nav-btn').addEventListener('click', ()=>{
    document.querySelector('.nav-mobile').classList.toggle('nav-mobile-show')
    })
})

</script>

<template>
    <main class="bg">
        <header class="bg">
            <nav class="d-flex py-3 w-100 ">
                <div class="w-100 d-md-none">
                    <button class="btn  me-2 float-end" id="nav-btn">
                    <i class="fa fa-bars text-secondary float-end"></i></button>
                </div>

                <ul class="d-md-flex d-none align-items-center justify-content-center  w-100">
                    <NuxtLink to="/"><li>Home</li></NuxtLink>
                    <NuxtLink to="/qr-code"><li>Qr Code Generator</li></NuxtLink>
                </ul> 
                 <ul class=" d-flex flex-column justify-content-center gap-1 w-100 nav-mobile bg">
                    <NuxtLink to="/"><li>Home</li></NuxtLink>
                    <NuxtLink to="/qr-code"><li>Qr Code Generator</li></NuxtLink>
                    
                </ul>
            </nav>
        </header>
        <slot></slot>
    </main>
</template>

<style lang="sass" scoped>
    @import '~/assets/var'
   main
    min-height: 100vh
    header
        height: 70px !important
        position: sticky
        top: 0
        box-shadow: 0 0 10px 0 $secondary
        nav
            height: 100%
            position: relative
            
            .nav-mobile
                position: absolute
                top: 70px
                height: 0
                opacity: 0
                overflow-y: hidden
                transition: all .5s ease !important
                box-shadow: 0 0 10px 0 $secondary
                li
                    text-align: center 

            .nav-mobile-show
                height: 200px!important
                opacity: 1
            ul
                margin-bottom: 0
                padding: 0
                li
                    list-style-type: none
                    padding: 10px 10px
                    color: $primary
                    &:hover
                        color: $secondary
</style>
