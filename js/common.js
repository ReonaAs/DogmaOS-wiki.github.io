/* ==================== 初始化 ==================== */

// 初始化 Lucide 图标库
lucide.createIcons();

/* ==================== 移动端菜单功能 ==================== */

// 获取移动端菜单相关 DOM 元素
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// 移动端菜单按钮点击事件 - 切换菜单显示/隐藏
if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

/* ==================== 滚动时显示动画功能 ==================== */

// 当页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 获取所有需要显示动画的元素
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    
    // 给所有元素添加初始隐藏类
    reveals.forEach(el => el.classList.add('reveal-hidden'));

    // 创建 Intersection Observer 来监测元素是否进入视口
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 如果元素进入视口
            if (entry.isIntersecting) {
                // 添加显示类，移除隐藏类（触发过渡动画）
                entry.target.classList.add('reveal-visible');
                entry.target.classList.remove('reveal-hidden');
            }
        });
    }, {
        threshold: 0.1  /* 元素显示 10% 时触发 */
    });

    // 开始观察所有元素
    reveals.forEach(el => observer.observe(el));
    
    // ==================== 卡片渐进显示动画 ==================== 
    const cycleCards = document.querySelectorAll('.cycle-card');
    cycleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // ==================== 计数器动画 ====================
    const countElements = document.querySelectorAll('.count-number');
    const animateCounter = (element) => {
        if (!element.dataset.animated) {
            element.dataset.animated = true;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        element.classList.add('animate-pulse');
                        setTimeout(() => {
                            element.classList.remove('animate-pulse');
                        }, 1500);
                        observer.unobserve(element);
                    }
                });
            });
            observer.observe(element);
        }
    };
    countElements.forEach(animateCounter);

    // ==================== 工卡片悬停效果增强 ====================
    const hoverCards = document.querySelectorAll('.card-lift, .hover-scale');
    hoverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(0, 217, 255, 0.2)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // ==================== Protein mini-game (supports multiple instances) ====================
    (function initProteinGames(){
        const containers = document.querySelectorAll('.protein-game');
        if (!containers || containers.length === 0) return;

        containers.forEach(container => {
            const canvas = container.querySelector('.protein-canvas');
            const slider = container.parentElement.querySelector('.translation-rate');
            const msgEl = container.querySelector('.foldMessage');
            if (!canvas || !slider || !msgEl) return;

            const ctx = canvas.getContext('2d');
            const DPR = window.devicePixelRatio || 1;

            function resizeCanvas(){
                const rect = canvas.getBoundingClientRect();
                canvas.width = Math.max(300, Math.floor(rect.width * DPR));
                canvas.height = Math.max(200, Math.floor(rect.height * DPR));
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            const N = 80;
            let particles = [];
            let target = [];
            let folded = false;
            const optimizedCenter = 50;
            const optimizedRange = 4;

            function randInCircle(r){
                const a = Math.random()*Math.PI*2;
                const rr = Math.sqrt(Math.random())*r;
                return {x: Math.cos(a)*rr, y: Math.sin(a)*rr};
            }

            function initParticles(){
                const w = canvas.width / DPR;
                const h = canvas.height / DPR;
                particles = [];
                target = [];
                for(let i=0;i<N;i++){
                    const p = randInCircle(Math.min(w,h)*0.35);
                    particles.push({
                        x: w/2 + p.x + (Math.random()-0.5)*40,
                        y: h/2 + p.y + (Math.random()-0.5)*40,
                        baseX: w/2 + p.x,
                        baseY: h/2 + p.y,
                        color: 'rgba(255,100,100,0.95)'
                    });
                    const angle = (i/N)*Math.PI*2;
                    const radius = Math.min(w,h)*0.18*(1+0.12*Math.sin(angle*6));
                    target.push({x: w/2 + Math.cos(angle)*radius, y: h/2 + Math.sin(angle)*radius});
                }
                folded = false;
                msgEl.style.opacity = 0;
            }
            initParticles();

            function draw(){
                const w = canvas.width / DPR;
                const h = canvas.height / DPR;
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.save();
                ctx.scale(DPR,DPR);

                ctx.lineWidth = 0.6;
                for(let i=0;i<N;i++){
                    for(let j=i+1;j<N;j++){
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const d = Math.sqrt(dx*dx+dy*dy);
                        if (d < 60){
                            ctx.strokeStyle = 'rgba(70,200,255,'+ (0.08*(1-d/60)) +')';
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }

                for(let i=0;i<N;i++){
                    const p = particles[i];
                    ctx.beginPath();
                    ctx.fillStyle = p.color || 'rgba(200,200,255,0.95)';
                    ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
                    ctx.fill();
                }
                ctx.restore();
            }

            function step(){
                const rate = Number(slider.value);
                const norm = rate/100;
                const maxJitter = 8;
                const curJitter = 1 + norm*maxJitter;

                for(let i=0;i<N;i++){
                    const p = particles[i];
                    if (Math.abs(rate-optimizedCenter) <= optimizedRange){
                        const tx = target[i].x; const ty = target[i].y;
                        p.x += (tx - p.x) * 0.12;
                        p.y += (ty - p.y) * 0.12;
                        p.color = 'rgba(80,255,180,0.95)';
                    } else if (rate > 75){
                        p.x += (Math.random()-0.5)*curJitter*6;
                        p.y += (Math.random()-0.5)*curJitter*6;
                        p.color = 'rgba(255,80,80,0.95)';
                    } else {
                        p.x += (p.baseX - p.x)*0.08 + (Math.random()-0.5)*curJitter;
                        p.y += (p.baseY - p.y)*0.08 + (Math.random()-0.5)*curJitter;
                        p.color = 'rgba(200,220,255,0.95)';
                    }
                }

                if (!folded && Math.abs(Number(slider.value)-optimizedCenter) <= optimizedRange){
                    let close = true;
                    for(let i=0;i<N;i++){
                        const d = Math.hypot(particles[i].x - target[i].x, particles[i].y - target[i].y);
                        if (d > 6){ close = false; break; }
                    }
                    if (close){
                        folded = true;
                        msgEl.style.transition = 'opacity 0.4s ease';
                        msgEl.style.opacity = 1;
                        setTimeout(()=>{ msgEl.style.opacity = 0; }, 2200);
                    }
                } else if (folded && Math.abs(Number(slider.value)-optimizedCenter) > optimizedRange){
                    folded = false; msgEl.style.opacity = 0;
                }

                draw();
                requestAnimationFrame(step);
            }
            step();

            window.addEventListener('resize', ()=>{ initParticles(); resizeCanvas(); });
        });
    })();

    // ==================== mRNA + Ribosome SVG animation ====================
    (function initMrnaAnimation(){
        const svg = document.getElementById('mrna-svg');
        if (!svg) return;
        const rib = document.getElementById('ribosome');
        const chainPath = document.getElementById('chain-path');
        const bumpRegion = document.getElementById('bump-region');
        const misfoldLeft = document.getElementById('misfold-left');
        const foldRight = document.getElementById('fold-right');

        const startX = 80;
        const endX = 940;
        const bumpX = 540;
        const bumpHalfWidth = 140;
        if (bumpRegion){
            const bs = bumpX - bumpHalfWidth;
            const be = bumpX + bumpHalfWidth;
            bumpRegion.setAttribute('d', `M ${bs} 160 L ${be} 160`);
        }

        let x = startX;
        const fastSpeed = 4.2;
        const slowSpeed = 1.2;
        let vx = fastSpeed;
        const baseTailFast = 40;
        const baseTailSlow = 20;
        const maxTailExtended = 80;

        function makeWavyPoints(headX, tailLen){
            const pts = [];
            const t0 = Date.now()/160;
            tailLen = tailLen || baseTailFast;
            for (let i=0;i<tailLen;i++){
                const spacing = (i < Math.floor(tailLen*0.45)) ? 16 : 6;
                const nx = headX - i * spacing;
                const decay = 1 - (i / tailLen);
                const clusterFactor = (i > tailLen*0.4) ? (0.6 + (i/tailLen)) : 0.35;
                const noise = (Math.random()-0.5) * 24 * clusterFactor;
                const wobble = Math.sin(i*0.45 + t0*0.9) * (10 * decay);
                const ny = 140 - (i * 0.6) + wobble + noise;
                pts.push([nx, ny]);
            }
            return pts;
        }

        function makePolyPoints(headX, tailLen){
            const pts = [];
            const t0 = Date.now()/300;
            tailLen = tailLen || baseTailSlow;
            for (let i=0;i<tailLen;i++){
                const nx = headX - i*16;
                const fall = i * 0.35;
                const smoothNoise = Math.sin(i*0.25 + t0*0.6) * (4 * (1 - i/tailLen));
                const ny = 150 - fall + smoothNoise;
                pts.push([nx, ny]);
            }
            return pts;
        }

        function ptsToPath(pts, smooth){
            if (!pts || pts.length===0) return '';
            if (!smooth){
                return 'M ' + pts.map(p=>p[0] + ' ' + p[1]).join(' L ');
            }
            let d = 'M '+pts[0][0]+' '+pts[0][1];
            for (let i=1;i<pts.length;i++){
                const prev = pts[i-1];
                const cur = pts[i];
                const cx = (prev[0]+cur[0])/2;
                const cy = (prev[1]+cur[1])/2;
                d += ' Q '+prev[0]+' '+prev[1]+', '+cx+' '+cy;
            }
            const last = pts[pts.length-1];
            d += ' T '+last[0]+' '+last[1];
            return d;
        }

        function update(){
            x += vx;
            if (x > endX){ x = startX; vx = fastSpeed; }
            rib.setAttribute('transform', `translate(${x},160)`);

            const isFast = x < (bumpX - 8);

            if (isFast){
                const pts = makeWavyPoints(x - 12, baseTailFast);
                chainPath.setAttribute('d', ptsToPath(pts, true));
                chainPath.setAttribute('class', 'mrna-chain-fast');
                if (misfoldLeft) misfoldLeft.style.opacity = 1;
                if (foldRight) foldRight.style.opacity = 0;
                vx = fastSpeed;
            } else {
                const tailLen = Math.min(maxTailExtended, baseTailSlow + Math.floor((x - bumpX) / 4));
                const pts = makePolyPoints(x - 12, tailLen);
                chainPath.setAttribute('d', ptsToPath(pts, false));
                chainPath.setAttribute('class', 'mrna-chain-slow');
                if (misfoldLeft) misfoldLeft.style.opacity = 0;
                if (foldRight) foldRight.style.opacity = 1;
                if (vx > slowSpeed) vx = Math.max(slowSpeed, vx - 0.22);
            }

            if (bumpRegion){
                const dist = Math.abs(x - bumpX);
                const o = Math.max(0.25, 1 - (dist / 220));
                bumpRegion.style.opacity = o;
            }

            requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    })();
});

/* ==================== 导航栏滚动效果 ==================== */

// 获取导航栏元素
const navbar = document.getElementById('navbar');

// 窗口滚动事件监听
window.addEventListener('scroll', () => {
    // 如果向下滚动超过 20px
    if (window.scrollY > 20) {
        // 添加半透明背景和毛玻璃效果
        navbar.classList.add('bg-primary/90', 'backdrop-blur-md', 'border-b', 'border-accent/20');
        navbar.classList.remove('bg-transparent');
    } else {
        // 只在首页且位于页面顶部时使用透明效果
        if (document.title.includes('BioSynth')) {  /* 简单的首页检测 */
            navbar.classList.remove('bg-primary/90', 'backdrop-blur-md', 'border-b', 'border-accent/20');
            navbar.classList.add('bg-transparent');
        }
    }
});

/* ==================== 视差滚动效果（可选） ==================== */
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            const elements = document.querySelectorAll('[data-parallax]');
            
            elements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        });
        ticking = true;
    }
});

/* ==================== 平滑打字效果 ====================*/
function typeWriter(element, text, speed = 50) {
    if (!element) return;
    element.innerHTML = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}

/* ==================== 进度条动画触发 ====================*/
window.addEventListener('scroll', () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !bar.classList.contains('animate-progress')) {
            bar.classList.add('animate-progress');
        }
    });
});

/* ==================== 模式检测和动态主题 ====================*/
// 检测暗黑模式偏好
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.style.colorScheme = 'dark';
}
