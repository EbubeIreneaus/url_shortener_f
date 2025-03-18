<script setup>
const config = useRuntimeConfig();
const uglyLink = ref("");
let tooltipout;
const { b_end, f_end } = inject("url");

let shortenedlink = reactive({
  display: false,
  qr_src: "",
  link: "",
});

async function shortenLink(e) {
  e.target.disabled = true;
  if (
    !uglyLink.value.startsWith("http://") &&
    !uglyLink.value.startsWith("https://")
  ) {
    alert("link must start with http://");
    return;
  }
  try {
    const req = await $fetch(`${config.public.api}/isllinks/`, {
      method: "post",
      body: { link: uglyLink.value },
    });
    if (req.status == "success") {
      shortenedlink.display = true;
      shortenedlink.qr_src = req.qr_src;
      shortenedlink.link = req.shortened_link;
      return;
    }
    alert(
      "could not perform this request at the moment!! \n status: server error"
    );
  } catch (error) {
    console.log(error);
    alert(
      "could not perform this request at the moment!! \n status: server error"
    );
  } finally {
    e.target.disabled = false;
  }
};
const copy_url = (e) => {
  navigator.clipboard.writeText(`${shortenedlink.link}`);
  let tooltip = document.querySelector(".tooltip");
  tooltip.classList.add("tooltip-show");
  tooltipout = setTimeout(() => {
    tooltip.classList.remove("tooltip-show");
  }, 1500);
};
onUnmounted(() => {
  clearTimeout(tooltipout);
});
</script>

<template>
  <div class="py-10 bg-slate-200 min-h-screen text-black/60">
    <div
      class="w-full md:w-[70%] mx-auto grid content-center min-h-[calc(100vh-70%)] p-[20px] md:p-5 overflow-hidden"
    >
      <div class="text-center">
        <h2>Free URL Shortener</h2>
        <p>
          isl.app is a free tool to shorten URLs powered by Ireneaus Short Link.
          Create short &amp; memorable links in seconds.
        </p>
        <div class="flex lg:flex-row flex-col gap-1 form">
          <input
            type="url"
            class="flex-grow py-3 ps-3 outline-none border"
            v-model="uglyLink"
            id=""
            placeholder="Enter Link Here"
          />
          <button
            type="button"
            class="w-fit px-10 bg-slate-950 text-white hover:bg-slate-900 py-3 group"
            @click="shortenLink($event)"
          >
            <i
              class="fa fa-spinner animate-spin !hidden group-disabled:!inline-block"
            ></i>
            Shorten URL
          </button>
        </div>
        <br />

        <div
          v-if="shortenedlink.display"
          class="flex lg:flex-row flex-col items-center justify-between border ring-2 bg-white/80 py-3"
        >
          <a
            :href="shortenedlink.link"
            target="_blank"
            :title="shortenedlink.link"
            class="px-3 py-2"
          >
            {{ shortenedlink.link }}
          </a>
          <div class="px-3 text-black/70 flex gap-2">
            <a :href="`${shortenedlink.qr_src}`" target="_blank">
              <i class="fa-solid fa-qrcode p-1"></i>
            </a>

            <div class="relative copy-icon">
              <a href="#" @click="copy_url($event)"
                ><i class="fa-solid fa-copy p-1"></i>
              </a>
              <span class="tooltip">copied</span>
            </div>
          </div>
        </div>
        <br />
        <p>
          By clicking Shorten URL, you agree to ISL's Terms of Use, Privacy
          Policy and Cookie Policy
        </p>

        <div
          class="rounded-lg p-[50px] mt-20 shadow-md shadow-black/50 text-start"
        >
          <small class="font-semibold">
            ISL URL Shortener for transforming long, ugly links into nice,
            memorable and trackable short URLs. Use it to shorten links for any
            social media platforms, blogs, SMS, emails, ads, or pretty much
            anywhere else you want to share them. Twitter, Facebook, YouTube,
            Instagram, WhatsApp, emails, SMS, videos. isl.app is the best free
            alternative to generic URL shorteners like bitly and tinyurl.
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '~/assets/var'

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
        .result
            width: 100% !important
            border: 1px solid red !important
</style>
