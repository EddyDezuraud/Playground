const items = [
    {
        lang: 'vuejs',
        tabs: [
            {
                label: 'SpaceButton.vue',
                default: true,
                code: `<template>
    <button class="spaceButton" @mousemove="onMouseMove" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <div class="spaceButton--inner">
            <div aria-hidden="true" class="spaceButton--background">
                <div class="spaceButton--background-border"></div>
                <div class="spaceButton--background-inner" ref="spaceButtonInner">
                    <div class="spaceButton--background-cursor">
                        <div class="spaceButton--background-cursor-in" :style="cursorStyle"></div>
                    </div>
                </div>
                <div aria-hidden="true" class="spaceButton--background-stars" :class="'spaceButton-sizes-' + index"
                    v-for="index in 3" :key="index">
                    <div v-for="(star, index) in starsBySize(index)" :key="index" :style="starStyle(star)"
                        class="spaceButton--background-star">
                    </div>
                </div>
            </div>
            <span class="spaceButton--text">
                <slot></slot>
            </span>
        </div>
    </button>
</template>

<script>

export default {
    data() {
        return {
            cursorStyle: {
                transform: 'translateX(0) translateY(0)'
            },
            stars: []
        }
    },
    computed: {
        starStyle() {
            return (star) => {
                return {
                    top: star.y + 'px',
                    left: star.x + 'px',
                    width: star.size + 'px',
                    animation: star.twinkle ? 'twinkle 2s infinite' : '',
                    animationDelay: star.animationDelay + 's',
                    opacity: star.opacity
                }
            }
        },
        starsBySize() {
            return (size) => {
                return this.stars.filter((star) => star.size === size)
            }
        }
    },
    methods: {
        randomNum(max) {
            return Math.floor(Math.random() * max) + 1;
        },
        onMouseMove(e) {
            this.cursorStyle.transform = ` + 'translateX(${e.offsetX}px) translateY(${e.offsetY}px)' + `
        },
        onMouseEnter(e) {
            const width = e.currentTarget.clientWidth * 1.1;
            const height = e.currentTarget.clientHeight;

            const nbStars = this.randomNum(width / 2);

            this.stars.splice(0, this.stars.length);
            for (var i = 0; i < nbStars; i++) {
                this.stars.push({
                    x: this.randomNum(width),
                    y: this.randomNum(width),
                    size: this.randomNum(2),
                    twinkle: this.randomNum(2) === 1,
                    animationDelay: this.randomNum(100) / 100,
                    opacity: this.randomNum(100) / 100
                })
            }
        },
        onMouseLeave() {

        }
    }
}

</script>

<style lang="scss">
.spaceButton {
    position: relative;
    background: transparent;
    border: none;
    cursor: pointer;
}

.spaceButton--inner {
    pointer-events: none;
}

.spaceButton--background {
    overflow: hidden;
    transform: scale(1);
    transition: transform 0.3s;
    box-shadow: 0 10px 20px -15px rgb(65, 64, 73);
    border-radius: 20px;
}

.spaceButton--background-cursor,
.spaceButton--background-inner,
.spaceButton--background-border,
.spaceButton--background {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    padding: 1px;
    border-radius: 20px;
    z-index: 0;
}

.spaceButton--background-border {
    transform: rotate(0deg);
    filter: blur(10px);
    opacity: 0.75;
    transition: transform 1s ease;
    transform-origin: center;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 10px white;

    &::after,
    &::before {
        position: absolute;
        content: '';
        width: 40px;
        height: 40px;
        border-radius: 50%;
        top: calc(100% - 25px);
        left: 10%;
        background: #591dfd;
        transform: scale(1);
        transition: transform 0.3s;
    }

    &::after {
        top: 0;
        right: -20px;
        left: auto;
        opacity: 0.5;
        background: white;
    }
}

.spaceButton--background-inner {
    z-index: 2;
    background: #100c1d;
    left: 1px;
    top: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);

}

.spaceButton--background-cursor {
    opacity: 0;
    background: linear-gradient(45deg, #f122b3, #51b9ff);
    transition: opacity 0.3s;

    &::before {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0.75;
        background: linear-gradient(-135deg, #7c22f1, #15e4d3);
    }
}

.spaceButton--background-cursor-in {
    position: absolute;
    top: -500px;
    left: -500px;
    width: 1000px;
    height: 1000px;
    border-radius: 50%;
    background: radial-gradient(rgba(0, 0, 0, 0) 0%, #100c1d 8%);
    transition: transform 0.3s;
}

.spaceButton--background-stars {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    opacity: 0;
    animation: stars 100s linear infinite;
    transition: opacity 0.8s;
    width: 110%;
    aspect-ratio: 1/1;
    top: -55%;
    left: -5%;
    transform-origin: center;

    &.spaceButton-sizes-2 {
        animation: stars 200s linear infinite;
    }

    &.spaceButton-sizes-3 {
        animation: stars 300s linear infinite;
    }
}

.spaceButton--background-star {
    position: absolute;
    width: 2px;
    aspect-ratio: 1/1;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 20px white;
}


.spaceButton:hover {


    .spaceButton--background {
        transform: scale(1.05)
    }

    .spaceButton--background-border {
        transform: rotate(180deg);

        &::after,
        &::before {
            transform: scale(1.4)
        }
    }

    .spaceButton--background-cursor {
        opacity: 0.3;
    }

    .spaceButton--background-stars {
        opacity: 1;
    }
}

.spaceButton--text {
    position: relative;
    display: block;
    z-index: 3;
    color: white;
    font-size: 18px;
    padding: 20px 50px;
}

@keyframes stars {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg)
    }
}


@keyframes twinkle {
    1% {
        opacity: 0.5;
    }

    50% {
        opacity: 0.6;
    }

    0%,
    2%,
    40%,
    60%, 
    100% {
        opacity: 1;
    }
}
</style>`
            }
        ]
    },
    {
        lang: 'reactjs',
        tabs: [
            {
                label: 'spaceButton.js',
                default: true,
                code: `import React, { useState } from 'react';
import './spaceButton.css';

const SpaceButton = () => {
  const [cursorStyle, setCursorStyle] = useState({
    transform: 'translateX(0) translateY(0)',
  });
  const [stars, setStars] = useState([]);

  const starStyle = (star) => {
    return {
      top: star.y + 'px',
      left: star.x + 'px',
      width: star.size + 'px',
      animation: star.twinkle ? 'twinkle 2s infinite' : '',
      animationDelay: star.animationDelay + 's',
      opacity: star.opacity,
    };
  };

  const starsBySize = (size) => {
    return stars.filter((star) => star.size === size);
  };

  const randomNum = (max) => {
    return Math.floor(Math.random() * max) + 1;
  };

  const onMouseMove = (e) => {
    setCursorStyle({
      transform: ` + 'translateX(${e.nativeEvent.offsetX}px) translateY(${e.nativeEvent.offsetY}px) ' + `,
    });
  };

  const onMouseEnter = (e) => {
    const width = e.currentTarget.clientWidth * 1.1;
    const height = e.currentTarget.clientHeight;

    const nbStars = randomNum(width / 2);

    setStars([]);
    for (let i = 0; i < nbStars; i++) {
      setStars((prevStars) => [
        ...prevStars,
        {
          x: randomNum(width),
          y: randomNum(width),
          size: randomNum(2),
          twinkle: randomNum(2) === 1,
          animationDelay: randomNum(100) / 100,
          opacity: randomNum(100) / 100,
        },
      ]);
    }
  };

  const onMouseLeave = () => {
    // Handle mouse leave logic if needed
  };

  return (
    <button
      className="spaceButton"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="spaceButton--inner">
        <div className="spaceButton--background">
          <div className="spaceButton--background-border"></div>
          <div className="spaceButton--background-inner">
            <div className="spaceButton--background-cursor">
              <div className="spaceButton--background-cursor-in" style={cursorStyle}></div>
            </div>
          </div>
          <div className="spaceButton--background-stars">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className={`+ 'spaceButton-sizes-${index}' + `}
              >
                {starsBySize(index).map((star, idx) => (
                  <div
                    key={idx}
                    style={starStyle(star)}
                    className="spaceButton--background-star"
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <span className="spaceButton--text">
          {/* Your slot content goes here */}
        </span>
      </div>
    </button>
  );
};

export default SpaceButton;
`
            },
            {
                label: 'spaceButton.css',
                code: `.spaceButton {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
}

.spaceButton--inner {
  pointer-events: none;
}

.spaceButton--background {
  overflow: hidden;
  transform: scale(1);
  transition: transform 0.3s;
  box-shadow: 0 10px 20px -15px rgb(65, 64, 73);
  border-radius: 20px;
}

.spaceButton--background-cursor,
.spaceButton--background-inner,
.spaceButton--background-border,
.spaceButton--background {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  padding: 1px;
  border-radius: 20px;
  z-index: 0;
}

.spaceButton--background-border {
  transform: rotate(0deg);
  filter: blur(10px);
  opacity: 0.75;
  transition: transform 1s ease;
  transform-origin: center;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 10px white;

  &::after,
  &::before {
    position: absolute;
    content: '';
    width: 40px;
    height: 40px;
    border-radius: 50%;
    top: calc(100% - 25px);
    left: 10%;
    background: #591dfd;
    transform: scale(1);
    transition: transform 0.3s;
  }

  &::after {
    top: 0;
    right: -20px;
    left: auto;
    opacity: 0.5;
    background: white;
  }
}

.spaceButton--background-inner {
  z-index: 2;
  background: #100c1d;
  left: 1px;
  top: 1px;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
}

.spaceButton--background-cursor {
  opacity: 0;
  background: linear-gradient(45deg, #f122b3, #51b9ff);
  transition: opacity 0.3s;

  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.75;
    background: linear-gradient(-135deg, #7c22f1, #15e4d3);
  }
}

.spaceButton--background-cursor-in {
  position: absolute;
  top: -500px;
  left: -500px;
  width: 1000px;
  height: 1000px;
  border-radius: 50%;
  background: radial-gradient(rgba(0, 0, 0, 0) 0%, #100c1d 8%);
  transition: transform 0.3s;
}

.spaceButton--background-stars {
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  opacity: 0;
  animation: stars 100s linear infinite;
  transition: opacity 0.8s;
  width: 110%;
  aspect-ratio: 1/1;
  top: -55%;
  left: -5%;
  transform-origin: center;

  &.spaceButton-sizes-2 {
    animation: stars 200s linear infinite;
  }

  &.spaceButton-sizes-3 {
    animation: stars 300s linear infinite;
  }
}

.spaceButton--background-star {
  position: absolute;
  width: 2px;
  aspect-ratio: 1/1;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 20px white;
}

.spaceButton:hover {
  .spaceButton--background {
    transform: scale(1.05);
  }

  .spaceButton--background-border {
    transform: rotate(180deg);

    &::after,
    &::before {
      transform: scale(1.4);
    }
  }

  .spaceButton--background-cursor {
    opacity: 0.3;
  }

  .spaceButton--background-stars {
    opacity: 1;
  }
}

.spaceButton--text {
  position: relative;
  display: block;
  z-index: 3;
  color: white;
  font-size: 18px;
  padding: 20px 50px;
}

@keyframes stars {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes twinkle {
  1% {
    opacity: 0.5;
  }

  50% {
    opacity: 0.6;
  }

  0%,
  2%,
  40%,
  60%,
  100% {
    opacity: 1;
  }
}
                `
            }
        ]
    }
]

export default items;