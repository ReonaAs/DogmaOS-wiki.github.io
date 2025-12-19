/* ==================== 模型数据图表初始化 ==================== */

/**
 * 当页面加载完成后执行
 * 查找 Canvas 元素并初始化 Chart.js 图表
 */
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('modelChart');
    
    // 仅当 Canvas 元素存在时创建图表
    if (ctx) {
        // 获取 2D 绘图上下文
        const context = ctx.getContext('2d');
        
        /* ==================== 创建渐变背景 ==================== */
        // 从不透明青色渐变到透明
        const gradient = context.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(0, 217, 255, 0.8)');   /* 顶部：不透明 */
        gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');     /* 底部：透明 */

        /* ==================== 创建图表 ==================== */
        new Chart(ctx, {
            type: 'line',  /* 折线图类型 */
            data: {
                /* X 轴标签：时间（小时） */
                labels: ['0h', '2h', '4h', '6h', '8h', '10h', '12h'],
                
                datasets: [{
                    label: 'Concentration',  /* 数据集标签 */
                    data: [0, 15, 45, 80, 95, 98, 100],  /* Y 轴数据：浓度值 */
                    
                    /* ==================== 线条样式 ==================== */
                    borderColor: '#00d9ff',     /* 线条颜色：青色 */
                    backgroundColor: gradient,  /* 填充背景：渐变 */
                    borderWidth: 2,             /* 线条宽度 */
                    tension: 0.4,               /* 曲线平滑度 */
                    fill: true,                 /* 填充区域 */
                    
                    /* ==================== 数据点样式 ==================== */
                    pointBackgroundColor: '#1a2340',  /* 点的填充色 */
                    pointBorderColor: '#00d9ff',      /* 点的边框色 */
                    pointBorderWidth: 2,               /* 点的边框宽度 */
                    pointRadius: 4                     /* 点的大小 */
                }]
            },
            
            /* ==================== 图表配置选项 ==================== */
            options: {
                responsive: true,              /* 响应式布局 */
                maintainAspectRatio: false,    /* 不保持宽高比（允许自定义高度） */
                
                /* 插件配置 */
                plugins: {
                    legend: { display: false },  /* 隐藏图例 */
                    
                    /* 提示框样式 */
                    tooltip: {
                        backgroundColor: '#1a2340',   /* 提示框背景 */
                        titleColor: '#fff',           /* 标题文字颜色 */
                        bodyColor: '#00d9ff',         /* 内容文字颜色 */
                        borderColor: '#00d9ff',       /* 边框颜色 */
                        borderWidth: 1,               /* 边框宽度 */
                        padding: 10,                  /* 内边距 */
                        displayColors: false          /* 不显示颜色指示器 */
                    }
                },
                
                /* ==================== 坐标轴配置 ==================== */
                scales: {
                    /* X 轴（时间） */
                    x: {
                        grid: { color: '#333' },      /* 网格线颜色 */
                        ticks: { color: '#666' }      /* 刻度标签颜色 */
                    },
                    /* Y 轴（浓度） */
                    y: {
                        grid: { color: '#333' },      /* 网格线颜色 */
                        ticks: { color: '#666' }      /* 刻度标签颜色 */
                    }
                }
            }
        });
    }
});
