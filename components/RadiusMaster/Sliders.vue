<script setup>
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';

const localOuter = ref(0);
const localInner = ref(0);
const localPadding = ref(0);

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

const emits = defineEmits('outer', 'inner', 'padding');

const onChange = (name, value) => {
    emits(name, value)
}

onMounted(() => {
    localOuter.value = props.outer;
    localInner.value = props.inner;
    localPadding.value = props.padding;
})

watch(() => props.outer, (newVal) => {
    localOuter.value = newVal;
});

watch(() => props.inner, (newVal) => {
    localInner.value = newVal;
});

watch(() => props.padding, (newVal) => {
    localPadding.value = newVal;
});

</script>


<template>
    <div :class="$style.wrapper">
        <RadiusMasterInput @change="onChange('outer', localOuter)" v-model="localOuter" label="Outer" color="#FF1D53" />
        <RadiusMasterInput @change="onChange('padding', localPadding)" v-model="localPadding" label="Padding" color="#96FF43" />
        <RadiusMasterInput @change="onChange('inner', localInner)" v-model="localInner" label="Inner" color="#9674E2" />
    </div>
</template>


<style module>
.wrapper {
    position: relative;
    margin: 0px auto;
    max-width: 100%;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02));
    padding: 20px 20px 0px;
    width: 400px;
}
</style>