<template>
    <div :class="$style.wrapper">
        <div class="global" :class="$style.inner">
            <Rays />
            <span :class="$style.title">Rays Effect</span>
        </div>
        <!-- <CraftCode :codes="codes" /> -->
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
    padding: 200px 20px;
    border-radius: 12px;
    /* background: hsla(0, 0%, 0%, 0.2); */
    /* background: linear-gradient(360deg, rgb(19, 10, 29), rgb(64, 32, 100)); */
    /* border: solid 1px rgba(255, 255, 255, 0.05); */
    gap: 20px;
    transition: transform 0.3s;
}

.inner::after,
.inner::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 12px;
    background: linear-gradient(360deg, rgb(38, 18, 61), rgb(84, 32, 100));
    transition: opacity 0.8s, transform 0.8s;
    border: solid 1px rgba(255, 255, 255, 0.05);
    opacity: 0;
}

.inner::before {
    opacity: 1;
    background: linear-gradient(360deg, rgb(19, 10, 29), rgb(64, 32, 100));
}

.inner:hover::before,
.inner:hover::after {
    opacity: 1;
    transform: scale(1.02);
}

.title {
    position: relative; 
    z-index: 2;
    font-size: 80px;
    font-weight: 900;
}
</style>