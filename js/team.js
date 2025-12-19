/* ==================== 数据定义 ==================== */

/** 团队成员数据 - 完全按照文档中的分组 */
const MEMBERS_DATA = [
    // 团队领导
    { id: '1', name: 'Feiyu Yang', role: 'Student Team Leader', group: 'Wet Team', quote: 'Leading into the unknown with scientific rigor.', emoji: '🧬' },
    
    // 湿实验组成员 - 完全按照文档顺序
    { id: '2', name: 'Fangying Xiang', role: 'Researcher', group: 'Wet Team', quote: 'One micropipette at a time.', emoji: '🔬' },
    { id: '3', name: 'Ge Gao', role: 'Researcher', group: 'Wet Team', quote: 'Precision and passion in research.', emoji: '🔬' },
    { id: '5', name: 'Jiaxing Ye', role: 'Researcher', group: 'Wet Team', quote: 'Discovery through diligence.', emoji: '🔬' },
    { id: '6', name: 'Jiaying Gu', role: 'Researcher', group: 'Wet Team', quote: 'Innovation in the lab.', emoji: '🔬' },
    { id: '8', name: 'Ruizhong Shu', role: 'Researcher', group: 'Wet Team', quote: 'Dedicated to research excellence.', emoji: '🔬' },
    { id: '15', name: 'Yinren Zhao', role: 'Researcher', group: 'Wet Team', quote: 'Precision in science.', emoji: '🔬' },
    
    // 网络组成员 - 完全按照文档顺序
    { id: '4', name: 'Jiaqi Zheng', role: 'Frontend Lead', group: 'Web Team', quote: 'Coding DNA one byte at a time.', emoji: '💻' },
    { id: '7', name: 'Keyi Zhao', role: 'Designer', group: 'Web Team', quote: 'Making science beautiful.', emoji: '🎨' },
    
    // 人文实践组成员 - 完全按照文档顺序
    { id: '9', name: 'Ruoxuan Chen', role: 'Outreach', group: 'HP Team', quote: 'Connecting science with society.', emoji: '🤝' },
    { id: '10', name: 'Shunran Wang', role: 'Outreach', group: 'HP Team', quote: 'Building bridges in science.', emoji: '🤝' },
    { id: '12', name: 'Tianle Yang', role: 'Outreach', group: 'HP Team', quote: 'Engagement through education.', emoji: '🤝' },
    { id: '13', name: 'Tingting Chen', role: 'Outreach', group: 'HP Team', quote: 'Science for everyone.', emoji: '🤝' },
    { id: '17', name: 'Yuehan Hu', role: 'Outreach', group: 'HP Team', quote: 'Public engagement in science.', emoji: '🤝' },
    { id: '18', name: 'Zhenyayuan Cao', role: 'Outreach', group: 'HP Team', quote: 'Science communication matters.', emoji: '🤝' },
    { id: '20', name: 'Ziyun Shi', role: 'Outreach', group: 'HP Team', quote: 'Sharing scientific knowledge.', emoji: '🤝' },
    
    // 模型组成员 - 完全按照文档顺序
    { id: '11', name: 'Siqi Liu', role: 'Modeler', group: 'Model Team', quote: 'Simulating biological systems.', emoji: '📊' },
    { id: '14', name: 'Yiming Huang', role: 'Modeler', group: 'Model Team', quote: 'Simulating the future.', emoji: '📊' },
    { id: '16', name: 'Yue Yu', role: 'Modeler', group: 'Model Team', quote: 'Data-driven discovery.', emoji: '📊' },
    { id: '19', name: 'Zixu Xu', role: 'Modeler', group: 'Model Team', quote: 'Modeling excellence.', emoji: '📊' },
    { id: '21', name: 'Ziming Sang', role: 'Data Analyst', group: 'Model Team', quote: 'Analyzing tRNA abundance and codon usage patterns.', emoji: '📊' },

    // 导师(PIs) - 完全按照文档顺序
    { id: '22', name: 'Yongtao Zhu', role: 'Principal Investigator', group: 'PI', quote: 'Mentoring the next generation.', emoji: '👨‍🎓' },
    { id: '23', name: 'Kevin C. Chan', role: 'Secondary Principal Investigator', group: 'PI', quote: 'Guiding discovery.', emoji: '👨‍🎓' },
    { id: '24', name: 'Ziwen Xie', role: 'Instructor', group: 'PI', quote: 'Supporting innovation.', emoji: '👨‍🎓' },
];

/** 项目活动时间线数据 - 仅保留文档中提到的活动 */
const ACTIVITIES = [
    { date: 'Jan 2025', title: 'Project Launch', description: 'Determined research direction and goals.', tags: ['Planning'] },
    { date: 'Mar 2025', title: 'Wet Lab Setup', description: 'Established strict safety protocols and calibrated equipment.', tags: ['Safety'] },
    { date: 'Jun 2025', title: 'Public Engagement', description: 'Community outreach event introducing synthetic biology.', tags: ['Education'] }
];

/** 致谢与支持数据 - 简化版 */
const ATTRIBUTIONS = [
    { 
        icon: 'graduation-cap', 
        title: 'Xi\'an Jiaotong-Liverpool University', 
        description: 'Provided lab facilities and funding.', 
        contributors: ['Dept of Biology', 'Library'] 
    },
    { 
        icon: 'users', 
        title: 'Mentors', 
        description: 'Academic guidance and methodology training.', 
        contributors: ['Prof. Zhu', 'Dr. Li'] 
    },
];

/** 团队照片 URL 列表 */
const PHOTOS = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2000&q=80'
];

/* ==================== 轮播功能 ==================== */

let currentPhotoIndex = 0;

/**
 * 设置照片轮播
 */
const setupCarousel = () => {
    const container = document.getElementById('carousel-container');
    const dotsContainer = document.getElementById('carousel-dots');
    if (!container) return;

    // 将所有照片添加到轮播容器中
    PHOTOS.forEach((photo, index) => {
        const div = document.createElement('div');
        div.className = `absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
        div.style.backgroundImage = `url('${photo}')`;
        div.id = `slide-${index}`;
        container.insertBefore(div, container.firstChild);

        // 为每张照片创建导航点
        const dot = document.createElement('button');
        dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === 0 ? 'bg-accent w-8' : 'bg-white/30'}`;
        dot.onclick = () => setSlide(index);
        dotsContainer.appendChild(dot);
    });

    // 设置自动轮播，每 5 秒切换一次
    setInterval(() => {
        setSlide((currentPhotoIndex + 1) % PHOTOS.length);
    }, 5000);
};

/**
 * 切换到指定照片
 */
const setSlide = (index) => {
    // 隐藏上一张
    document.getElementById(`slide-${currentPhotoIndex}`).classList.remove('opacity-100');
    document.getElementById(`slide-${currentPhotoIndex}`).classList.add('opacity-0');
    
    // 更新当前索引
    currentPhotoIndex = index;
    
    // 显示当前照片
    document.getElementById(`slide-${currentPhotoIndex}`).classList.add('opacity-100');
    document.getElementById(`slide-${currentPhotoIndex}`).classList.remove('opacity-0');

    // 更新导航点样式
    const dots = document.getElementById('carousel-dots').children;
    Array.from(dots).forEach((dot, idx) => {
        dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === index ? 'bg-accent w-8' : 'bg-white/30 hover:bg-white/60'}`;
    });
};

/* ==================== 成员过滤功能 ==================== */

/**
 * 渲染成员网格
 */
const renderMembers = (filter = 'All') => {
    const grid = document.getElementById('members-grid');
    if (!grid) return;
    
    // 根据筛选条件过滤成员
    const filtered = filter === 'All' ? MEMBERS_DATA : MEMBERS_DATA.filter(m => m.group === filter);
    
    // 生成成员卡片 HTML
    grid.innerHTML = filtered.map(m => `
        <div class="group relative bg-primary-light rounded-xl overflow-hidden border border-gray-800 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/10">
            <!-- 成员头像区域 -->
            <div class="h-56 bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                <span class="relative z-10 filter drop-shadow-lg">${m.emoji}</span>
                <!-- 团队颜色标识 -->
                <div class="absolute bottom-0 left-0 right-0 h-1 ${
                    m.group === 'Wet Team' ? 'bg-accent' :
                    m.group === 'Model Team' ? 'bg-purple-500' :
                    m.group === 'HP Team' ? 'bg-green-500' :
                    m.group === 'Web Team' ? 'bg-blue-500' : 'bg-yellow-500'
                }"></div>
            </div>
            <!-- 成员信息区域 -->
            <div class="p-6 relative bg-primary-light">
                <div class="absolute top-0 right-0 transform -translate-y-1/2 mr-6">
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-bold border shadow-sm backdrop-blur-md bg-gray-800 border-gray-500 text-gray-300">
                        ${m.group}
                    </span>
                </div>
                <h3 class="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">${m.name}</h3>
                <p class="text-sm text-gray-400 mb-4 font-medium">${m.role}</p>
                <div class="w-full h-px bg-gray-800 mb-4"></div>
                <p class="text-xs text-gray-500 italic leading-relaxed">"${m.quote}"</p>
            </div>
        </div>
    `).join('');
};

/**
 * 设置成员分类过滤按钮
 */
const setupFilters = () => {
    const container = document.getElementById('member-filters');
    if (!container) return;
    
    // 所有可用的分类 - 按照文档中的分组
    const cats = ['All', 'Wet Team', 'Model Team', 'HP Team', 'Web Team', 'PI'];
    
    // 生成过滤按钮
    container.innerHTML = cats.map(cat => `
        <button onclick="applyFilter('${cat}')" id="btn-${cat.replace(/\s/g, '-')}" 
        class="px-4 py-1.5 rounded-full text-sm border transition-all ${cat === 'All' ? 'border-accent text-accent bg-accent/10' : 'border-gray-700 text-gray-500'}">
            ${cat} ${cat !== 'All' ? `(${MEMBERS_DATA.filter(m => m.group === cat).length})` : ''}
        </button>
    `).join('');
};

/**
 * 应用成员筛选并更新 UI
 */
window.applyFilter = (cat) => {
    // 渲染符合分类的成员
    renderMembers(cat);
    
    // 重置所有按钮样式
    document.querySelectorAll('#member-filters button').forEach(btn => {
        btn.className = 'px-4 py-1.5 rounded-full text-sm border transition-all border-gray-700 text-gray-500 hover:border-gray-500';
    });
    
    // 高亮当前选中的按钮
    const activeBtn = document.getElementById(`btn-${cat.replace(/\s/g, '-')}`);
    if (activeBtn) activeBtn.className = 'px-4 py-1.5 rounded-full text-sm border transition-all border-accent text-accent bg-accent/10 shadow-[0_0_10px_rgba(0,217,255,0.2)]';
};

/* ==================== 其他标签页功能 ==================== */

/**
 * 渲染项目时间线
 */
const renderTimeline = () => {
    const container = document.getElementById('timeline-container');
    if (container) {
        container.innerHTML = ACTIVITIES.map(act => `
            <div class="relative group reveal-on-scroll">
                <!-- 时间线点 -->
                <div class="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-primary bg-accent shadow-[0_0_10px_#00d9ff] group-hover:scale-125 transition-transform duration-300"></div>
                
                <!-- 日期 -->
                <span class="text-accent font-mono text-sm mb-2 block font-bold">${act.date}</span>
                
                <!-- 活动卡片 -->
                <div class="bg-primary-light p-6 rounded-xl border border-gray-800 hover:border-accent/40 transition-colors shadow-lg">
                    <h3 class="text-xl font-bold text-white mb-2">${act.title}</h3>
                    <p class="text-gray-400 text-sm mb-4 leading-relaxed">${act.description}</p>
                    
                    <!-- 标签 -->
                    <div class="flex gap-2">
                        ${act.tags.map(tag => `<span class="px-2.5 py-1 rounded text-xs bg-gray-800/50 text-gray-300 border border-gray-700 font-medium">#${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
};

/**
 * 渲染致谢与支持信息
 */
const renderAttributions = () => {
    const grid = document.getElementById('attributions-grid');
    if (grid) {
        grid.innerHTML = ATTRIBUTIONS.map(attr => `
            <div class="bg-primary-light p-8 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-6 items-start hover:border-accent/30 transition-colors reveal-on-scroll">
                <!-- 图标区域 -->
                <div class="p-4 bg-primary rounded-xl text-accent border border-gray-800 shadow-inner">
                    <i data-lucide="${attr.icon}" class="w-8 h-8"></i>
                </div>
                
                <!-- 内容区域 -->
                <div class="flex-1">
                    <h3 class="text-xl font-bold text-white mb-2">${attr.title}</h3>
                    <p class="text-gray-400 mb-4 leading-relaxed">${attr.description}</p>
                    
                    <!-- 贡献者标签 -->
                    <div class="flex flex-wrap gap-2">
                        ${attr.contributors.map(c => `<span class="px-3 py-1 bg-accent/5 border border-accent/20 text-accent rounded-full text-sm font-medium hover:bg-accent/10 transition-colors">${c}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
        // 重新初始化新添加的图标
        lucide.createIcons();
    }
};

/* ==================== 页面初始化 ==================== */

/**
 * 页面加载完成后执行初始化
 */
document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有功能
    setupCarousel();
    setupFilters();
    renderMembers();
    renderTimeline();
    renderAttributions();

    // 根据 URL 哈希值滚动到对应部分
    const hash = window.location.hash.replace('#', '');
    if (hash && ['members', 'timeline', 'attributions', 'organization'].includes(hash)) {
        // 平滑滚动到对应部分
        setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});