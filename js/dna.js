/* ==================== DNA 粒子动画系统 ==================== */

/** 获取 Canvas 元素（仅当存在时执行） */
const canvas = document.getElementById('dna-canvas');

if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    
    /* ==================== 配置参数 ==================== */
    const particleCount = 180;       /* 粒子总数 */
    const radius = 80;               /* DNA 螺旋半径 */
    const speed = 0.02;              /* 动画速度 */
    const interactionRadius = 150;   /* 鼠标互动范围 */
    let mouse = { x: -1000, y: -1000 };  /* 鼠标位置追踪 */

    /* ==================== 粒子类定义 ==================== */
    
    /**
     * DNA 粒子类
     * 代表 DNA 螺旋中的单个粒子
     */
    class Particle {
        /**
         * 初始化粒子
         * @param {number} index - 粒子在螺旋中的索引位置
         */
        constructor(index) {
            this.index = index;
            this.strand = index % 2;           /* 0 或 1：代表螺旋的两条链 */
            this.x = 0;
            this.y = 0;
            this.baseX = 0;                    /* 基础 X 坐标（无鼠标影响） */
            this.baseY = 0;                    /* 基础 Y 坐标（无鼠标影响） */
            this.size = Math.random() * 2 + 1.5;
            /* 两条链用不同颜色：青色和绿色 */
            this.color = this.strand === 0 ? 'rgba(0, 217, 255, ' : 'rgba(0, 230, 118, ';
        }

        /**
         * 更新粒子位置
         * @param {number} time - 当前帧的时间值
         */
        update(time) {
            /* 计算水平位置分布 */
            const spread = width / (particleCount / 2);
            const normIndex = Math.floor(this.index / 2);
            this.baseX = normIndex * spread;

            /* 计算 DNA 螺旋参数 */
            const angle = (normIndex * 0.1) + time * speed;
            const offset = this.strand === 0 ? 0 : Math.PI;  /* 两条链相差 180° */

            /* 计算 3D 螺旋位置 */
            const z = Math.cos(angle + offset) * radius;     /* 深度值 */
            const yOffset = Math.sin(angle + offset) * radius;

            this.baseY = (height / 2) + yOffset;

            /* ==================== 鼠标交互逻辑 ==================== */
            const dx = mouse.x - this.baseX;
            const dy = mouse.y - this.baseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            /* 如果粒子在鼠标影响范围内，则推开 */
            if (distance < interactionRadius) {
                const force = (interactionRadius - distance) / interactionRadius;
                const repulsionStrength = 80;  /* 推开强度 */
                this.x = this.baseX - (dx / distance) * force * repulsionStrength;
                this.y = this.baseY - (dy / distance) * force * repulsionStrength;
            } else {
                /* 缓慢回到基础位置 */
                this.x += (this.baseX - this.x) * 0.05;
                this.y += (this.baseY - this.y) * 0.05;
            }

            /* 计算粒子大小和透明度（基于深度） */
            const depthScale = (z + 200) / 200;
            const alpha = Math.max(0.1, (z + radius) / (2 * radius));
            this.draw(ctx, depthScale, alpha);
        }

        /**
         * 绘制粒子
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D 上下文
         * @param {number} scale - 深度缩放因子
         * @param {number} alpha - 透明度值 [0, 1]
         */
        draw(ctx, scale, alpha) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * scale, 0, Math.PI * 2);
            ctx.fillStyle = this.color + alpha + ')';
            ctx.fill();
        }
    }

    /* ==================== 初始化和动画循环 ==================== */

    /**
     * 初始化 Canvas 和粒子系统
     */
    const init = () => {
        /* 设置 Canvas 大小为窗口大小 */
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        
        particles = [];
        
        /* 根据窗口宽度动态计算粒子数量（最多 400 个） */
        const count = Math.min(Math.ceil(width / 10) * 2, 400);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(i));
        }
    };

    /* 时间计数器 */
    let time = 0;

    /**
     * 动画循环 - 使用 requestAnimationFrame 持续更新
     */
    const animate = () => {
        /* 清空画布 */
        ctx.clearRect(0, 0, width, height);
        
        time++;
        
        /* 更新所有粒子 */
        particles.forEach(p => p.update(time));
        
        /* 继续下一帧 */
        requestAnimationFrame(animate);
    };

    /* ==================== 事件监听 ==================== */

    /* 窗口大小改变时重新初始化 */
    window.addEventListener('resize', init);

    /* 鼠标移动时更新鼠标位置 */
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    /* 启动系统 */
    init();
    animate();
}