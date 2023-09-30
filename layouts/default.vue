<script  setup>

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
                    <router-link to="/"><li>Home</li></router-link>
                    <router-link to="/qr-code"><li>Qr Code Generator</li></router-link>
                    <router-link to="/stats"><li>Stats</li></router-link>
                </ul> 
                 <ul class=" d-flex flex-column justify-content-center gap-1 w-100 nav-mobile bg">
                    <router-link to="/"><li>Home</li></router-link>
                    <router-link to="/qr-code"><li>Qr Code Generator</li></router-link>
                    <router-link to="/stats"><li>Stats</li></router-link>
                </ul>
            </nav>
        </header>
        <slot></slot>
    </main>
</template>

<style lang="sass" scoped>
    @import '~/assets/var'
   main
  
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
