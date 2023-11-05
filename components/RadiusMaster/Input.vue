<script setup>

import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: [Number, String],
        default: 0
    },
    label: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: '#ff6666'
    }
});

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emits('update:modelValue', parseInt(value))
    }
});

const min = 0;
const max = 100;

const emits = defineEmits('change', 'update:modelValue');

const onChange = (e) => {
    emits('change', e)
}

const onIncrement = () => {
    const newVal = parseInt(props.modelValue) + 1
    emits('update:modelValue', newVal);
    onChange(newVal);
}

const onDecrement = () => {
    const newVal = parseInt(props.modelValue) - 1
    emits('update:modelValue', newVal);
    onChange(newVal);
}

</script>

<template>
    <div :class="$style.wrapper" :style="{ color: color }">
        <div :class="$style.upper">
            <span :class="$style.label">
                {{ label }}
            </span>
            <div :class="$style.counter" :data-content="value ? value : ''">
                <button :class="[$style.button, $style.minus]" @click="onDecrement"> {{ '-' }} </button>
                <input type="number" @input="onChange" v-model="value" :min="min" :max="max" :step="1" />
                <button :class="[$style.button, $style.plus]" @click="onIncrement"> {{ '+' }} </button>
            </div>
        </div>
        <div :class="$style.rangeWrapper">
            <!-- <input type="range" @input="onChange" v-model="value" :min="min" :max="max" /> -->
            <v-slider :color="color" v-model="value" @update:model-value="onChange"></v-slider>
        </div>
    </div>
</template>

<style module>
.wrapper {
    display: block;
    margin-bottom: 20px;
}

.upper {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.label {
    padding: 4px 6px;
    border-radius: 4px;
    background: rgba(255, 255, 255, .05);
    font-size: 12px;
    font-weight: 700;
    text-shadow: 0 0 15px currentColor;
}

.rangeWrapper {
    display: flex;
    width: 100%;
}

.rangeWrapper input {
    width: 100%;
}

.counter {
    display: flex;
    position: relative;
}

.counter::after,
.counter::before {
    position: absolute;
    content: '';
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    height: 100%;
    width: 40px;
    pointer-events: none;
    border: solid 1px currentColor;
    box-sizing: border-box;
    border-radius: 0px;
    box-shadow: inset 0 -10px 10px currentColor;
    opacity: 0.1;
}

.counter::after {
    border: none;
    z-index: 999;
    opacity: 0.99;
    content: attr(data-content);
    color: white;
    box-shadow: none;
    font-size: 12px;
    letter-spacing: 1.2px;
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    filter: blur(2px);
    opacity: 0.1;
    overflow: hidden;
}

input[type="number"] {
    background: rgba(255, 255, 255, .05);
    border-radius: 0px;
    border: none;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    appearance: none;
    box-shadow: inset 0px 5px 10px #00000050;
    font-size: 12px;
    padding: 12px 0px;
    width: 40px;
    letter-spacing: 1.2px;
    box-sizing: border-box;
    color: currentColor;
    font-weight: 700;
    border: solid 1px transparent;
    margin: 0;
}

input[type="number"]:focus {
    outline: none;
    border: solid 1px currentColor;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    appearance: none;
}

.counter {
    align-items: center;
}

.button {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0.05));
    border-radius: 10px 0 0 10px;
    height: 42px;
    padding: 0 10px;
    box-shadow: -1px 0px rgba(255,255,255,0.1), 0px -1px rgba(255,255,255,0.1), 0px 1px rgba(255,255,255,0.1);
    transition: box-shadow 0.3s;
    position: relative;
    width: 35px;
    box-sizing: border-box;
}
.button::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 10px;
    box-shadow: inset 0 -5px 6px black;
    opacity: 0;
    transition: opacity 0.3s;
}

.plus {
    border-radius: 0 10px 10px 0;
    box-shadow: 1px 0px rgba(255,255,255,0.1), 0px -1px rgba(255,255,255,0.1), 0px 1px rgba(255,255,255,0.1);
}

.button:hover::before {
    opacity: 0.5;
}
</style>