<script setup>
import codes from '~/assets/data/codes/dropdown.js';

useHead({
    title: "Eddy's Playground : Dropdown"
})

const dropDownList = ref([
    {
        label: 'Unfollow',
        id: 'unfollow',
        icon: 'user-x',
        color: '#79798a'
    },
    {
        topSeparator: true,
        label: 'Comment this post',
        id: 'comment',
        icon: 'message-2'
    },
    {
        label: 'Embed',
        id: 'embed',
        icon: 'code'
    },
    {
        label: 'Add to Lists',
        id: 'addFromList',
        icon: 'circle-plus'
    },
    {
        topSeparator: true,
        label: 'Mute @meta_user',
        id: 'mute',
        icon: 'volume-off'
    },
    {
        label: 'Block @meta_user',
        id: 'block',
        icon: 'lock-access-off'
    },
    {
        topSeparator: true,
        label: 'Report',
        id: 'report',
        icon: 'hand-stop',
        color: '#ff333a'
    }
]);

</script>


<template>
    <div :class="$style.wrapper">
        <div class="global" :class="$style.inner">
            <Dropdown :list="dropDownList" @click="onClickItem" />
            <Dropdown :list="dropDownList" @click="onClickItem" dark />
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
    gap: 20px;
}
</style>