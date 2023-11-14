<template>
    <div>
        <div :class="$style.cosmic">
            <div :class="$style.planet"></div>
            <div :class="$style.halo"></div>
        </div>
        <HomeBanner />
        <HomeArticles />
    </div>
</template>

<script>
useHead({
    title: "Eddy's Playground - Home of Design and Front-end experiments"
})
</script>

<style module>
.cosmic {
    pointer-events: none;
}

.planet {
    position: absolute;
    width: 95%;
    height: 500px;
    left: 50%;
    top: 0;
    transform: translateY(-50%) translateX(-50%);
    filter: blur(100px);
    border-radius: 50%;
    background: radial-gradient(#8254ff, #8254ff00, #8254ff00);
}

.halo {
    position: absolute;
    top: 200px;
    left: -700px;
    flex: none;
    width: 1800px;
    height: 100px;
    border-radius: 800px;
    background: radial-gradient(#ffffff, #ffffff00, #ffffff00);
    transform: rotate(25deg);
    filter: blur(50px);
    animation: haloAnim 3s ease;
}

@keyframes haloAnim {
    0% {
        transform: translateX(-20%) translateY(-2%) rotate(30deg);
        opacity: 0;
    }
    100% {
        transform: translateX(0%) translateY(0%) rotate(25deg);
        opacity: 1;
    }
}
</style>