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
    e.target.innerHTML = '<i class="spinner-grow text-muted"></i>'
    e.target.disabled = true
    const qr_data = qr_form

    const { data, error } = await useFetch(`${b_end.value}generateQr/`, {
        method: 'post', body: qr_data
    })

    if (data.value.status == 'success') {
        e.target.innerHTML = 'generate'
        e.target.disabled = false
        qr.value = data.value.src

    } else {
        alert('failed to generate QRCode')
        e.target.innerHTML = 'generate'
        e.target.disabled = false
    }



}
</script>

<template>
    <div class="container">
        <div class="text-center text-secondary">
            <h2>Free QRCode Generator</h2>
            <p>isl.app is a free tool to generate qrcodes powered by Ireneaus Short Link. Create short & memorable links in
                seconds.</p>
        </div>
        <div class="d-flex gap-2 flex-lg-row flex-column">
            <div class="f_comp w-100">

                <button class="btn tab " @click="tab = 'url', qr_form.txt_data = ''"
                    :class="{ 'tab-active, disabled': tab == 'url' }">
                    <i class="fa fa-link"></i> url
                </button>

                <button class="btn tab" @click="tab = 'text', qr_form.txt_data = ''"
                    :class="{ 'tab-active, disabled': tab == 'text' }">
                    <i class="fa fa-pen"></i> text
                </button>

                <div class="mb-3 mt-3 form">
                    <div v-if="tab == 'url'"> <input type="text" v-model="qr_form.txt_data" class="form-control "
                            placeholder="Enter link Here"></div>
                    <div class="" v-else>
                        <label for="txt-area " class="text-secondary mb-2"> write Text here:</label>
                        <textarea class="form-control" v-model="qr_form.txt_data" placeholder="write Text here"
                            id="txt-area" rows="3">
                        </textarea>
                    </div>


                </div>

            </div>

            <div class="sec_comp w-100 border bg-light px-lg-1 px-3">
                <div class="content ">
                    <div class=" qr-code" :style="{
                        backgroundColor: qr_form.bg_color,
                    }">

                        <i class="fas fa-qrcode" :style="{ color: qr_form.fg_color }"></i>
                    </div>

                    <div class="color-picker d-flex flex-md-row flex-column border gap-2 w-100 mb-3 px-lg-3">

                        <div class="w-100">
                            <label for="">background</label>
                            <div class="input-group color-custom">
                                <input type="text" class="form-control" v-model="qr_form.bg_color">

                                <input type="color" name="" id="bgc" v-model="qr_form.bg_color" hidden>
                                <label for="bgc" class="input-group-text">
                                    <i class="fa fa-palette"></i>
                                </label>
                            </div>
                        </div>

                        <div class="w-100">
                            <label for="">foreground</label>
                            <div class="input-group color-custom">
                                <input type="text" class="form-control" v-model="qr_form.fg_color">

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

                    <button class="btn px-5 py-3 my-4 bg text-primary bg-hover-secondary" @click="generateQr($event)"
                        :class="{ 'disabled': qr_form.txt_data == '' }">Generate</button>

                </div>
            </div>
        </div>

        <div class="modal d-block " id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" 
        aria-hidden="true"  v-if="qr">
            <div class="modal-dialog modal-dialog-centered modal-dialog-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class=" btn text-primary p-3 mx-3" @click="qr = null"><i class="fa fa-close"></i></button>
                    </div>
                    <div class="modal-body p-5">
                        <img :src="b_end+qr" width="200px"
                        class="img-fluid mx-auto d-block mb-4" alt="Image">
                        <div class="text-center mt-4">
                            <a :href="b_end+qr" download class="btn bg-secondary text-primary me-2">Download</a>
                            <a :href="b_end+qr" target="_blank" class="btn btn bg-secondary text-primary">View</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="sass" scoped>
    @import '~/assets/var'

    .modal
        background-color: transparentize($bg, .5 )
        .modal-content
            background-color: $bg
            box-shadow: 0 0 10px 0 $secondary
    .container
        width: 80%
        margin: 70px auto 0 auto
        min-height: calc( 100vh - 70px )
        .f_comp
            button
                color: $primary
                padding: 5px 70px
                margin: 15px
                border: .5px solid transparentize(white, .7)
            .disabled
                background-color: transparentize($secondary, .5)
                color: $bg
            .form
                width: 80%
        .sec_comp
            .content
                display: grid
                place-items: center
                .qr-code
                    box-sizing: border-box !important
                    margin: 30px auto
                    width: 100px
                    height: 100px
                    display: grid
                    place-items: center
                    
                    i
                        font-size: 100px

                
                .color-picker
                    .color-custom
                        border: 1px solid black
                        input, label
                            border: none
                            outline: none !important
                            box-shadow: none 
                            background-color: white

    @media screen and (max-width: 768px)
        .container
            width: 100% !important
            .f_comp
                button
                    width: 45% !important
                    

           
    @media screen and (max-width: 462px)
        .container
            width: 100% !important
           
            .f_comp
                button
                    width: 100% !important
                    padding: 5px 0px !important
                    margin: 5px !important
                .form
                    width: 100%
                    
                   

    
                
</style>
