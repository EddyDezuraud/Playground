<template>
    <div :class="$style.wrapper" class="global">
        <div :class="$style.header">
            <div v-for="(type) in codes" :key="type.lang" @click="onActiveLang(type)"
                :class="[$style.lang, $style[type.lang], { [$style.selected]: langSelected === type.lang }]">
                <brand-vue-icon v-if="type.lang.includes('vuejs')" :class="$style.icon" />
                <brand-react-icon v-else-if="type.lang.includes('reactjs')" :class="$style.icon" />
                <brand-angular-icon v-else-if="type.lang.includes('angular')" :class="$style.icon" />
                <brand-svelte-icon v-else-if="type.lang.includes('svelte')" :class="$style.icon" />
                <brand-javascript-icon v-else-if="type.lang.includes('vanilla')" :class="$style.icon" />
                <span :class="$style.langLabel">{{ type.lang }}</span>
            </div>
        </div>
        <div :class="$style.inner">
            <div :class="$style.tabs" v-if="currentLang">
                <button v-for="tab in currentLang.tabs" :key="tab" @click="tabSelected = tab.label"
                    :class="[$style.tab, { [$style.active]: tabSelected === tab.label }]">
                    {{ tab.label }}
                </button>
                <button @click="copy" :class="$style.copyButton">
                    <copy-icon />
                </button>
            </div>
            <div :class="$style.codeInner">
                <CodeBlock :code="'<div>aa</div>'" label="My Code" :highlightjs="true" lang="html" />
            </div>
        </div>
        <ContentDoc path="/element/dropdowns" />
        <div :class="$style.copied" v-if="copied">
            <span>Copied !</span>
        </div>
    </div>
</template>

<script setup>
import CodeBlock from '@wdns/vue-code-block';

const props = defineProps({
    codes: {
        type: Array,
        default: () => []
    }
})

const langSelected = ref('vuejs');
const tabSelected = ref('');
const copied = ref(false);

const currentLang = computed(() => {
    const index = props.codes?.findIndex((el) => el.lang === langSelected)
    return props.codes[index];
})

const code = computed(() => {
    if (!currentLang || !currentLang.tabs) return ''
    const index = currentLang?.tabs.findIndex((el) => el.label === tabSelected)
    if (index > -1) {
        return currentLang.tabs[index].code;
    }
    return '';
})

const onActiveLang = (type) => {
    langSelected = type.lang;
    const index = type.tabs.findIndex((el) => el.default === true);

    if (index > -1) {
        tabSelected = type.tabs[index].label;
    }
};

const copy = async () => {
    try {
        await navigator.clipboard.writeText(code);
        copied = true;

        window.setTimeout(
            function () {
                copied = false
            }.bind(this), 2000);
    } catch ($e) {
        alert('Cannot copy', $e);
    }
}
</script>

<style lang="scss" module>
.wrapper {
    display: block;
    margin-top: 40px;
    padding-top: 40px;
    border-top: solid 1px rgba(255, 255, 255, 0.1);
}

.codeInner {
    overflow: auto;
    max-height: 400px;
    padding: 0 15px;

    /* width */
    &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: transparent
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
}

.inner {
    background: #212122;
    border-radius: 10px;
    padding: 5px;
    font-size: 14px;
}

.header {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.lang {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 13px;
    background: rgb(19, 19, 21);
    box-shadow: 0 0 0 1px rgb(255 255 255 / 12%);
    gap: 10px;
    padding: 15px;
    cursor: pointer;
    position: relative;
    width: 90px;
    transform: translateZ(0);

    &::before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: currentColor;
        border-radius: 13px;
        opacity: 0;
    }

    &.vuejs {
        color: #41b883;
    }

    &.reactjs {
        color: #61dafb;
    }

    &.angular {
        color: #DD0031;
    }

    &.svelte {
        color: #ff3e00;
    }

    &.selected {

        &::before {
            box-shadow: 0 0 0 1px currentColor;
            opacity: 0.1;
        }
    }
}

.icon {
    font-size: 28px;
}

.langLabel {
    font-size: 13px;
}


.tabs {
    display: flex;
    gap: 5px;
    padding-bottom: 5px;
    width: 100%;
    position: relative;
}

.tab {
    padding: 10px 15px;
    background: transparent;
    color: rgba(255, 255, 255, 0.6);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    border: none;
    cursor: pointer;

    &:hover {
        color: rgba(255, 255, 255, 0.8);
    }

    &.active {
        background: #1a1a1a;
        color: white;
    }
}

.copied {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    padding: 15px 40px;
    font-size: 14px;
    border-radius: 10px;
    backdrop-filter: blur(2px);
    animation: copiedAnimation 0.3s;
    z-index: 9999;
    background-image: linear-gradient(135deg, rgba(56, 57, 58, .6), rgba(31, 32, 35, .1));

    &::before {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 10px;
        top: 0;
        left: 0;
        box-shadow: rgb(255 255 255 / 3%) 0px 5px 24px, 0 0 0 1px rgb(255 255 255 / 5%), 4px 4px 14px 0 rgb(8 15 52 / 4%), 1px 1px 1px 0 rgb(23 15 73 / 4%), 0 0 1px 0 rgb(23 15 73 / 3%);
        z-index: 1;
    }

    >span {
        position: relative;
        z-index: 2;
    }
}

.copyButton {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255);
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background: rgba(255, 255, 255, 0.8);
    }
}

@keyframes copiedAnimation {
    from {
        transform: translateY(-40px) translateX(-50%);
        opacity: 0;
    }

    to {
        transform: translateY(0) translateX(-50%);
        opacity: 1;
    }
}
</style>