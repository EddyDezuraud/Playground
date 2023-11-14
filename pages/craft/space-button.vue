<script setup>
import codes from '~/assets/data/codes/space-button.js';

useHead({
    title: "Eddy's Playground : Space Button"
})
</script>

<template>
    <div :class="$style.wrapper">
        <div class="global" :class="$style.inner">
            <SpaceButton>
                Space button
            </SpaceButton>
        </div>
        <CraftCode :codes="codes" />
    </div>
</template>

<style module>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    position: relative;
    margin-top: 200px;
}

.inner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 80px 20px;
    border-radius: 12px;
    background: hsla(0, 0%, 0%, 0.2);
    border: solid 1px rgba(255, 255, 255, 0.05);
}
</style>