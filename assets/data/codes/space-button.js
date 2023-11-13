const items = [
  {
      lang: 'vuejs',
      tabs: [
          {
              label: 'dropdown.vue',
              default: true,
              code: '<template>\r\n    <button class=\"spaceButton\" @mousemove=\"onMouseMove\" @mouseenter=\"onMouseEnter\" @mouseleave=\"onMouseLeave\">\r\n        <div class=\"spaceButton--inner\">\r\n            <div aria-hidden=\"true\" class=\"spaceButton--background\">\r\n                <div class=\"spaceButton--background-border\"><\/div>\r\n                <div class=\"spaceButton--background-inner\" ref=\"spaceButtonInner\">\r\n                    <div class=\"spaceButton--background-cursor\">\r\n                        <div class=\"spaceButton--background-cursor-in\" :style=\"cursorStyle\"><\/div>\r\n                    <\/div>\r\n                <\/div>\r\n                <div aria-hidden=\"true\" class=\"spaceButton--background-stars\" :class=\"\'spaceButton-sizes-\' + index\"\r\n                    v-for=\"index in 3\" :key=\"index\">\r\n                    <div v-for=\"(star, index) in starsBySize(index)\" :key=\"index\" :style=\"starStyle(star)\"\r\n                        class=\"spaceButton--background-star\">\r\n                    <\/div>\r\n                <\/div>\r\n            <\/div>\r\n            <span class=\"spaceButton--text\">\r\n                <slot \/>\r\n            <\/span>\r\n        <\/div>\r\n    <\/button>\r\n<\/template>\r\n\r\n<script>\r\n\r\nimport { ref, computed, onMounted } from \'vue\';\r\n\r\nexport default {\r\n  setup() {\r\n    const cursorStyle = ref({\r\n      transform: \'translateX(0) translateY(0)\'\r\n    });\r\n    const stars = ref([]);\r\n\r\n    const starStyle = computed(() => {\r\n      return (star) => {\r\n        return {\r\n          top: star.y + \'px\',\r\n          left: star.x + \'px\',\r\n          width: star.size + \'px\',\r\n          animation: star.twinkle ? \'twinkle 2s infinite\' : \'\',\r\n          animationDelay: star.animationDelay + \'s\',\r\n          opacity: star.opacity\r\n        };\r\n      };\r\n    });\r\n    const starsBySize = computed(() => {\r\n      return (size) => {\r\n        return stars.value.filter((star) => star.size === size);\r\n      };\r\n    });\r\n    function randomNum(max) {\r\n      return Math.floor(Math.random() * max) + 1;\r\n    }\r\n    function onMouseMove(e) {\r\n      cursorStyle.value.transform = `translateX(${e.offsetX}px) translateY(${e.offsetY}px)`;\r\n    }\r\n    function onMouseEnter(e) {\r\n      const width = e.currentTarget.clientWidth * 1.1;\r\n      const height = e.currentTarget.clientHeight;\r\n\r\n      const nbStars = randomNum(width \/ 2);\r\n\r\n      stars.value.splice(0, stars.value.length);\r\n      for (var i = 0; i < nbStars; i++) {\r\n        stars.value.push({\r\n          x: randomNum(width),\r\n          y: randomNum(width),\r\n          size: randomNum(2),\r\n          twinkle: randomNum(2) === 1,\r\n          animationDelay: randomNum(100) \/ 100,\r\n          opacity: randomNum(100) \/ 100\r\n        });\r\n      }\r\n    }\r\n    function onMouseLeave() {\r\n\r\n    }\r\n\r\n    return {\r\n      cursorStyle,\r\n      starStyle,\r\n      starsBySize,\r\n      randomNum,\r\n      onMouseMove,\r\n      onMouseEnter,\r\n      onMouseLeave\r\n    };\r\n  }\r\n};\r\n\r\n<\/script>\r\n\r\n\r\n<style lang=\"scss\">\r\n.spaceButton {\r\n    position: relative;\r\n    background: transparent;\r\n    border: none;\r\n    cursor: pointer;\r\n    font-family: \'Inter\';\r\n    font-weight: 500;\r\n}\r\n\r\n.spaceButton--inner {\r\n    pointer-events: none;\r\n}\r\n\r\n.spaceButton--background {\r\n    overflow: hidden;\r\n    transform: scale(1);\r\n    transition: transform 0.3s;\r\n    box-shadow: 0 10px 20px -15px rgb(65, 64, 73);\r\n    border-radius: 20px;\r\n}\r\n\r\n.spaceButton--background-cursor,\r\n.spaceButton--background-inner,\r\n.spaceButton--background-border,\r\n.spaceButton--background {\r\n    position: absolute;\r\n    left: 0px;\r\n    top: 0px;\r\n    width: 100%;\r\n    height: 100%;\r\n    padding: 1px;\r\n    border-radius: 20px;\r\n    z-index: 0;\r\n}\r\n\r\n.spaceButton--background-border {\r\n    transform: rotate(0deg);\r\n    filter: blur(10px);\r\n    opacity: 0.75;\r\n    transition: transform 1s ease;\r\n    transform-origin: center;\r\n    background: rgba(255, 255, 255, 0.2);\r\n    box-shadow: 0 0 10px white;\r\n\r\n    &::after,\r\n    &::before {\r\n        position: absolute;\r\n        content: \'\';\r\n        width: 40px;\r\n        height: 40px;\r\n        border-radius: 50%;\r\n        top: calc(100% - 25px);\r\n        left: 10%;\r\n        background: #591dfd;\r\n        transform: scale(1);\r\n        transition: transform 0.3s;\r\n    }\r\n\r\n    &::after {\r\n        top: 0;\r\n        right: -20px;\r\n        left: auto;\r\n        opacity: 0.5;\r\n        background: white;\r\n    }\r\n}\r\n\r\n.spaceButton--background-inner {\r\n    z-index: 2;\r\n    background: #100c1d;\r\n    left: 1px;\r\n    top: 1px;\r\n    width: calc(100% - 2px);\r\n    height: calc(100% - 2px);\r\n\r\n}\r\n\r\n.spaceButton--background-cursor {\r\n    opacity: 0;\r\n    background: linear-gradient(45deg, #f122b3, #51b9ff);\r\n    transition: opacity 0.3s;\r\n\r\n    &::before {\r\n        position: absolute;\r\n        content: \'\';\r\n        width: 100%;\r\n        height: 100%;\r\n        top: 0;\r\n        left: 0;\r\n        opacity: 0.75;\r\n        background: linear-gradient(-135deg, #7c22f1, #15e4d3);\r\n    }\r\n}\r\n\r\n.spaceButton--background-cursor-in {\r\n    position: absolute;\r\n    top: -500px;\r\n    left: -500px;\r\n    width: 1000px;\r\n    height: 1000px;\r\n    border-radius: 50%;\r\n    background: radial-gradient(rgba(0, 0, 0, 0) 0%, #100c1d 8%);\r\n    transition: transform 0.3s;\r\n}\r\n\r\n.spaceButton--background-stars {\r\n    position: absolute;\r\n    z-index: 2;\r\n    left: 0;\r\n    top: 0;\r\n    opacity: 0;\r\n    animation: stars 100s linear infinite;\r\n    transition: opacity 0.8s;\r\n    width: 110%;\r\n    aspect-ratio: 1\/1;\r\n    top: -55%;\r\n    left: -5%;\r\n    transform-origin: center;\r\n\r\n    &.spaceButton-sizes-2 {\r\n        animation: stars 200s linear infinite;\r\n    }\r\n\r\n    &.spaceButton-sizes-3 {\r\n        animation: stars 300s linear infinite;\r\n    }\r\n}\r\n\r\n.spaceButton--background-star {\r\n    position: absolute;\r\n    width: 2px;\r\n    aspect-ratio: 1\/1;\r\n    background: white;\r\n    border-radius: 50%;\r\n    box-shadow: 0 0 20px white;\r\n}\r\n\r\n\r\n.spaceButton:hover {\r\n\r\n\r\n    .spaceButton--background {\r\n        transform: scale(1.05)\r\n    }\r\n\r\n    .spaceButton--background-border {\r\n        transform: rotate(180deg);\r\n\r\n        &::after,\r\n        &::before {\r\n            transform: scale(1.4)\r\n        }\r\n    }\r\n\r\n    .spaceButton--background-cursor {\r\n        opacity: 0.3;\r\n    }\r\n\r\n    .spaceButton--background-stars {\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n.spaceButton--text {\r\n    position: relative;\r\n    display: block;\r\n    z-index: 3;\r\n    color: white;\r\n    font-size: 18px;\r\n    padding: 20px 50px;\r\n}\r\n\r\n@keyframes stars {\r\n    0% {\r\n        transform: rotate(0deg);\r\n    }\r\n\r\n    100% {\r\n        transform: rotate(360deg)\r\n    }\r\n}\r\n\r\n\r\n@keyframes twinkle {\r\n    1% {\r\n        opacity: 0.5;\r\n    }\r\n\r\n    50% {\r\n        opacity: 0.6;\r\n    }\r\n\r\n    0%,\r\n    2%,\r\n    40%,\r\n    60%, \r\n    100% {\r\n        opacity: 1;\r\n    }\r\n}\r\n<\/style>'
          }
      ]
  },
  {
      lang: 'reactjs',
      tabs: [
          {
              label : 'dropdown.js',
              default: true,
              code: "import React, { useState } from \'react\';\r\n\r\nconst ListItem = ({ item, index, itemColor, onMouseEnter, onClick }) => {\r\n  return (\r\n    <li\r\n      key={index}\r\n      style={itemColor(item)}\r\n      className={`item ${item.topSeparator ? \'topSeparator\' : \'\'}`}\r\n      onClick={() => onClick(item.id)}\r\n      onMouseEnter={onMouseEnter}\r\n    >\r\n      <span className=\"icon\">{item.icon}<\/span>\r\n      <span>{item.label}<\/span>\r\n    <\/li>\r\n  );\r\n};\r\n\r\nconst List = ({ list, itemColor, onMouseEnter, onClick }) => {\r\n  return (\r\n    <ul className=\"list\">\r\n      {list.map((item, index) => (\r\n        <ListItem\r\n          key={index}\r\n          item={item}\r\n          index={index}\r\n          itemColor={itemColor}\r\n          onMouseEnter={onMouseEnter}\r\n          onClick={onClick}\r\n        \/>\r\n      ))}\r\n    <\/ul>\r\n  );\r\n};\r\n\r\nconst Highlighter = ({ style }) => {\r\n  return <div className=\"highlighter\" style={style} \/>;\r\n};\r\n\r\nconst ListWrapper = ({ dark, list, onClick }) => {\r\n  const [highlighter, setHighlighter] = useState({\r\n    height: 0,\r\n    transform: \'translateY(0)\',\r\n    color: \'currentColor\',\r\n    opacity: 0,\r\n  });\r\n\r\n  const itemColor = (item) => {\r\n    if (item.color) return { color: item.color };\r\n    return {};\r\n  };\r\n\r\n  const onMouseEnter = (event, item) => {\r\n    const color = item.color || \'currentColor\';\r\n    setHighlighter({\r\n      color,\r\n      transform: `translateY(${event.currentTarget.offsetTop}px)`,\r\n      height: `${event.currentTarget.offsetHeight}px`,\r\n      opacity: 0.1,\r\n    });\r\n  };\r\n\r\n  const onMouseLeave = () => {\r\n    setHighlighter({\r\n      opacity: 0,\r\n    });\r\n  };\r\n\r\n  return (\r\n    <div className={`wrapper ${dark ? \'dark\' : \'\'}`}>\r\n      <div className=\"inner\" onMouseLeave={onMouseLeave}>\r\n        <List\r\n          list={list}\r\n          itemColor={itemColor}\r\n          onMouseEnter={onMouseEnter}\r\n          onClick={onClick}\r\n        \/>\r\n        <Highlighter style={highlighter} \/>\r\n      <\/div>\r\n    <\/div>\r\n  );\r\n};\r\n\r\nexport default ListWrapper;\r\n"
          },
          {
              label: 'dropdown.css',
              code: ".wrapper {\r\n    background: white;\r\n    color: black;\r\n    border-radius: 10px;\r\n    padding: 10px;\r\n    width: 280px;\r\n}\r\n\r\n.inner {\r\n    position: relative;\r\n}\r\n\r\n.item {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    padding: 5px 8px;\r\n    font-weight: 600;\r\n    font-size: 14px;\r\n    border-radius: 6px;\r\n    position: relative;\r\n    z-index: 2;\r\n    cursor: pointer;\r\n    transform: translateZ(0);\r\n    user-select: none;\r\n    -webkit-touch-callout: none;\r\n    -webkit-user-select: none;\r\n}\r\n\r\n.topSeparator {\r\n    margin-top: 5px;\r\n\r\n    &::before {\r\n        position: absolute;\r\n        content: \'\';\r\n        top: -3px;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        background: #EBEEF1;\r\n    }\r\n}\r\n\r\n.icon {\r\n    font-size: 18px;\r\n}\r\n\r\n.highlighter {\r\n    position: absolute;\r\n    top: 0;\r\n    width: 100%;\r\n    background: currentColor;\r\n    opacity: 0.1;\r\n    border-radius: 6px;\r\n    z-index: 0;\r\n    transition: transform 0.15s, opacity 0.15s;\r\n}\r\n\r\n.list {\r\n    margin: 0;\r\n    padding: 0;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1px;\r\n}\r\n\r\n\r\n.dark {\r\n    background: rgb(19, 19, 21);\r\n    color: white;\r\n    box-shadow: rgb(0 0 0 \/ 12%) 0px 12px 12px, 0 0 0 1px rgba(255, 255, 255, 0.12);\r\n\r\n    .item {\r\n        font-weight: 500;\r\n    }\r\n\r\n    .topSeparator ::before {\r\n        position: absolute;\r\n        content: \'\';\r\n        top: -3px;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        background: #2c2f31;\r\n    }\r\n}"
          }
      ]
  },
  {
      lang: 'angular',
      tabs: [
          {
              label : 'dropdown.js',
              default: true,
              code: "import { Component, Input } from \'@angular\/core\';\r\n\r\n@Component({\r\n  selector: \'dropdown\',\r\n  template: `\r\n    <div [ngClass]=\"[\'wrapper\', { \'dark\': dark }]\">\r\n        <div class=\"inner\" (mouseleave)=\"onMouseLeave()\">\r\n            <ul class=\"list\">\r\n                <li *ngFor=\"let item of list; let i = index\" [ngStyle]=\"itemColor(item)\"\r\n                    [ngClass]=\"[\'item\', { \'topSeparator\': item.topSeparator }]\"\r\n                    (click)=\"onClick(item.id)\" (mouseenter)=\"onMouseEnter($event, item)\">\r\n                    <component [is]=\"item.icon + \'-icon\'\" class=\"icon\" \/>\r\n                    <span>{{ item.label }}<\/span>\r\n                <\/li>\r\n            <\/ul>\r\n            <div [ngStyle]=\"highlighter\" class=\"highlighter\"><\/div>\r\n        <\/div>\r\n    <\/div>\r\n  `,\r\n})\r\nexport class DropdownComponent {\r\n  @Input() list = [];\r\n  @Input() dark = false;\r\n\r\n  highlighter = {\r\n    height: 0,\r\n    transform: \'translateY(0)\',\r\n    color: \'currentColor\',\r\n    opacity: 0,\r\n  };\r\n\r\n  itemColor(item) {\r\n    return item.color ? { color: item.color } : {};\r\n  }\r\n\r\n  onMouseEnter(event, item) {\r\n    this.highlighter.color = item.color ? item.color : \'currentColor\';\r\n    this.highlighter.transform = `translateY(${event.currentTarget.offsetTop}px)`;\r\n    this.highlighter.height = event.currentTarget.offsetHeight + \'px\';\r\n    this.highlighter.opacity = 0.1;\r\n  }\r\n\r\n  onMouseLeave() {\r\n    this.highlighter.opacity = 0;\r\n  }\r\n\r\n  onClick(id) {\r\n    this.click.emit(id);\r\n  }\r\n}"
          },
          {
              label: 'dropdown.css',
              code: ".wrapper {\r\n    background: white;\r\n    color: black;\r\n    border-radius: 10px;\r\n    padding: 10px;\r\n    width: 280px;\r\n}\r\n\r\n.inner {\r\n    position: relative;\r\n}\r\n\r\n.item {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    padding: 5px 8px;\r\n    font-weight: 600;\r\n    font-size: 14px;\r\n    border-radius: 6px;\r\n    position: relative;\r\n    z-index: 2;\r\n    cursor: pointer;\r\n    transform: translateZ(0);\r\n    user-select: none;\r\n    -webkit-touch-callout: none;\r\n    -webkit-user-select: none;\r\n}\r\n\r\n.topSeparator {\r\n    margin-top: 5px;\r\n\r\n    &::before {\r\n        position: absolute;\r\n        content: \'\';\r\n        top: -3px;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        background: #EBEEF1;\r\n    }\r\n}\r\n\r\n.icon {\r\n    font-size: 18px;\r\n}\r\n\r\n.highlighter {\r\n    position: absolute;\r\n    top: 0;\r\n    width: 100%;\r\n    background: currentColor;\r\n    opacity: 0.1;\r\n    border-radius: 6px;\r\n    z-index: 0;\r\n    transition: transform 0.15s, opacity 0.15s;\r\n}\r\n\r\n.list {\r\n    margin: 0;\r\n    padding: 0;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1px;\r\n}\r\n\r\n\r\n.dark {\r\n    background: rgb(19, 19, 21);\r\n    color: white;\r\n    box-shadow: rgb(0 0 0 \/ 12%) 0px 12px 12px, 0 0 0 1px rgba(255, 255, 255, 0.12);\r\n\r\n    .item {\r\n        font-weight: 500;\r\n    }\r\n\r\n    .topSeparator ::before {\r\n        position: absolute;\r\n        content: \'\';\r\n        top: -3px;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        background: #2c2f31;\r\n    }\r\n}"
          }
      ]
  },
  {
      lang: 'svelte',
      tabs: [
          {
              label : 'dropdown.svelte',
              default: true,
              code: "<script>\r\n  export let list = [];\r\n  export let dark = false;\r\n\r\n  let highlighter = {\r\n    height: 0,\r\n    transform: \'translateY(0)\',\r\n    color: \'currentColor\',\r\n    opacity: 0\r\n  };\r\n\r\n  function itemColor(item) {\r\n    return item.color ? { color: item.color } : {};\r\n  }\r\n\r\n  function onMouseEnter(event, item) {\r\n    highlighter.color = item.color || \'currentColor\';\r\n    highlighter.transform = `translateY(${event.currentTarget.offsetTop}px)`;\r\n    highlighter.height = `${event.currentTarget.offsetHeight}px`;\r\n    highlighter.opacity = 0.1;\r\n  }\r\n\r\n  function onMouseLeave() {\r\n    highlighter.opacity = 0;\r\n  }\r\n<\/script>\r\n\r\n<div class=\"wrapper {dark ? \'dark\' : \'\'}\">\r\n  <div on:mouseleave=\"onMouseLeave\">\r\n    <ul class=\"list\">\r\n      {#each list as item (index)}\r\n        <li\r\n          class=\"{item.topSeparator ? \'topSeparator\' : \'\'} item\"\r\n          style=\"{itemColor(item)}\"\r\n          on:click=\"{() => {$emit(\'click\', item.id)}}\"\r\n          on:mouseenter=\"{e => onMouseEnter(e, item)}\"\r\n        >\r\n          <component is={item.icon + \'-icon\'} class=\"icon\" \/>\r\n          <span>{item.label}<\/span>\r\n        <\/li>\r\n      {\/each}\r\n    <\/ul>\r\n    <div class=\"highlighter\" style=\"{highlighter}\"><\/div>\r\n  <\/div>\r\n<\/div>\r\n\r\n<style>\r\n.wrapper {\r\n    background: white;\r\n    color: black;\r\n    border-radius: 10px;\r\n    padding: 10px;\r\n    width: 280px;\r\n}\r\n\r\n.inner {\r\n    position: relative;\r\n}\r\n\r\n.item {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    padding: 5px 8px;\r\n    font-weight: 600;\r\n    font-size: 14px;\r\n    border-radius: 6px;\r\n    position: relative;\r\n    z-index: 2;\r\n    cursor: pointer;\r\n    transform: translateZ(0);\r\n    user-select: none;\r\n    -webkit-touch-callout: none;\r\n    -webkit-user-select: none;\r\n}\r\n\r\n.topSeparator {\r\n    margin-top: 5px;\r\n\r\n    &::before {\r\n        position: absolute;\r\n        content: \'\';\r\n        top: -3px;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        background: #EBEEF1;\r\n    }\r\n}\r\n\r\n.icon {\r\n    font-size: 18px;\r\n}\r\n\r\n.highlighter {\r\n    position: absolute;\r\n    top: 0;\r\n    width: 100%;\r\n    background: currentColor;\r\n    opacity: 0.1;\r\n    border-radius: 6px;\r\n    z-index: 0;\r\n    transition: transform 0.15s, opacity 0.15s;\r\n}\r\n\r\n.list {\r\n    margin: 0;\r\n    padding: 0;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1px;\r\n}\r\n\r\n\r\n.dark {\r\n    background: rgb(19, 19, 21);\r\n    color: white;\r\n    box-shadow: rgb(0 0 0 \/ 12%) 0px 12px 12px, 0 0 0 1px rgba(255, 255, 255, 0.12);\r\n\r\n    .item {\r\n        font-weight: 500;\r\n    }\r\n\r\n    .topSeparator ::before {\r\n        position: absolute;\r\n        content: \'\';\r\n        top: -3px;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        background: #2c2f31;\r\n    }\r\n}\r\n<\/style>\r\n"
          },
      ]
  },
  {
      lang: 'vanilla',
      tabs: [
          {
              label : 'dropdown.html',
              default: true,
              code: "<div class=\"wrapper\">\r\n    <div class=\"inner\">\r\n        <ul class=\"list\">\r\n            <li class=\"item\" v-for=\"(item, index) in list\" key=\"index\">\r\n                <span class=\"icon\"><\/span>\r\n                <span>{{ item.label }}<\/span>\r\n            <\/li>\r\n        <\/ul>\r\n        <div class=\"highlighter\"><\/div>\r\n    <\/div>\r\n<\/div>"
          },
          {
              label: 'dropdown.css',
              code: ".wrapper {\r\n    background: white;\r\n    color: black;\r\n    border-radius: 10px;\r\n    padding: 10px;\r\n    width: 280px;\r\n}\r\n\r\n.inner {\r\n    position: relative;\r\n}\r\n\r\n.item {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    padding: 5px 8px;\r\n    font-weight: 600;\r\n    font-size: 14px;\r\n    border-radius: 6px;\r\n    position: relative;\r\n    z-index: 2;\r\n    cursor: pointer;\r\n    transform: translateZ(0);\r\n    user-select: none;\r\n    -webkit-touch-callout: none;\r\n    -webkit-user-select: none;\r\n}\r\n\r\n.topSeparator {\r\n    margin-top: 5px;\r\n\r\n    &::before {\r\n        position: absolute;\r\n        content: \'\';\r\n        top: -3px;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        background: #EBEEF1;\r\n    }\r\n}\r\n\r\n.icon {\r\n    font-size: 18px;\r\n}\r\n\r\n.highlighter {\r\n    position: absolute;\r\n    top: 0;\r\n    width: 100%;\r\n    background: currentColor;\r\n    opacity: 0.1;\r\n    border-radius: 6px;\r\n    z-index: 0;\r\n    transition: transform 0.15s, opacity 0.15s;\r\n}\r\n\r\n.list {\r\n    margin: 0;\r\n    padding: 0;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1px;\r\n}\r\n\r\n\r\n.dark {\r\n    background: rgb(19, 19, 21);\r\n    color: white;\r\n    box-shadow: rgb(0 0 0 \/ 12%) 0px 12px 12px, 0 0 0 1px rgba(255, 255, 255, 0.12);\r\n\r\n    .item {\r\n        font-weight: 500;\r\n    }\r\n\r\n    .topSeparator ::before {\r\n        position: absolute;\r\n        content: \'\';\r\n        top: -3px;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        background: #2c2f31;\r\n    }\r\n}"
          },
          {
              label: 'dropdown.js',
              code: "const wrapper = document.querySelector(\'.wrapper\');\r\nconst inner = document.querySelector(\'.inner\');\r\nconst list = document.querySelector(\'.list\');\r\nconst items = document.querySelectorAll(\'.item\');\r\nconst highlighter = document.querySelector(\'.highlighter\');\r\n\r\nconst listItems = [\r\n    { id: 1, label: \'Item 1\', color: \'red\' },\r\n    { id: 2, label: \'Item 2\', color: \'green\' },\r\n    { id: 3, label: \'Item 3\', color: \'blue\' }\r\n];\r\n\r\nconst dark = false;\r\nif (dark) {\r\n    wrapper.classList.add(\'dark\');\r\n}\r\n\r\nlistItems.forEach((item, index) => {\r\n    const listItem = items[index];\r\n    listItem.style.color = item.color;\r\n    listItem.addEventListener(\'mouseenter\', (event) => {\r\n        highlighter.style.backgroundColor = item.color;\r\n        highlighter.style.transform = `translateY(${event.currentTarget.offsetTop}px)`;\r\n        highlighter.style.height = `${event.currentTarget.offsetHeight}px`;\r\n        highlighter.style.opacity = 0.1;\r\n    });\r\n});\r\n\r\ninner.addEventListener(\'mouseleave\', () => {\r\n    highlighter.style.opacity = 0;\r\n});\r\n"
          }
      ]
  },
]

export default items;