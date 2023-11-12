
<script setup>
import { defineProps, ref } from 'vue'

const videoHtml = ref(null)
const cursorStyle = ref({ transform: 'translateX(0) translateY(0)' })

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
    date: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
})

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formatted = date.toLocaleDateString("en-US", options);

    const day = date.getDate();
    const suffix = getDaySuffix(day);

    return formatted.replace(/\b\d+\b/, match => `${match}${suffix}`);
};

const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
        return "th";
    }
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

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

const onMouseMove = (e) => {
    cursorStyle.value.transform = `translateX(${e.offsetX}px) translateY(${e.offsetY}px)`
}
</script>

<template>
    <NuxtLink :to="'craft/' + link" :class="$style.wrapper" @mousemove="onMouseMove">
        <div :class="$style.effect">
            <div :class="$style.roundEffect" :style="cursorStyle"></div>
        </div>
        <div :class="$style.inner">
            <div :class="$style.image">
                <video autoplay loop :class="$style.backgroundVideo">
                    <source :src="'media/' + video" type="video/mp4">
                </video>
                <video :class="$style.imageVideo">
                    <source :src="'media/' + video" type="video/mp4">
                </video>
            </div>
            <div :class="$style.content">
                <div :class="$style.contentSide">
                    <p :class="$style.title">
                        {{ title }}
                    </p>
                    <span :class="$style.date">{{ formatDate(date) }}</span>
                </div>
                <div :class="$style.contentSide">
                    <svg :class="$style.rightArrow" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 12l14 0"></path>
                        <path d="M15 16l4 -4"></path>
                        <path d="M15 8l4 4"></path>
                    </svg>
                </div>
            </div>

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
    width: 100%;
    position: relative;
}

.effect {
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 12px;
    overflow: hidden;
    pointer-events: none;
    width: 100%;
    height: 100%;
}

.roundEffect {
    position: absolute;
    left: -125px;
    top: -125px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: radial-gradient(#FFFFFF, #FFFFFF00);
    filter: blur(10px);
    opacity: 0;
    transition: opacity 0.4s, transform 0.1s;
}

.wrapper:hover .roundEffect {
    opacity: 0.05;
}

.inner {
    position: relative;
    z-index: 14;
    pointer-events: none;
}

.image {
    display: block;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
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

.wrapper:hover .backgroundVideo {
    display: block;
}

.content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 4px 0;
}

.contentSide {
    display: flex;
    flex-direction: column;
}

.title {
    font-size: 16px;
    font-weight: 700;
}

.date {
    font-size: 12px;
    opacity: 0.5;
}

.rightArrow {
    width: 20px;
    opacity: 0;
    transform: translateX(0px);
    transition: opacity 0.3s, transform 0.3s;
}

.wrapper:hover .rightArrow {
    opacity: 1;
    transform: translateX(0);
}
</style>