<script setup>
const raysNumber = ref(0)
const wrapperRef = ref(null);
const rays = ref([]);
const minRotate = -50;
const maxRotate = 50;

const randomRotation = () => {
    return Math.random() * (maxRotate - minRotate) + minRotate;
}

const randomOpacity = () => {
    return Math.random() * (1 - 0.5) + 0.5;
}

const initRaysNumber = () => {
    const nb = Math.floor(wrapperRef.value.offsetWidth / 20);
    rays.value.splice(0, rays.value.length);
    for (let i = 0; i < nb; i++) {
        rays.value.push({
            rotate: randomRotation(),
            opacity: randomOpacity()
        })
    }
}

const randomClass = () => {
    const classes = ['ray1', 'ray2', 'ray3'];
    const x = Math.floor(Math.random() * (2 - 0) + 0);
    return classes[x];
}

const randomDelay = () => {
    return Math.random() * (6 - 0) + 0;
}

const leftPosition = (xVal) => {
    return (((wrapperRef.value.offsetWidth / 2) - 5) + (-2 * (xVal * (wrapperRef.value.offsetWidth / 100))))
}

onMounted(() => {
    initRaysNumber();
})
</script>

<template>
    <div :class="$style.wrapper" ref="wrapperRef">
        <div v-for="(ray, index) in rays" :key="index" :class="[$style.ray, $style[randomClass()]]" :style="{
            opacity: ray.opacity,
            transform: 'rotate(' + ray.rotate + 'deg) translateY(-50%)',
            left: leftPosition(ray.rotate) + 'px'
        }">
            <div :class="$style.innerRay" :style="{ animationDelay: randomDelay() + 's' }">
                <div :class="$style.innerRayLayers"></div>
            </div>
        </div>
    </div>
</template>


<style module>
.wrapper {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
    overflow: hidden;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    filter: blur(10px);
}

.wrapper::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    overflow: hidden;
    left: 0;
    top: 0;
    z-index: 9;
    background: linear-gradient(360deg, rgba(19, 10, 29, 1),  rgba(64, 32, 100, 0), rgba(64, 32, 100, 0));
}

.ray {
    height: 300%;
    width: 22px;
    background: linear-gradient(rgb(226, 59, 218, 0.1), rgba(250, 112, 255, 0.05));
    position: absolute;
    top: -50%;
    left: calc(50% - 11px);
    transform-origin: center;
    transition: opacity 1.2s;
}

.wrapper:hover .ray {
    opacity: 1!important;
}

.ray1 {
    opacity: 0!important;
}


.innerRayLayers,
.innerRay {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    top: 0;
    left: 0;
    overflow: hidden;
}

.innerRay::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 50%;
    top: 50%;
    background: linear-gradient(transparent, rgba(32, 17, 49, 1));
    z-index: 8;
}

.innerRayLayers {
    border-radius: 0;
    width: auto;
    aspect-ratio: 1;
    overflow: visible;
    left: 50%;
    transform: translateX(-50%);
    background: #ac54ff;
}

.innerRayLayers::after,
.innerRayLayers::before {
    position: absolute;
    content: '';
    height: 50%;
    width: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(#51229c, transparent);
    animation: innerLayerAnim 4s linear infinite;
}

.innerRayLayers::after {
    opacity: 1;
    height: 50%;
    transform: translateY(-50%);
    animation: none;
    background: radial-gradient(rgb(226, 59, 218), transparent);
}

.ray1 .innerRay {
    animation: xTransformRay 10s ease infinite;
    animation-fill-mode: both;
}


.ray1 .innerRayLayers::before {
    animation-delay: 1s;
    animation: innerLayerAnim 2s linear infinite;
    background: radial-gradient(rgba(226, 59, 218, 0.2), transparent);
}

.ray2 .innerRay {
    animation: xTransformRay2 10s ease infinite;
    animation-fill-mode: both;
}

.ray2 .innerRayLayers::before {
    animation-delay: 2s;
    animation: innerLayerAnim 6s linear infinite;
    background: radial-gradient(#7e5eb1, transparent);
}


@keyframes xTransformRay {

    100%,
    0% {
        transform: translateX(0);
        opacity: 0;
    }

    30% {
        opacity: 1;
    }

    50% {
        transform: translateX(-40px);
    }

    70% {
        opacity: 0;
    }
}


@keyframes xTransformRay2 {

    100%,
    0% {
        transform: translateX(0);
        opacity: 0;
    }

    30% {
        opacity: 1;
    }

    90% {
        transform: translateX(40px);
        opacity: 0;
    }
}

@keyframes innerLayerAnim {

    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(200%);
    }
}


@keyframes infiniteRotation {
    0% {
        transform: rotate(0deg) translateX(-50%);
    }

    100% {
        transform: rotate(360deg) translateX(-50%);
    }
}

@keyframes colorAnim1 {

    0%,
    100% {
        background-color: rgb(120, 48, 255);
    }

    50% {
        background-color: rgb(158, 0, 197);
    }
}
</style>