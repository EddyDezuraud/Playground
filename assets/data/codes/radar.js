const items = [
    {
        lang: 'vuejs',
        tabs: [
            {
                label: 'radar.vue',
                default: true,
                code: `<template>
                <div class="radar">
                    <div class="radar--inner"></div>
                    <div class="radar-axis-x"></div>
                    <div class="radar-axis-y"></div>
                </div>
            </template>
            
            <style>
            .radar {
                width: 120px;
                height: 120px;
                background: #0c0a13;
                border: solid 1px rgba(255, 255, 255, 0);
                border-radius: 50%;
                overflow: hidden;
                position: relative;
            }
            
            .radar::after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: radial-gradient(#0c0a13 0%, #0c0a13 20%, #5a1dff02 20.1%, #5a1dff02 22%, #0c0a13 22.1%, #0c0a13 35%, #5a1dff02 35.1%, #5a1dff02 36%, #0c0a13 36.1%, #0c0a13 49%, #5a1dff02 49.1%, #5a1dff02 50%, #0c0a13 50.1%, #0c0a13 62%, #5a1dff02 62.1%, #5a1dff02 63%, #0c0a13 63.1%, #0c0a13 100%);
                z-index: 1;
            }
            
            .radar,
            .radar-axis-x,
            .radar-axis-y {
                background: rgba(#591dfd, 0.05);
            }
            
            .radar::before {
                position: absolute;
                content: '';
                width: 60px;
                height: 60px;
                animation: radarRotation 2s infinite linear;
                transform-origin: bottom right;
                background: linear-gradient(90deg, #5a1dff, transparent);
                z-index: 0;
            }
            
            .radar-axis-y,
            .radar-axis-x {
                position: absolute;
                width: 100%;
                height: 1px;
                left: 0;
                top: 50%;
                overflow: hidden;
                z-index: 3;
            }
            
            .radar-axis-y::before {
                top: -60px;
                left: 0;
            }
            
            .radar-axis-y {
                width: 1px;
                height: 100%;
                left: 50%;
                top: 0;
            }
            
            .radar-axis-y::before {
                left: -60px;
                top: 0;
            }
            
            .radar--inner {
                z-index: 2;
                position: absolute;
                width: 60px;
                height: 60px;
                color: #591dfd;
                animation: radarRotation 2s infinite linear;
                transform-origin: bottom right;
                overflow: hidden;
                border-bottom: solid 1px #7e4fff;
                transform: rotate(0deg);
            }
            
            .radar--inner::after {
                position: absolute;
                content: "";
                left: 0%;
                bottom: 0;
                width: 100%;
                height: 40px;
                background: linear-gradient(40deg, white, currentColor 15%, currentColor 45%, transparent 46%);
                filter: blur(10px);
                opacity: 0.8;
            }
            
            @keyframes radarRotation {
                from {
                    transform: rotate(0deg);
                }
            
                to {
                    transform: rotate(-360deg);
                }
            }
            
            </style>`
            }
        ]
    },
];

export default items;