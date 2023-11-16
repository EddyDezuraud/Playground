<script setup>
import codes from '~/assets/data/codes/space-button.js';

useHead({
    title: "Eddy's Playground : Dropdown"
})

const height = ref(0);
const transform = ref('translateY(0)');
const color = ref('currentColor');
const opacity = ref(0);

const itemColor = computed((item) => {
    if (item.color) return { color: item.color }
    return {}
})

const onMouseEnter = ($event, item) => {
    if (item.color) {
        color.value = item.color;
    } else {
        color.value = 'currentColor';
    }
    transform.value = `translateY(${$event.currentTarget.offsetTop}px)`;
    height.value = $event.currentTarget.offsetHeight + 'px';
    opacity.value = 0.1;
}

const onMouseLeave = () => {
    opacity.value = 0;
}

</script>

<template>
    <div :class="[$style.wrapper, { [$style.dark]: dark }]">
        <div :class="$style.inner" @mouseleave="onMouseLeave">
            <ul :class="$style.list">
                <li v-for="(item, index) in list" :key="index" :style="itemColor(item)"
                    :class="[$style.item, { [$style.topSeparator]: item.topSeparator }]" @click="$emit('click', item.id)"
                    @mouseenter="onMouseEnter($event, item)">
                    <component :is="item.icon + '-icon'" :class="$style.icon" />
                    <span>{{ item.label }}</span>
                </li>
            </ul>
            <div :class="$style.highlighter" :style="highlighter"></div>
        </div>
    </div>
</template>

<style module>
.wrapper {
    background: white;
    color: black;
    border-radius: 10px;
    padding: 10px;
    width: 280px;
}

.inner {
    position: relative;
}

.item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 8px;
    font-weight: 600;
    font-size: 14px;
    border-radius: 6px;
    position: relative;
    z-index: 2;
    cursor: pointer;
    transform: translateZ(0);
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
}

.topSeparator {
    margin-top: 5px;

    &::before {
        position: absolute;
        content: '';
        top: -3px;
        left: 0;
        width: 100%;
        height: 1px;
        background: #EBEEF1;
    }
}

.icon {
    font-size: 18px;
}

.highlighter {
    position: absolute;
    top: 0;
    width: 100%;
    background: currentColor;
    opacity: 0.1;
    border-radius: 6px;
    z-index: 0;
    transition: transform 0.15s, opacity 0.15s;
}

.list {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
}


.dark {
    background: rgb(19, 19, 21);
    color: white;
    box-shadow: rgb(0 0 0 / 12%) 0px 12px 12px, 0 0 0 1px rgba(255, 255, 255, 0.12);

    .item {
        font-weight: 500;
    }

    .topSeparator ::before {
        position: absolute;
        content: '';
        top: -3px;
        left: 0;
        width: 100%;
        height: 1px;
        background: #2c2f31;
    }
}
</style>