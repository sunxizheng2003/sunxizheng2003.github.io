import React, { useState, useEffect, useRef } from 'react';
import { 
  Leaf, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight,
  Github,
  ArrowUpRight,
  Mail
} from 'lucide-react';

// --- 自定义平台 Logo 图标 ---
const OrcidIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="12" className="fill-[#A6CE39] group-hover:fill-white transition-colors duration-300"/>
    <path d="M7.4 4.4c.5 0 .9.4.9.9s-.4.9-.9.9a.9.9 0 0 1-.9-.9c0-.5.4-.9.9-.9zm-.7 3h1.4v10H6.6v-10zm3.6 0h3.9c3.7 0 5.3 2.7 5.3 5 0 2.6-2 5-5.3 5h-3.9v-10zm1.4 1.3v7.4h2.3c3.3 0 4.1-2.6 4.1-3.7 0-1.2-.9-3.7-4-3.7h-2.3z" className="fill-white group-hover:fill-[#A6CE39] transition-colors duration-300"/>
  </svg>
);

const ScholarIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" className="fill-[#8BB4F7] group-hover:fill-white/70 transition-colors duration-300"/>
    <path d="M0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5 12 0 0 9.5z" className="fill-[#4285F4] group-hover:fill-white transition-colors duration-300"/>
  </svg>
);

const ResearchGateIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <text x="3" y="19" fontSize="18" fontFamily="Georgia, 'Times New Roman', serif" className="fill-current group-hover:fill-white transition-colors duration-300">R</text>
    <text x="15" y="11" fontSize="11" fontFamily="Georgia, 'Times New Roman', serif" className="fill-current group-hover:fill-white transition-colors duration-300">G</text>
  </svg>
);

// 完美的几何数学重构 Web of Science (Clarivate) 标志
// 核心逻辑：3个 2:1 长方形，坐标运用数学测算使得顶角绝对接触，内部形成完美正三角形
const WosIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <g transform="translate(12, 12)">
      {/* 左侧长方形 (支持 fill-current 自适应主题色) */}
      <rect x="-6.3094" y="-4" width="4" height="8" className="fill-current group-hover:fill-white transition-colors duration-300" />
      {/* 右下长方形 (绿色) */}
      <g transform="rotate(120)">
        <rect x="-6.3094" y="-4" width="4" height="8" className="fill-[#18D316] group-hover:fill-white transition-colors duration-300" />
      </g>
      {/* 右上长方形 (紫色) */}
      <g transform="rotate(240)">
        <rect x="-6.3094" y="-4" width="4" height="8" className="fill-[#8A2BE2] group-hover:fill-white transition-colors duration-300" />
      </g>
    </g>
  </svg>
);

// --- 滚动淡入动画组件 ---
const FadeInSection = ({ children, className = "" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1 });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- 主页面组件 ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { id: 'home', label: '首页', en: 'Home' },
    { id: 'about', label: '关于', en: 'About' },
    { id: 'research', label: '研究', en: 'Research' },
    { id: 'publications', label: '发表', en: 'Publications' },
    { id: 'cv', label: '简历', en: 'CV' }
  ];

  const handleNavClick = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 双语文本组件
  const BilingualText = ({ zh, en, zhClass = "", enClass = "block text-[0.8em] text-stone-400 font-light mt-0.5 tracking-wide" }) => (
    <span>
      <span className={zhClass}>{zh}</span>
      <span className={enClass}>{en}</span>
    </span>
  );

  // 北大官方 Logo URL
  const pkuLogoUrl = "https://www.pku.edu.cn/Uploads/Picture/2019/12/04/u5de790e64c817.png";

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 leading-relaxed">
      
      {/* 极简导航栏 */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-stone-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => handleNavClick('home')}>
              <Leaf className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col ml-2">
                <span className="text-lg font-bold text-stone-800 leading-none">林深</span>
                <span className="text-xs text-stone-400 font-medium tracking-widest mt-1 uppercase">Shen Lin</span>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="group flex flex-col items-center text-left focus:outline-none"
                >
                  <span className={`text-sm font-medium transition-colors duration-300 ${activeSection === link.id ? 'text-emerald-600' : 'text-stone-700 group-hover:text-emerald-500'}`}>
                    {link.label}
                  </span>
                  <span className={`text-[0.65rem] uppercase tracking-wider transition-colors duration-300 ${activeSection === link.id ? 'text-emerald-400' : 'text-stone-400 group-hover:text-emerald-300'}`}>
                    {link.en}
                  </span>
                  <div className={`h-0.5 w-full mt-1 rounded-full transition-all duration-300 ${activeSection === link.id ? 'bg-emerald-500 scale-x-100' : 'bg-transparent scale-x-0 group-hover:scale-x-100 group-hover:bg-emerald-200'}`} />
                </button>
              ))}
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-600">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero 首页区域 - 上下间距缩减，左右严格对齐，底部横栏 */}
      <section id="home" className="pt-24 pb-8 lg:pt-32 lg:pb-10 overflow-hidden relative min-h-[85vh] flex flex-col justify-center">
        <div className="absolute top-20 right-0 w-[40rem] h-[40rem] bg-emerald-100/50 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full flex flex-col flex-1">
          
          {/* 上半部：左侧文字，右侧图片 */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16 flex-1 py-10">
            
            {/* 左侧文本区 */}
            <FadeInSection className="md:w-[55%] lg:w-3/5 text-center md:text-left flex flex-col justify-center">
              <div className="inline-flex flex-col sm:flex-row items-center sm:space-x-4 mb-8 mx-auto md:mx-0 w-fit">
                <span className="text-emerald-700 font-medium tracking-wide">生态学博士候选人</span>
                <span className="hidden sm:inline text-stone-300">|</span>
                <span className="text-stone-400 font-light text-sm tracking-widest uppercase mt-1 sm:mt-0">Ph.D. Candidate in Ecology</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 mb-8 leading-tight">
                探索自然法则
                <span className="block mt-4 lg:mt-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  守护生物多样性
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-stone-400 font-light mb-8 tracking-wide">
                Exploring laws of nature, conserving biodiversity.
              </p>
              
              <div className="text-base text-stone-600 font-light max-w-2xl mx-auto md:mx-0 space-y-4">
                <p>你好！我是林深，北京大学城市与环境学院的在读博士生。我的研究重点是全球气候变化背景下高山植物群落的响应机制与适应策略。我致力于用数据和野外调查，为生态系统保护提供科学依据。</p>
                <p className="text-sm text-stone-400">Hello! I am Shen Lin, a Ph.D. student at the College of Urban and Environmental Sciences, Peking University. My research focuses on the response mechanisms and adaptation strategies of alpine plant communities under global climate change.</p>
              </div>
            </FadeInSection>
            
            {/* 右侧照片 - 尺寸已按要求缩小 */}
            <FadeInSection className="md:w-[45%] lg:w-2/5 flex justify-center md:justify-end">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200 to-teal-100 rounded-full blur-xl opacity-60 translate-x-4 translate-y-4"></div>
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="林深在野外工作" 
                  className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-xl z-10"
                />
              </div>
            </FadeInSection>

          </div>

          {/* 首页最下部：学术链接与邮箱全宽栏 */}
          <FadeInSection className="w-full border-t border-stone-200/60 pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap gap-4">
              {/* 各大平台：在浅色背景默认即显示自身品牌色，高亮吸睛 */}
              <a href="#" title="ORCID" className="w-11 h-11 rounded-full bg-white flex items-center justify-center hover:bg-[#A6CE39] transition-all duration-300 group shadow-sm border border-stone-200 hover:border-transparent hover:-translate-y-1">
                <OrcidIcon className="w-5 h-5 text-[#A6CE39] group-hover:text-white transition-colors" />
              </a>
              <a href="#" title="Google Scholar" className="w-11 h-11 rounded-full bg-white flex items-center justify-center hover:bg-[#4285F4] transition-all duration-300 group shadow-sm border border-stone-200 hover:border-transparent hover:-translate-y-1">
                <ScholarIcon className="w-5 h-5 transition-colors" />
              </a>
              <a href="#" title="ResearchGate" className="w-11 h-11 rounded-full bg-white flex items-center justify-center hover:bg-[#00CCBB] transition-all duration-300 group shadow-sm border border-stone-200 hover:border-transparent hover:-translate-y-1">
                <ResearchGateIcon className="w-5 h-5 text-[#00CCBB] group-hover:text-white transition-colors" />
              </a>
              <a href="#" title="Web of Science" className="w-11 h-11 rounded-full bg-white flex items-center justify-center hover:bg-[#5E33BF] transition-all duration-300 group shadow-sm border border-stone-200 hover:border-transparent hover:-translate-y-1">
                {/* 浅色背景下左侧设为深色 text-stone-700 */}
                <WosIcon className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors" />
              </a>
              <a href="#" title="GitHub" className="w-11 h-11 rounded-full bg-white flex items-center justify-center hover:bg-stone-800 transition-all duration-300 group shadow-sm border border-stone-200 hover:border-transparent hover:-translate-y-1">
                <Github className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors" />
              </a>
            </div>
            
            <a href="mailto:lin.shen@pku.edu.cn" className="inline-flex items-center text-stone-500 hover:text-emerald-600 font-medium transition-colors bg-white px-5 py-2.5 rounded-full border border-stone-200 shadow-sm hover:shadow-md">
              <Mail className="w-4 h-4 mr-2" /> lin.shen@pku.edu.cn
            </a>
          </FadeInSection>

        </div>
      </section>

      {/* 关于我 */}
      <section id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeInSection>
            <div className="flex items-center space-x-4 mb-12">
              <div className="w-2 h-10 bg-emerald-500 rounded-full"></div>
              <h2 className="text-3xl font-bold text-stone-900">
                <BilingualText zh="关于我" en="About Me" enClass="block text-lg text-stone-400 font-light mt-1 tracking-wider uppercase" />
              </h2>
            </div>
            
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-3 bg-white border border-stone-200 rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-8 text-stone-600 font-light leading-relaxed">
                  <div>
                    <p className="mb-2">我从小在多山的省份长大，对大自然有着天然的亲近感。本科期间在自然保护区的实习经历，让我深刻意识到生态系统在人类活动和气候变化面前的脆弱性，这也坚定了我走上生态学研究道路的决心。</p>
                    <p className="text-sm text-stone-400">Growing up in a mountainous province, I have a natural affinity for nature. My internship at a nature reserve during my undergraduate studies made me deeply realize the vulnerability of ecosystems to human activities and climate change.</p>
                  </div>
                  <div>
                    <p className="mb-2">目前，我在北京大学攻读博士学位。我的主要工具包括<strong>野外样方调查、控制实验、以及 R 语言空间数据分析</strong>。我坚信，扎实的理论研究是制定有效保护政策的基石。</p>
                    <p className="text-sm text-stone-400">Currently, I am pursuing my Ph.D. at Peking University. My primary tools include field quadrat surveys, controlled experiments, and spatial data analysis using R.</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 bg-stone-100/50 border border-stone-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-sm font-semibold text-stone-900 mb-6 tracking-widest uppercase flex items-center">
                  <Leaf className="w-4 h-4 text-emerald-600 mr-2" />
                  <BilingualText zh="研究兴趣" en="Research Interests" enClass="ml-2 text-stone-500 font-normal" />
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    {zh: '气候变化生态学', en: 'Climate Change Ecology'}, 
                    {zh: '植物功能性状', en: 'Plant Functional Traits'}, 
                    {zh: '生物多样性保护', en: 'Biodiversity Conservation'}, 
                    {zh: '高山生态系统', en: 'Alpine Ecosystems'}, 
                    {zh: '群落构建机制', en: 'Community Assembly'}
                  ].map((tag, index) => (
                    <div key={index} className="px-5 py-3 bg-white border border-stone-200 rounded-xl shadow-sm hover:border-emerald-300 transition-colors">
                      <p className="font-medium text-stone-800">{tag.zh}</p>
                      <p className="text-xs text-stone-400 font-light tracking-wide mt-1">{tag.en}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 研究内容 */}
      <section id="research" className="py-24 bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeInSection>
            <div className="flex items-center space-x-4 mb-12">
              <div className="w-2 h-10 bg-teal-500 rounded-full"></div>
              <h2 className="text-3xl font-bold text-stone-900">
                <BilingualText zh="研究内容" en="Research Focus" enClass="block text-lg text-stone-400 font-light mt-1 tracking-wider uppercase" />
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              <div className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="h-56 overflow-hidden bg-stone-100 border-b border-stone-100">
                  <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="高山生态" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-stone-900 mb-4 group-hover:text-emerald-600 transition-colors">
                    <BilingualText zh="青藏高原高山植物群落时空演变" en="Spatiotemporal Evolution of Alpine Plant Communities" />
                  </h3>
                  <div className="font-light space-y-2 mb-6 flex-1">
                    <p className="text-stone-600">基于长期的野外监测数据，结合遥感影像，分析过去三十年间高山林线交错区植物群落的物种组成变化及其对极端气候事件的响应。</p>
                    <p className="text-sm text-stone-400 line-clamp-3">Based on long-term field monitoring data and remote sensing imagery, this project analyzes the changes in species composition of plant communities in the alpine ecotone and their responses to extreme climate events over the past 30 years.</p>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-stone-200 rounded-lg text-sm font-medium text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors self-start">
                    <BilingualText zh="阅读详情" en="Read More" enClass="ml-1 text-[0.8em] font-light" /> <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>

              <div className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="h-56 overflow-hidden bg-stone-100 border-b border-stone-100">
                  <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="植物性状" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-stone-900 mb-4 group-hover:text-emerald-600 transition-colors">
                    <BilingualText zh="植物叶片经济谱的全球尺度验证" en="Global-Scale Validation of Leaf Economics Spectrum" />
                  </h3>
                  <div className="font-light space-y-2 mb-6 flex-1">
                    <p className="text-stone-600">整合全球不同气候带的植物功能性状数据，利用系统发育混和模型，重新评估“叶片经济谱”在不同生境类型下的普适性与变异规律。</p>
                    <p className="text-sm text-stone-400 line-clamp-3">Integrating global plant functional trait data across different climatic zones, this project uses phylogenetic mixed models to re-evaluate the universality and variation patterns of the leaf economics spectrum.</p>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-stone-200 rounded-lg text-sm font-medium text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors self-start">
                    <BilingualText zh="阅读详情" en="Read More" enClass="ml-1 text-[0.8em] font-light" /> <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 学术发表 */}
      <section id="publications" className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeInSection>
            <div className="flex items-center space-x-4 mb-12">
              <div className="w-2 h-10 bg-emerald-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-stone-900">
                <BilingualText zh="学术发表" en="Publications" enClass="block text-lg text-stone-400 font-light mt-1 tracking-wider uppercase" />
              </h2>
            </div>
            
            <div className="space-y-6">
              
              {/* 论文条目 1 - 图片卡片版 */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 md:p-6 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all duration-300 group flex flex-col md:flex-row gap-6 lg:gap-8 items-center md:items-stretch">
                <div className="w-full md:w-56 shrink-0 rounded-xl overflow-hidden border border-stone-100 aspect-[4/3] md:aspect-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1543332164-6e82f355badc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Paper Thumbnail" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center py-2">
                  <div className="inline-flex items-center space-x-3 mb-3">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded font-mono">2025</span>
                    <span className="text-stone-400 text-xs font-medium uppercase tracking-widest border-l border-stone-200 pl-3">Global Change Biology</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-stone-900 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
                    <BilingualText 
                      zh="气候变暖情境下高山植物群落结构的转变：一项年代际研究" 
                      en="Shifts in alpine plant community structure under warming scenarios: A decadal study" 
                    />
                  </h3>
                  <p className="text-stone-600 text-sm font-light mb-5">
                    <span className="font-semibold text-stone-900">Lin, S.</span>, Zhang, S., & Wang, L.
                  </p>
                  <div className="flex space-x-3 mt-auto">
                    <a href="#" className="px-4 py-1.5 bg-white border border-stone-200 rounded-md text-xs font-medium text-stone-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors flex items-center shadow-sm">
                      <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> PDF
                    </a>
                    <a href="#" className="px-4 py-1.5 bg-white border border-stone-200 rounded-md text-xs font-medium text-stone-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors flex items-center shadow-sm">
                      <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> DOI
                    </a>
                  </div>
                </div>
              </div>

              {/* 论文条目 2 - 图片卡片版 */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 md:p-6 shadow-sm hover:border-teal-300 hover:shadow-md transition-all duration-300 group flex flex-col md:flex-row gap-6 lg:gap-8 items-center md:items-stretch">
                <div className="w-full md:w-56 shrink-0 rounded-xl overflow-hidden border border-stone-100 aspect-[4/3] md:aspect-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1500829243541-74b676fecc20?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Paper Thumbnail" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center py-2">
                  <div className="inline-flex items-center space-x-3 mb-3">
                    <span className="px-2.5 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded font-mono">2024</span>
                    <span className="text-stone-400 text-xs font-medium uppercase tracking-widest border-l border-stone-200 pl-3">Journal of Ecology</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-stone-900 mb-2 leading-snug group-hover:text-teal-700 transition-colors">
                    <BilingualText 
                      zh="功能性状介导亚热带森林幼苗的抗旱性" 
                      en="Functional traits mediate drought resistance in sub-tropical forest seedlings" 
                    />
                  </h3>
                  <p className="text-stone-600 text-sm font-light mb-5">
                    Chen, J., <span className="font-semibold text-stone-900">Lin, S.</span>, & Zhang, S.
                  </p>
                  <div className="flex space-x-3 mt-auto">
                    <a href="#" className="px-4 py-1.5 bg-white border border-stone-200 rounded-md text-xs font-medium text-stone-600 hover:border-teal-500 hover:text-teal-600 transition-colors flex items-center shadow-sm">
                      <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> PDF
                    </a>
                  </div>
                </div>
              </div>

            </div>
            
            {/* 列表外链按钮优化：堆叠布局无分割线 */}
            <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
              <a href="#" className="group inline-flex flex-col items-center justify-center px-8 py-3.5 bg-white border border-stone-200 rounded-xl hover:border-emerald-500 hover:shadow-sm transition-all">
                <span className="flex items-center text-sm font-medium text-stone-700 group-hover:text-emerald-700">
                  在 Google Scholar 查看完整列表 <ExternalLink className="w-4 h-4 ml-1.5" />
                </span>
                <span className="text-[0.7rem] text-stone-400 font-light mt-1 tracking-wide uppercase group-hover:text-emerald-500/80 transition-colors">
                  View full list on Google Scholar
                </span>
              </a>
              <a href="#" className="group inline-flex flex-col items-center justify-center px-8 py-3.5 bg-white border border-stone-200 rounded-xl hover:border-emerald-500 hover:shadow-sm transition-all">
                <span className="flex items-center text-sm font-medium text-stone-700 group-hover:text-emerald-700">
                  在 ResearchGate 查看完整列表 <ExternalLink className="w-4 h-4 ml-1.5" />
                </span>
                <span className="text-[0.7rem] text-stone-400 font-light mt-1 tracking-wide uppercase group-hover:text-emerald-500/80 transition-colors">
                  View full list on ResearchGate
                </span>
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 简历 CV */}
      <section id="cv" className="py-24 bg-white border-t border-stone-200 relative overflow-hidden">
        {/* 背景超大号隐约北大水印 Logo */}
        <div className="absolute top-1/2 left-3/4 -translate-y-1/2 opacity-[0.03] pointer-events-none grayscale">
           <img src={pkuLogoUrl} alt="PKU watermark" className="w-[800px] h-[800px] object-contain" />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-10 bg-stone-800 rounded-full"></div>
                <h2 className="text-3xl font-bold text-stone-900">
                  <BilingualText zh="个人简历" en="Curriculum Vitae" enClass="block text-lg text-stone-400 font-light mt-1 tracking-wider uppercase" />
                </h2>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* 博士学历卡片 */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col md:flex-row gap-6 md:gap-10 group">
                {/* 左侧：高校标志与纯英年份 */}
                <div className="md:w-48 shrink-0 flex flex-col items-start border-b md:border-b-0 md:border-r border-stone-100 pb-6 md:pb-0 md:pr-6">
                  <img src={pkuLogoUrl} alt="Peking University Logo" className="w-16 h-16 object-contain mb-5 drop-shadow-sm" />
                  <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-100/50">
                    2026.09 - PRESENT
                  </span>
                </div>
                
                {/* 右侧：学历细节详情 */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="mb-5 pb-4 border-b border-stone-50">
                    <h3 className="text-xl md:text-2xl font-bold text-stone-900">北京大学，城市与环境学院</h3>
                    <p className="text-[0.7rem] text-stone-400 font-medium tracking-widest uppercase mt-1">Peking University, College of Urban and Environmental Sciences</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-stone-700 font-bold text-lg mb-1">理学博士，生态学</p>
                      <p className="text-sm text-stone-500 font-light">Ph.D. in Science, Ecology</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 本科学历卡片 */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md hover:border-stone-400 transition-all duration-300 flex flex-col md:flex-row gap-6 md:gap-10 group">
                {/* 左侧：高校标志与纯英年份 */}
                <div className="md:w-48 shrink-0 flex flex-col items-start border-b md:border-b-0 md:border-r border-stone-100 pb-6 md:pb-0 md:pr-6">
                  <img src={pkuLogoUrl} alt="Peking University Logo" className="w-16 h-16 object-contain mb-5 drop-shadow-sm opacity-90" />
                  <span className="text-stone-600 text-xs font-bold uppercase tracking-widest bg-stone-100 px-3 py-1.5 rounded-md border border-stone-200">
                    2022.09 - 2026.07
                  </span>
                </div>
                
                {/* 右侧：学历细节详情 */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="mb-5 pb-4 border-b border-stone-50">
                    <h3 className="text-xl md:text-2xl font-bold text-stone-900">北京大学，城市与环境学院</h3>
                    <p className="text-[0.7rem] text-stone-400 font-medium tracking-widest uppercase mt-1">Peking University, College of Urban and Environmental Sciences</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-stone-700 font-bold text-lg mb-1">理学学士，生态学</p>
                      <p className="text-sm text-stone-500 font-light">B.S., Ecology</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 极简深色页脚 */}
      <footer className="bg-[#0A0A0A] text-stone-400 py-20 border-t border-stone-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            
            {/* 左侧：联系方式 */}
            <div>
              <div className="flex items-center mb-6">
                <Leaf className="w-6 h-6 text-emerald-500 mr-3" />
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  林深 <span className="text-stone-600 mx-2">|</span> Shen Lin
                </h2>
              </div>
              <a href="mailto:lin.shen@pku.edu.cn" className="group inline-flex items-center text-lg text-stone-300 hover:text-white transition-colors">
                <span className="border-b border-stone-700 group-hover:border-emerald-500 transition-colors pb-1">
                  lin.shen@pku.edu.cn
                </span>
                <ArrowUpRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-emerald-500" />
              </a>
            </div>
            
            {/* 右侧：纯正圆形学术徽标 - 深色版 */}
            <div className="flex flex-wrap gap-5">
              <a href="#" title="ORCID" className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#A6CE39] hover:scale-110 transition-all duration-300 group border border-stone-800 hover:border-transparent shadow-lg">
                <OrcidIcon className="w-5 h-5" />
              </a>
              <a href="#" title="Google Scholar" className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#4285F4] hover:scale-110 transition-all duration-300 group border border-stone-800 hover:border-transparent shadow-lg">
                <ScholarIcon className="w-5 h-5" />
              </a>
              <a href="#" title="ResearchGate" className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#00CCBB] hover:scale-110 transition-all duration-300 group border border-stone-800 hover:border-transparent shadow-lg">
                <ResearchGateIcon className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors" />
              </a>
              <a href="#" title="Web of Science" className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#5E33BF] hover:scale-110 transition-all duration-300 group border border-stone-800 hover:border-transparent shadow-lg">
                {/* 页脚左侧图形自动使用 text-stone-400 (浅灰色) */}
                <WosIcon className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors" />
              </a>
              <a href="#" title="GitHub" className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-stone-700 hover:scale-110 transition-all duration-300 group border border-stone-800 hover:border-transparent shadow-lg">
                <Github className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
            
          </div>
          
          <div className="mt-20 flex flex-col sm:flex-row justify-between items-center text-xs font-light text-stone-600 uppercase tracking-widest border-t border-stone-800/50 pt-8">
            <p>© {new Date().getFullYear()} Peking University. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">Designed for Ecology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}