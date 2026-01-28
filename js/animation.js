/**
 * 动画模块 - 柔和宇宙线条效果
 * 配色：更柔和的渐变蓝紫色调
 * 面积：两侧各300px范围
 */

(function() {
    'use strict';

    // 配置参数 - 便于调整
    const CONFIG = {
        // 动画范围
        maxX: 300,           // 动画从边缘延伸的最大宽度
        
        // 元素数量
        beamCount: 25,       // 每侧光束数量
        starCount: 50,       // 每侧星星数量
        branchCount: 4,      // 每侧分支闪电数量
        
        // 颜色配置 - 更柔和的色调
        leftHueMin: 200,     // 左侧色相范围（蓝色系）
        leftHueMax: 220,
        rightHueMin: 250,    // 右侧色相范围（紫色系）
        rightHueMax: 280,
        
        // 透明度范围
        opacityMin: 0.15,
        opacityMax: 0.4,
        
        // 速度配置
        beamSpeedMin: 1.0,
        beamSpeedMax: 2.5
    };

    // 获取画布
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let time = 0;

    // 设置画布尺寸
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.body.scrollHeight;
    }

    /**
     * 垂直光束类 - 主要视觉元素
     */
    class VerticalBeam {
        constructor(side) {
            this.side = side;
            this.reset();
        }

        reset() {
            this.y = Math.random() * canvas.height;
            this.length = Math.random() * 250 + 100;
            this.x = Math.random() * CONFIG.maxX;
            this.speed = Math.random() * (CONFIG.beamSpeedMax - CONFIG.beamSpeedMin) + CONFIG.beamSpeedMin;
            this.opacity = Math.random() * (CONFIG.opacityMax - CONFIG.opacityMin) + CONFIG.opacityMin;
            
            // 柔和的渐变色调
            if (this.side === 'left') {
                this.hue = CONFIG.leftHueMin + Math.random() * (CONFIG.leftHueMax - CONFIG.leftHueMin);
            } else {
                this.hue = CONFIG.rightHueMin + Math.random() * (CONFIG.rightHueMax - CONFIG.rightHueMin);
            }
            
            this.width = Math.random() * 2.5 + 0.8;
            this.depth = Math.random();
            this.pulse = Math.random() * Math.PI * 2;
        }

        update() {
            this.pulse += 0.03; // 更慢的脉动
            if (this.side === 'left') {
                this.y += this.speed;
                if (this.y > canvas.height + this.length) {
                    this.reset();
                    this.y = -this.length;
                }
            } else {
                this.y -= this.speed;
                if (this.y < -this.length) {
                    this.reset();
                    this.y = canvas.height + this.length;
                }
            }
        }

        draw() {
            const depthScale = 0.4 + this.depth * 0.6;
            const pulseOpacity = this.opacity * (0.6 + Math.sin(this.pulse) * 0.4);
            let actualX, actualWidth;

            if (this.side === 'left') {
                actualX = this.x * depthScale;
            } else {
                actualX = canvas.width - this.x * depthScale;
            }
            actualWidth = this.width * depthScale;

            // 主光束渐变 - 更柔和
            const gradient = ctx.createLinearGradient(actualX, this.y, actualX, this.y + this.length);
            gradient.addColorStop(0, `hsla(${this.hue}, 60%, 70%, 0)`);
            gradient.addColorStop(0.2, `hsla(${this.hue}, 60%, 70%, ${pulseOpacity})`);
            gradient.addColorStop(0.5, `hsla(${this.hue}, 65%, 75%, ${pulseOpacity * 1.1})`);
            gradient.addColorStop(0.8, `hsla(${this.hue}, 60%, 70%, ${pulseOpacity})`);
            gradient.addColorStop(1, `hsla(${this.hue}, 60%, 70%, 0)`);

            ctx.beginPath();
            ctx.moveTo(actualX, this.y);
            ctx.lineTo(actualX, this.y + this.length);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = actualWidth;
            ctx.lineCap = 'round';
            ctx.stroke();

            // 柔和外层光晕
            ctx.beginPath();
            ctx.moveTo(actualX, this.y);
            ctx.lineTo(actualX, this.y + this.length);
            ctx.strokeStyle = `hsla(${this.hue}, 50%, 80%, ${pulseOpacity * 0.15})`;
            ctx.lineWidth = actualWidth + 12;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    }

    /**
     * 分支闪电类 - 偶尔出现的特效
     */
    class BranchLine {
        constructor(side) {
            this.side = side;
            this.reset();
        }

        reset() {
            this.active = false;
            this.startY = 0;
            this.segments = [];
            this.life = 0;
            this.maxLife = 40; // 持续时间更长
            if (this.side === 'left') {
                this.hue = CONFIG.leftHueMin + Math.random() * 20;
            } else {
                this.hue = CONFIG.rightHueMin + Math.random() * 20;
            }
        }

        activate() {
            this.active = true;
            this.life = 0;
            this.startY = Math.random() * canvas.height;
            this.segments = [];

            let x = this.side === 'left' ? 0 : canvas.width;
            let y = this.startY;
            const direction = this.side === 'left' ? 1 : -1;
            const segCount = Math.floor(Math.random() * 3) + 3;

            for (let i = 0; i < segCount; i++) {
                const nextX = x + direction * (Math.random() * 50 + 30);
                const nextY = y + (Math.random() - 0.5) * 50;
                this.segments.push({ x1: x, y1: y, x2: nextX, y2: nextY });
                x = nextX;
                y = nextY;
            }
        }

        update() {
            if (!this.active && Math.random() < 0.005) { // 更低的触发频率
                this.activate();
            }
            if (this.active) {
                this.life++;
                if (this.life >= this.maxLife) {
                    this.reset();
                }
            }
        }

        draw() {
            if (!this.active) return;

            const progress = this.life / this.maxLife;
            const opacity = Math.sin(progress * Math.PI) * 0.5; // 更柔和的透明度

            this.segments.forEach((seg, i) => {
                const segOpacity = opacity * (1 - i * 0.15);
                if (segOpacity <= 0) return;

                // 柔和的主线
                ctx.beginPath();
                ctx.moveTo(seg.x1, seg.y1);
                ctx.lineTo(seg.x2, seg.y2);
                ctx.strokeStyle = `hsla(${this.hue}, 50%, 75%, ${segOpacity})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // 更大的柔和光晕
                ctx.beginPath();
                ctx.moveTo(seg.x1, seg.y1);
                ctx.lineTo(seg.x2, seg.y2);
                ctx.strokeStyle = `hsla(${this.hue}, 40%, 85%, ${segOpacity * 0.3})`;
                ctx.lineWidth = 10;
                ctx.stroke();
            });
        }
    }

    /**
     * 星星粒子类 - 装饰性元素
     */
    class StarParticle {
        constructor(side) {
            this.side = side;
            this.reset();
        }

        reset() {
            this.x = Math.random() * CONFIG.maxX;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.8;
            this.opacity = Math.random() * 0.4 + 0.15;
            
            if (this.side === 'left') {
                this.hue = CONFIG.leftHueMin + Math.random() * 15;
            } else {
                this.hue = CONFIG.rightHueMin + Math.random() * 15;
            }
            
            this.twinkle = Math.random() * Math.PI * 2;
            this.twinkleSpeed = Math.random() * 0.06 + 0.02;
            this.vy = (Math.random() - 0.5) * 0.2;
        }

        update() {
            this.twinkle += this.twinkleSpeed;
            this.y += this.vy;
            if (this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            const actualOpacity = this.opacity * (0.4 + Math.sin(this.twinkle) * 0.6);
            const actualX = this.side === 'left' ? this.x : canvas.width - this.x;

            // 星星核心 - 更柔和
            ctx.beginPath();
            ctx.arc(actualX, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 50%, 85%, ${actualOpacity})`;
            ctx.fill();

            // 柔和光晕
            ctx.beginPath();
            ctx.arc(actualX, this.y, this.size * 4, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 40%, 80%, ${actualOpacity * 0.2})`;
            ctx.fill();
        }
    }

    // 存储所有动画元素
    const elements = {
        leftBeams: [],
        rightBeams: [],
        leftBranches: [],
        rightBranches: [],
        leftStars: [],
        rightStars: []
    };

    /**
     * 初始化所有动画元素
     */
    function initElements() {
        // 清空现有元素
        Object.keys(elements).forEach(key => elements[key] = []);

        // 创建光束
        for (let i = 0; i < CONFIG.beamCount; i++) {
            elements.leftBeams.push(new VerticalBeam('left'));
            elements.rightBeams.push(new VerticalBeam('right'));
        }

        // 创建分支闪电
        for (let i = 0; i < CONFIG.branchCount; i++) {
            elements.leftBranches.push(new BranchLine('left'));
            elements.rightBranches.push(new BranchLine('right'));
        }

        // 创建星星
        for (let i = 0; i < CONFIG.starCount; i++) {
            elements.leftStars.push(new StarParticle('left'));
            elements.rightStars.push(new StarParticle('right'));
        }
    }

    /**
     * 动画主循环
     */
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time++;

        // 绘制星星（底层）
        [...elements.leftStars, ...elements.rightStars].forEach(star => {
            star.update();
            star.draw();
        });

        // 绘制光束（中层）
        [...elements.leftBeams, ...elements.rightBeams].forEach(beam => {
            beam.update();
            beam.draw();
        });

        // 绘制分支闪电（顶层）
        [...elements.leftBranches, ...elements.rightBranches].forEach(branch => {
            branch.update();
            branch.draw();
        });

        requestAnimationFrame(animate);
    }

    /**
     * 处理窗口尺寸变化
     */
    function handleResize() {
        resizeCanvas();
    }

    /**
     * 处理滚动事件 - 更新画布高度
     */
    let scrollTimeout;
    function handleScroll() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            canvas.height = document.body.scrollHeight;
        }, 100);
    }

    // 初始化
    function init() {
        resizeCanvas();
        initElements();
        
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        
        animate();
    }

    // 页面加载完成后启动
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
