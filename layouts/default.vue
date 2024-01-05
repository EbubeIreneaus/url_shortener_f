<script  setup>
const b_end = ref('https://isls.vercel.app/')
const f_end = ref('https://isls.netlify.app/')

provide('url', {b_end, f_end})

onMounted(() => {

})

</script>

<template>
    <main class="min-h-screen">
        <header class="bg-slate-200 h-[70px] sticky top-0 shadow-md shadow-black/50">
            <nav class="flex py-3 w-full h-full relative">
                   <ul class="flex  items-center justify-center gap-5 w-full text-black/50">
                    <NuxtLink to="/" ><li class="hover:text-slate-900">Home</li></NuxtLink>
                    <NuxtLink to="/qr-code"><li class="hover:text-slate-900">Qr Code Generator</li></NuxtLink>
                </ul> 
            </nav>
        </header>
        <slot></slot>
    </main>
</template>

<style lang="sass" scoped>
    @import '~/assets/var'

            
</style>
