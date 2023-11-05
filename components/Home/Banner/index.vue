<script setup>
const codeTitle = 'code';
</script>

<template>
    <div class="global" :class="$style.wrapper">
        <h1 :class="$style.title">
            A Fusion of<br />
            Creativity and 
            <span :class="$style.code">{{ codeTitle }}</span>
        </h1>
    </div>
</template>

<style module>
.wrapper {
    padding: 120px 0;
}

.title {
    font-size: 60px;
    text-align: center;
    line-height: 100%;
}
</style>