
<script setup>
import { defineProps, ref } from 'vue'

const videoHtml = ref(null)

defineProps({
    link: {
        type: String,
        default: ''
    },
    video: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
})

const playVideo = () => {
    if (videoHtml.value) {
        videoHtml.value.play()
    }
}

const resetVideo = () => {
    if (videoHtml.value) {
        videoHtml.value.currentTime = 0
        videoHtml.value.pause()
    }
}
</script>

<template>
    <NuxtLink :to="'craft/' + link" :class="$style.wrapper">
        <div :class="$style.image">
            <video autoplay loop :class="$style.backgroundVideo">
                <source :src="'media/' + video" type="video/mp4">
            </video>
            <video :class="$style.imageVideo">
                <source :src="'media/' + video" type="video/mp4">
            </video>
        </div>
        <div :class="$style.content">
            <p :class="$style.title">
                {{ title }}
            </p>
        </div>
    </NuxtLink>
</template>

<style module>
.wrapper {
    padding: 12px;
    border-radius: 12px;
    background: hsla(256, 7%, 97%, .08);
    border: solid 1px rgba(255, 255, 255, 0.05);
    display: block;
    width: 436px;
}

.image {
    display: block;
    position: relative;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 40/26;
}

.imageVideo,
.backgroundVideo {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s;
    z-index: 1;
}

.backgroundVideo {
    display: none;
    z-index: 2;
}

.image:hover .backgroundVideo {
    display: block;
}

.content {
    padding: 12px 4px 0;
}

.title {
    font-size: 16px;
}
</style>