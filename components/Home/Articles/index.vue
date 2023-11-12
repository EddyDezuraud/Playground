<script setup>
import items from '~/assets/data/pages.json';
</script>


<template>
    <div class="global" :class="$style.wrapper">
        <Thumbnail2 v-for="item in items" :key="item.link" :title="item.title" :video="item.video" :picture="item.picture"
            :date="item.date"
            :link="item.link" />
    </div>
</template>


<style module>
.wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    /* Espacement entre les colonnes */
}
</style>