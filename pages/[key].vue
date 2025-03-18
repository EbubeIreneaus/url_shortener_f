<script  setup>
const config = useRuntimeConfig()
const { key } = useRoute().params

const {data} = await useFetch(`${config.public.api}/isllinks/`, {
    params: { 'key': key }, key: key
})
if (data.value.status == 'success') {
    const rd = data.value.redirect
    if (import.meta.client) {
        window.location.replace(rd)
    }

}

definePageMeta({
    layout:'key'
})
</script>

