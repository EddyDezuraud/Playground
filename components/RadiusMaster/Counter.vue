<script setup>
import { defineProps, watch, ref, onMounted } from 'vue';

const props = defineProps({
    value: {
        type: Number,
        default: 0
    }
});

const currentNumber = ref(0);
const anim = ref(false);
let animTimer = null;

watch(() => props.value, (newVal) => {
    currentNumber.value = newVal;


    if (animTimer === null) {
        anim.value = true

        animTimer = window.setTimeout(() => {
            anim.value = false;
            clearTimeout(animTimer)
            animTimer = null;
        }, 500);
    }
});

onMounted(() => {
    currentNumber.value = props.value;
})

const currentStyle = () => {

}

</script>

<template>
    <div :class="$style.wrapper">
        <div :class="[$style.current, { [$style.anim]: anim }]" :style="currentStyle">
            <span>
                {{ currentNumber }}
            </span>
        </div>
    </div>
</template>


<style module>
.wrapper {
    width: 75%;
    text-align: center;
}


.current {
    font-weight: 800;
}


.anim {
    animation: currentAnim 0.5s ease;
    animation-fill-mode: both;
}

@keyframes currentAnim {
    0% {
        transform: scale(1);
    }

    30% {
        transform: scale(0.6);
    }

    80% {
        transform: scale(1.3);
    }

    100% {
        transform: scale(1);
    }
}
</style>