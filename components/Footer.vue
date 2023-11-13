<template>
    <footer :class="$style.wrapper" class="global">
        <span>
            Made with {{ randomEmoji }} by Eddy
        </span>
        <div :class="$style.link">
            <a href="https://twitter.com/eddydsn" target="_blank">
                @eddydsn
            </a>
        </div>
    </footer>
</template>

<script setup>

const randomEmoji = computed(() => {
    const emojis = ['🤌', '💖', '🎶', '🕹️', '🤠', '🤧', '👻', '🫴', '✊', '🧠', '🫀', '💪', '🩷', '🎹', '💻',
        '⌨️', '👑', '🧤', '⚡', '🍫', '🥞', '🫎', '❤️', '🥳', '💝', '🧀'];
    return emojis[Math.floor(Math.random() * emojis.length)];
})

</script>

<style module>
.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 120px!important;
    padding: 40px 0;
    font-size: 12px;
    border-top: solid 1px rgba(255,255,255,0.1);
}
</style>