<script setup>
import { onMounted, ref } from 'vue';

const outer = ref(65);
const inner = ref(30);
const padding = ref(35);
const isMounted = ref(false)

const onChangeOuter = (e) => {
    outer.value = parseInt(e);
    const newVal = parseInt(e) - padding.value;
    inner.value = newVal > 0 ? newVal : 0;
}

const onChangeInner = (e) => {
    inner.value = parseInt(e);
    outer.value = parseInt(e) + padding.value;
}

const onChangePadding = (e) => {
    padding.value = parseInt(e);
    const newVal = outer.value - parseInt(e);
    inner.value = newVal > 0 ? newVal : 0;
}

const showOnboarding = ref(true);

onMounted(() => {
    window.setTimeout(() => {
        isMounted.value = true;
        window.setTimeout(() => {
            showOnboarding.value = false;
        }, 1000)
    }, 500)

})

</script>


<template>
    <div :class="$style.wrapper">
        <RadiusMasterOnboarding v-if="showOnboarding" :isMounted="isMounted" />
        <div v-else :class="$style.inner">
            <header :class="$style.header">
                <div :class=$style.logo>
                    <img src="~/assets/images/radius-master/logo-large.svg" alt="">
                </div>
            </header>
            <div :class="$style.wrapperItems">
                <RadiusMasterView :class="$style.view" :inner="inner" :padding="padding" :outer="outer" />
            <RadiusMasterSliders :class="$style.sliders" :inner="inner" :padding="padding" :outer="outer"
                @inner="onChangeInner" @outer="onChangeOuter" @padding="onChangePadding" />
            </div>

            <div :class="$style.codeInfo">
                <span :class="$style.outerColor">--outer-radius</span>: {{ outer }}px<br/>
                <span :class="$style.paddingColor">--outer-padding</span>: {{ padding }}px<br/>
                <span :class="$style.innerColor">--inner-radius</span>: calc(var(<span :class="$style.outerColor">--outer-radius</span>) - var(<span :class="$style.paddingColor">--outer-padding</span>));
            </div> 
           
        </div>

    </div>
</template>


<style module>
.wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    padding-top: 70px;
    box-sizing: border-box;
    position: relative;
}

.wrapper::before {
    position: absolute;
    content: '';
    width: 1200px;
    aspect-ratio: 1;
    top: -600px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    background: radial-gradient(#8A64DB, #8A64DB00, #8A64DB00);
    opacity: 0.1;
    pointer-events: none;
}



.wrapperItems {
    display: flex;
    align-items: center;
    gap: 40px;
    padding-top: 120px;
}

.header {
    position: absolute;
    top: 100px;
    width: 100%;
    left: 0;
    display: flex;
    justify-content: center;
    display: none;
}

.logo {
    display: flex;
    align-content: center;
    gap: 10px;
    font-weight: 700;
}

.codeInfo,
.logo,
.view,
.sliders {
    animation: botEltsAppearing 0.6s ease;
}

.view {
    animation-fill-mode: backwards;
    animation-delay: 0.3s;
}

.sliders {
    animation-fill-mode: backwards;
    animation-delay: 0.4s;
}

.logo img {
    height: 35px;
}

.codeInfo {
    position: relative;
    margin: 0px auto;
    max-width: 100%;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02));
    padding: 20px;
    margin-top: 40px;
    font-size: 12px;
    line-height: 150%;
    font-weight: 500;
    animation-fill-mode: backwards;
    animation-delay: 0.5s;
}


.outerColor {
    color: #FF1D53;   
    font-weight: 700;
}

.paddingColor {
    color: rgb(150, 255, 67);
    font-weight: 700;
}

.innerColor {
    color: rgb(150, 116, 226);   
    font-weight: 700;
}

@media screen and (max-width: 1000px) {
    .wrapperItems {
        flex-direction: column;
    }
}

@keyframes topLogoAppearing {
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }

    90% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes botEltsAppearing {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    90% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>