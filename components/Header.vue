<script setup>

const pageMode = ref(false);
const route = useRoute()
const onChangeState = ref(false);
let timerA = null;
let timerB = null;
const init = ref(false);

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

onMounted(() => {
    initPageMode(true)
})

watch(() => route.path, () => {
    initPageMode(false);
})

</script>

<template>
    <header :class="[$style.wrapper, { [$style.page]: pageMode }, { [$style.removing]: onChangeState }]">
        <div v-if="init" class="global" :class="$style.inner">
            <nuxt-link to="/" :class="[$style.backLink, $style.pageOnly]">
                <svg viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l14 0"></path>
                    <path d="M5 12l4 4"></path>
                    <path d="M5 12l4 -4"></path>
                </svg>
                Back to the playgrounds
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
    padding: 20px;
    width: 100%;
    z-index: 99999;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
    border-radius: 8px;
    /* border: solid 1px #FFFFFF10; */
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
</style>