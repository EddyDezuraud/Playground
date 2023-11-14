<script setup>

const pageMode = ref(false);
const route = useRoute()
const onChangeState = ref(false);
let timerA = null;
let timerB = null;
const init = ref(false);
const blur = ref(false);

const initPageMode = (firstInit) => {
    let newVal = false

    if (route.matched && route.matched[0] && route.matched[0].path === '/craft') {
        newVal = true;
    }

    if (firstInit) {
        pageMode.value = newVal;
    } else {
        onChangeState.value = true;

        clearTimeout(timerA);

        timerA = window.setTimeout(() => {
            pageMode.value = newVal;
            onChangeState.value = false;
        }, 800)
    }

    init.value = true;
}

const handleScroll = () => {

    if (window.scrollY > 200) {
        blur.value = true;
    } else {
        blur.value = false;
    }
}


onMounted(() => {
    initPageMode(true);
    window.addEventListener("scroll", handleScroll);
})

watch(() => route.path, () => {
    initPageMode(false);
})

</script>

<template>
    <header
        :class="[$style.wrapper, { [$style.page]: pageMode }, { [$style.removing]: onChangeState }, { [$style.blur]: blur }]">
        <div v-if="init" class="global" :class="$style.inner">
            <nuxt-link to="/" :class="[$style.backLink, $style.pageOnly]">
                <svg viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l14 0"></path>
                    <path d="M5 12l4 4"></path>
                    <path d="M5 12l4 -4"></path>
                </svg>
                <span>
                    Back to the playgrounds
                </span>
            </nuxt-link>
            <img :class="[$style.logoSmallImg, $style.pageOnly]" src="~/assets/images/playground/logo.svg" alt="Playground">
            <nuxt-link to="/" :class="[$style.logo, $style.homeOnly]">
                <img :class="$style.logoImg" src="~/assets/images/playground/logo.svg" alt="Playground">
                Playground
            </nuxt-link>
            <div :class="$style.link">
                <a href="https://twitter.com/eddydsn" target="_blank">
                    @eddydsn
                </a>
            </div>
        </div>
    </header>
</template>

<style module>
.wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99999;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: backdrop-filter 0.3s;
}

.blur .inner {
    backdrop-filter: blur(5px);
}

.inner {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
}

.inner::before {
    background: rgba(255, 255, 255, 0.05);
    border: solid 1px #FFFFFF10;
    content: '';
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    border-radius: 10px;
    opacity: 0;
    transition: opacity 0.3s;
}

.blur .inner::before {
    opacity: 1;
}

.logo {
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
}

.logoImg {
    width: 60px;
    margin: -20px 0;
}

.link {
    font-size: 12px;
}

.link a {
    opacity: 0.5;
}

.link a:hover {
    opacity: 1;
}

.logoSmallImg {
    position: absolute;
    left: calc(50% - 25px);
    width: 50px;
}

.backLink {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    position: relative;
}

.backLink::before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    border-radius: 40px;
    left: -10px;
    width: calc(100% + 20px);
    border: solid 1px white;
    top: -7px;
    height: calc(100% + 14px);
    opacity: 0;
    transition: opacity 0.3s;
}

.backLink:hover::before {
    opacity: 0.3;
}

.backLink svg {
    width: 20px;
}

.wrapper:not(.page) .homeOnly,
.page .pageOnly {
    display: flex;
}

.page .homeOnly,
.wrapper:not(.page) .pageOnly {
    display: none;
}

.homeOnly,
.pageOnly {
    transition: transform 0.5s, opacity 0.5s;
    animation: appearMenu 0.5s ease;
}

.removing .homeOnly,
.removing .pageOnly {
    transform: translateY(20px) rotate(-5deg);
    opacity: 0;
}

.logoSmallImg {
    transition-delay: 0.2s;
    animation-delay: 0.2s;
    animation-fill-mode: backwards;
}

@keyframes appearMenu {
    0% {
        opacity: 0;
        transform: translateY(-20px) rotate(-5deg);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@media screen and (max-width: 800px) {
    .backLink>span {
        display: none;
    }

    .logo {
        font-size: 10px;
    }

    .logoImg {
        width: 30px;
    }
}
</style>