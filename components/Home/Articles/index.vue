<script setup>
import items from '~/assets/data/pages.json';
</script>


<template>
    <div class="global" :class="$style.wrapper">
        <Thumbnail v-for="item in items" :key="item.link" :title="item.title" :video="item.video" :picture="item.picture"
            :link="item.link" />
    </div>
</template>


<style module>
.wrapper {
    display: block;
}
</style>