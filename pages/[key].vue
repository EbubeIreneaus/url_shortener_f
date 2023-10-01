<script  setup>
const b_end = ref('http://127.0.0.1:8000/')
const { key } = useRoute().params

const res = await useFetch(`${b_end.value}isllinks/`, {
    params: { 'key': key }, key: key
})
if (res.data.value.status == 'success') {
    const rd = res.data.value.redirect
    if (process.client) {
        window.location.replace(rd)
    }

}

definePageMeta({
    layout:'key'
})
</script>

