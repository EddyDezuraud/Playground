
<template>
    <div :class="$style.wrapper">
        <div class="global" :class="$style.inner">
            <SafariApp />
        </div>
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
    padding: 190px 20px;
    border-radius: 12px;
    background: hsla(0, 0%, 0%, 0.2);
    background: linear-gradient(360deg, rgb(19, 10, 29), rgb(15, 13, 27));
    background: linear-gradient(180deg, #10C9FB 0%, #1D6FF1 100%);
    border: solid 1px rgba(255, 255, 255, 0.05);
    gap: 20px;
    transition: transform 0.3s;
}
</style>