<script setup>
import items from '~/assets/data/pages.json';

const filteredItems = computed(() => {
    const currentDate = new Date();
    return items.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate <= currentDate && item.online;
    });
});

</script>


<template>
    <div class="global" :class="$style.wrapper">
        <Thumbnail2 v-for="item in filteredItems" :key="item.link" :title="item.title" :video="item.video"
            :picture="item.picture" :date="item.date" :link="item.link" />
    </div>
</template>


<style module>
.wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    /* Espacement entre les colonnes */
}

@media screen and (max-width: 800px) {
    .wrapper {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (max-width: 400px) {
    .wrapper {
        display: flex;
        flex-direction: column;
    }
}
</style>