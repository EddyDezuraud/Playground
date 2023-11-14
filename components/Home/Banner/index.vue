<script setup>
const codeTitle = 'code';

onActivated(() => {
    console.log('onActivated')
})
</script>

<template>
    <div class="global" :class="$style.wrapper">
        <h1 :class="$style.title">
            <span :class="$style.line1">
                A Fusion of<br />
            </span>
            <span :class="$style.line2">
                Creativity and <span :class="$style.code">{{ codeTitle }}</span>
            </span>

        </h1>
    </div>
</template>

<style module>
.wrapper {
    padding: 160px 0;
}

.title {
    font-size: 60px;
    text-align: center;
    line-height: 100%;
}

.line2,
.line1 {
    display: block;
    animation: linesAppears 1.2s ease;
    animation-fill-mode: backwards;
    animation-delay: 0.5s;
}

.line2 {
    animation-delay: 0.8s;
}

@keyframes linesAppears {
    0% {
        transform: translateY(20px);
        opacity: 0;
    }

    100% {
        transform: translateY(0px);
        opacity: 1;
    }
}

@media screen and (max-width: 800px) {
    .title {
        font-size: 36px;
    }
}

@media screen and (max-width: 480px) {
    .wrapper {
        padding: 100px 0;
    }

    .title {
        font-size: 13px;
    }
}
</style>