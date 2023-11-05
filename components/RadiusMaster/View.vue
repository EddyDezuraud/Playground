<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
    outer: {
        type: [Number, String],
        default: 0
    },
    inner: {
        type: [Number, String],
        default: 0
    },
    padding: {
        type: [Number, String],
        default: 0
    }
});

const innerPadding = 4;

const outerStyle = computed(() => {
    return {
        padding: props.padding + 'px',
        borderRadius: props.outer + 'px'
    }
})

const innerStyle = computed(() => {
    return {
        borderRadius: props.inner + 'px',
        padding: innerPadding + 'px'
    }
})

const insideInnerStyle = computed(() => {
    const newVal = props.inner - innerPadding;
    return {
        borderRadius: newVal < 0 ? 0 : newVal + 'px'
    }
})
</script>


<template>
    <div :class="$style.wrapper">
        <div :class="$style.outer" :style="outerStyle">
            <div v-if="outer > 0" :class="[$style.insideOuterInfo, $style.info]" :style="{ height: outer + 'px' }">
                <RadiusMasterCounter :value="outer" />
            </div>
            <div v-if="padding > 10" :class="[$style.paddingInfo, $style.info]" :style="{ height: padding + 'px' }">
                <RadiusMasterCounter :value="padding" />
            </div>
            <div :class="$style.inner" :style="innerStyle">
                <div :class="$style.insideInner" :style="insideInnerStyle">
                    <div v-if="inner > 0" :class="[$style.insideInnerInfo, $style.info]" :style="{ height: inner + 'px' }">
                        <RadiusMasterCounter :value="inner" />
                    </div>
                    <img src="~/assets/images/radius-master/logo.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<style module>
.outer {
    width: 400px;
    max-width: 100%;
    aspect-ratio: 1;
    box-sizing: border-box;
    background: linear-gradient(180deg, #ffffff20, #ffffff10);
    position: relative;
    box-shadow: inset 0px 5px 5px #ffffff30, inset 0px 2px 0px #ffffff30, 0 0 10px black;
    transition: border-radius 0.3s, padding 0.3s;
    overflow: hidden;
}

.outer::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 0;
    border-radius: inherit;
    background: url("~/assets/images/radius-master/pattern-center.svg");
    background-size: 100% 100%;
    opacity: 0.05;
    transition: border-radius 0.3s, width 0.3s;
}

.inner {
    width: 100%;
    height: 100%;
    position: relative;
    background: linear-gradient(45deg, #785ABB 0%, #F3F0F9 100%);
    box-sizing: border-box;
    box-shadow: 0 0 10px 5px #a780ff50;
    transition: border-radius 0.3s, width 0.3s, height 0.3s;
}

.insideInner {
    background: #0F0F17;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 8px 4px #a780ff50;
    display: flex;
    align-content: center;
    justify-content: center;
    position: relative;
    transition: border-radius 0.3s, width 0.3s, height 0.3s;
}

.insideInner img {
    width: 100px;
}

.info {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 900;
    font-size: 11px;
    aspect-ratio: 1;
    z-index: 2;
    top: 0;
    transition: border-radius 0.3s, width 0.3s, height 0.3s;
}

.paddingInfo {
    left: 50%;
    transform: translateX(-50%);
    background: #96FF4330;
    color: #96FF43;
}

.insideInnerInfo {
    left: 0;
    background: #9674E230;
    color: #9674E2;
    border-radius: inherit;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
}

.insideOuterInfo {
    left: 0;
    background: #FF1D5330;
    color: #FF1D53;
    border-radius: inherit;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    z-index: 0;
}
</style>