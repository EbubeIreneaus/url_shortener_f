<script  setup>
const tab = ref('url')
const { b_end, f_end } = inject('url')
const qr_form = reactive({
    'txt_data': '',
    'fg_color': '#000000',
    'bg_color': '#ffffff',
    'border_size': 1
})
const qr = ref(null)
const generateQr = async (e) => {
    e.target.innerHTML = '<i class="fa fa-spinner animate-spin"></i>'
    e.target.disabled = true
    const qr_data = qr_form

    const { data, error } = await useFetch(`${b_end.value}generateQr/`, {
        method: 'post', body: qr_data, watch: false
    })

    if (data.value.status == 'success') {
        e.target.innerHTML = 'generate'
        e.target.disabled = false
        qr.value = data.value.qr_src

    } else {
        alert('failed to generate QRCode')
        e.target.innerHTML = 'generate'
        e.target.disabled = false
    }



}
</script>

<template>
    <div class="w-full md:w-[80%] mx-auto grid content-center min-h-[calc(100vh-70%)] p-[20px] md:p-5 overflow-hidden">
        <div class="text-center text-black/60 py-10">
            <h2>Free QRCode Generator</h2>
            <p>isl.app is a free tool to generate qrcodes powered by Ireneaus Short Link. Create short & memorable links in
                seconds.</p>
        </div>
        <div class="flex gap-2 lg:flex-row flex-col">
            <div class=" w-full text-white p-3">

                <button class="bg-slate-950 py-2 px-20 w-full md:w-fit border hover:bg-slate-800 tab me-7"
                    @click="tab = 'url', qr_form.txt_data = ''"
                    :class="{ 'disabled ring-2 ring-orange-500': tab == 'url' }">
                    <i class="fa fa-link"></i> url
                </button>

                <button class="bg-slate-950 py-2 px-20 w-full md:w-fit border hover:bg-slate-800 tab"
                    @click="tab = 'text', qr_form.txt_data = ''"
                    :class="{ 'disabled ring-2 ring-orange-500': tab == 'text' }">
                    <i class="fa fa-pen"></i> text
                </button>

                <div class="mb-3 mt-7 w-full md:w-[80%] text-black/50">
                    <div v-if="tab == 'url'">
                        <input type="text" v-model="qr_form.txt_data" class="outline-none border py-3 ps-4 w-full "
                            placeholder="Enter link Here">
                    </div>
                    <div class="" v-else>
                        <label for="txt-area " class="text-secondary mb-2"> write Text here:</label>
                        <textarea class="w-full border outline-none p-4" v-model="qr_form.txt_data"
                            placeholder="write Text here" id="txt-area" rows="3">
                        </textarea>
                    </div>


                </div>

            </div>

            <div class="sec_comp w-100 border bg-light px-lg-1 px-3">
                <div class=" grid content-center place-content-center place-items-center">
                    <div class=" qr-code py-1 my-4 px-1   " :style="{
                        backgroundColor: qr_form.bg_color,
                    }">

                        <i class="fas fa-qrcode text-[110px]" :style="{ color: qr_form.fg_color }"></i>
                    </div>

                    <div class="color-picker flex md:flex-row flex-col py-3 gap-2 w-full mb-3  lg:px-3">

                        <div class="w-full">
                            <label for="">background</label>
                            <div class="flex color-custom border px-1 py-1">
                                <input type="text" class="flex-grow outline-none  px-1" v-model="qr_form.bg_color">

                                <input type="color" name="" id="bgc" v-model="qr_form.bg_color" hidden>
                                <label for="bgc" class="input-group-text">
                                    <i class="fa fa-palette"></i>
                                </label>
                            </div>
                        </div>

                        <div class="w-full">
                            <label for="">foreground</label>
                            <div class="flex color-custom border px-1 py-1">
                                <input type="text" class="flex-grow outline-none  px-1" v-model="qr_form.fg_color">

                                <input type="color" name="" id="fgc" v-model="qr_form.fg_color" hidden>
                                <label for="fgc" class="input-group-text">
                                    <i class="fa fa-palette"></i>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="w-100  d-flex align-items-center gap-1 p-lg-3 ">
                        <div>
                            <small>margin</small>
                            <button class="btn px-4 py-1 disabled">{{ qr_form.border_size }}</button>
                        </div>

                        <input type="range" min="0" max="10" step="1" v-model="qr_form.border_size" class="form-range">

                    </div>

                    <button
                        class="btn px-10 py-3 my-4 bg-slate-950 text-white hover:bg-slate-800 disabled:cursor-not-allowed"
                        @click="generateQr($event)" :disabled="qr_form.txt_data == ''">Generate</button>

                </div>
            </div>
        </div>

        <div class="fixed w-full h-screen top-0 flex items-center justify-center left-0 bg-black/30" v-if="qr">

            <div class="bg-slate-900 max-w-md w-full">
                <div class="modal-header">
                    <button class=" btn text-primary p-3 mx-3" @click="qr = null"><i class="fa fa-close"></i></button>
                </div>
                <div class="modal-body p-5">
                    <img :src="qr" width="200" class="img-fluid mx-auto d-block mb-4" alt="Image">
                    <div class="text-center mt-4">
                        <a :href="qr" download class=" me-2 text-slate-200 hover:text-slate-900">Download</a>
                        <a :href="qr" target="_blank" class="text-slate-200 hover:text-slate-900">View</a>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<style lang="sass" scoped>
    @import '~/assets/var'
             
</style>
