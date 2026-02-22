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
// 核心逻辑：更大半径的圆弧(弧度更平缓)，内外绝对平行，半径差(厚度)调小，内部形成带弧度正三角形镂空
const WosIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <g transform="translate(12, 12)">
      {/* 左侧弧形块 (支持 fill-current 自适应主题色) */}
      <path d="M -2.5 -4.33 A 80 80 0 0 0 -2.5 4.33 L -7 4.33 A 84.5 84.5 0 0 1 -7 -4.33 Z" className="fill-current group-hover:fill-white transition-colors duration-300" />
      {/* 右上弧形块 (紫色) */}
      <g transform="rotate(120)">
        <path d="M -2.5 -4.33 A 80 80 0 0 0 -2.5 4.33 L -7 4.33 A 84.5 84.5 0 0 1 -7 -4.33 Z" className="fill-[#8A2BE2] group-hover:fill-white transition-colors duration-300" />
      </g>
      {/* 右下弧形块 (绿色) */}
      <g transform="rotate(240)">
        <path d="M -2.5 -4.33 A 80 80 0 0 0 -2.5 4.33 L -7 4.33 A 84.5 84.5 0 0 1 -7 -4.33 Z" className="fill-[#18D316] group-hover:fill-white transition-colors duration-300" />
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
  const [selectedProject, setSelectedProject] = useState(null);

  const navLinks = [
    { id: 'home', label: '首页', en: 'Home' },
    { id: 'about', label: '关于', en: 'About' },
    { id: 'research', label: '研究', en: 'Research' },
    { id: 'publications', label: '发表', en: 'Publications' },
    { id: 'cv', label: '简历', en: 'CV' }
  ];

  const researchProjects = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      titleZh: "青藏高原高山植物群落时空演变",
      titleEn: "Spatiotemporal Evolution of Alpine Plant Communities",
      summaryZh: "基于长期的野外监测数据，结合遥感影像，分析过去三十年间高山林线交错区植物群落的物种组成变化及其对极端气候事件的响应。",
      summaryEn: "Based on long-term field monitoring data and remote sensing imagery, this project analyzes the changes in species composition of plant communities in the alpine ecotone and their responses to extreme climate events over the past 30 years.",
      detailsZh: [
        "高山生态系统对全球气候变化极为敏感。过去半个世纪以来，青藏高原经历了显著的升温过程。本项目依托连续 30 年的固定样地监测数据，旨在揭示高山林线交错区（Alpine Ecotone）植物群落结构的时空演变规律。",
        "在研究方法上，我们不仅采用了传统的样方调查记录物种多度与盖度，还引入了高分辨率无人机遥感技术，对群落尺度的空间格局进行精细刻画。结合气象站点的数据，我们建立了一系列线性混合效应模型（LMMs）。",
        "初步研究结果表明：随着极端干旱事件频率的增加，浅根系的草本植物丰度显著下降，而深根系的灌木逐渐占据主导地位。这一发现对于预测未来气候情境下高山生态系统功能的维持具有重要的指导意义。"
      ],
      detailsEn: [
        "Alpine ecosystems are highly sensitive to global climate change. Over the past half-century, the Qinghai-Tibet Plateau has experienced significant warming. Relying on 30 years of continuous permanent plot monitoring data, this project aims to reveal the spatiotemporal evolution rules of plant community structures in the alpine ecotone.",
        "Methodologically, in addition to traditional quadrat surveys to record species abundance and coverage, we introduced high-resolution UAV remote sensing technology to finely characterize the spatial patterns at the community scale. Combined with meteorological station data, we established a series of linear mixed-effect models (LMMs).",
        "Preliminary results indicate that with the increasing frequency of extreme drought events, the abundance of shallow-rooted herbaceous plants has significantly decreased, while deep-rooted shrubs have gradually taken dominance. This finding is of great guiding significance for predicting the maintenance of alpine ecosystem functions under future climate scenarios."
      ]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      titleZh: "植物叶片经济谱的全球尺度验证",
      titleEn: "Global-Scale Validation of Leaf Economics Spectrum",
      summaryZh: "整合全球不同气候带的植物功能性状数据，利用系统发育混和模型，重新评估“叶片经济谱”在不同生境类型下的普适性与变异规律。",
      summaryEn: "Integrating global plant functional trait data across different climatic zones, this project uses phylogenetic mixed models to re-evaluate the universality and variation patterns of the leaf economics spectrum.",
      detailsZh: [
        "“叶片经济谱 (Leaf Economics Spectrum, LES)” 是功能生态学领域的核心理论之一，它描述了植物在资源获取与资源保守之间的权衡策略。然而，该理论在某些极端生境（如极度干旱区或高寒地带）是否完全适用，目前仍存在争议。",
        "本研究通过整合 TRY 全球植物性状数据库（TRY Plant Trait Database）以及我们团队在实地测量的 500 多种植物性状数据，构建了一个包含 10,000 余个物种的庞大数据库。",
        "通过应用系统发育独立差（PIC）和系统发育广义线性混合模型（PGLMM），我们在控制了物种进化历史的背景下，深入剖析了气候因子（如年均温、年降水量）对性状协变关系的调控作用。结果发现，生境水分的可用性显著改变了比叶面积（SLA）与叶片氮含量之间的斜率关系。"
      ],
      detailsEn: [
        "The 'Leaf Economics Spectrum (LES)' is one of the core theories in functional ecology, describing the trade-off strategies of plants between resource acquisition and resource conservation. However, whether this theory is fully applicable in certain extreme habitats (such as extremely arid or cold regions) remains controversial.",
        "This study constructed a massive database containing over 10,000 species by integrating the TRY Plant Trait Database and the functional trait data of more than 500 plants measured by our team in the field.",
        "By applying Phylogenetic Independent Contrasts (PIC) and Phylogenetic Generalized Linear Mixed Models (PGLMM), we deeply analyzed the regulatory role of climate factors (e.g., MAT, MAP) on trait covariation while controlling for evolutionary history. The results found that habitat water availability significantly altered the slope relationship between Specific Leaf Area (SLA) and leaf nitrogen content."
      ]
    }
  ];

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

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

  const BilingualText = ({ zh, en, zhClass = "", enClass = "block text-[0.8em] text-stone-400 font-light mt-0.5 tracking-wide" }) => (
    <span>
      <span className={zhClass}>{zh}</span>
      <span className={enClass}>{en}</span>
    </span>
  );

  const pkuLogoUrl = "https://www.pku.edu.cn/Uploads/Picture/2019/12/04/u5de790e64c817.png";

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 leading-relaxed">
      
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          <div 
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProject(null)}
          ></div>
          
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-full animate-in fade-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 z-10 p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto p-6 md:p-10 lg:p-12 space-y-10">
              <div className="pr-12 border-b border-stone-100 pb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3 leading-snug">
                  {selectedProject.titleZh}
                </h2>
                <p className="text-stone-500 font-light text-sm md:text-base tracking-wide">
                  {selectedProject.titleEn}
                </p>
              </div>

              <div className="w-full h-56 sm:h-72 lg:h-80 rounded-xl overflow-hidden bg-stone-100">
                <img src={selectedProject.image} alt="Project Cover" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-1.5 h-6 bg-emerald-600 rounded-full"></div>
                  <h3 className="text-lg font-bold text-stone-900 tracking-widest">中文详情</h3>
                </div>
                {selectedProject.detailsZh.map((paragraph, index) => (
                  <p key={index} className="text-stone-700 leading-loose text-[1.05rem]">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="w-full h-px bg-stone-100"></div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-1.5 h-6 bg-stone-300 rounded-full"></div>
                  <h3 className="text-lg font-bold text-stone-400 tracking-widest uppercase">English Details</h3>
                </div>
                {selectedProject.detailsEn.map((paragraph, index) => (
                  <p key={index} className="text-stone-500 leading-relaxed font-light text-[0.95rem]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-stone-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => handleNavClick('home')}>
              <Leaf className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col ml-2">
                <span className="text-lg font-bold text-stone-800 leading-none">孙熙正</span>
                <span className="text-xs text-stone-400 font-medium tracking-widest mt-1 uppercase">Xi-Zheng Sun</span>
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

      <section id="home" className="pt-24 pb-8 lg:pt-32 lg:pb-10 overflow-hidden relative min-h-[85vh] flex flex-col justify-center">
        <div className="absolute top-20 right-0 w-[40rem] h-[40rem] bg-emerald-100/50 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full flex flex-col flex-1">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16 flex-1 py-10">
            <FadeInSection className="md:w-[55%] lg:w-3/5 text-center md:text-left flex flex-col justify-center">
              <div className="inline-flex flex-col sm:flex-row items-center sm:space-x-4 mb-8 mx-auto md:mx-0 w-fit">
                <span className="text-emerald-700 font-medium tracking-wide">生态学本科生</span>
                <span className="hidden sm:inline text-stone-300">|</span>
                <span className="text-stone-400 font-light text-sm tracking-widest uppercase mt-1 sm:mt-0">B.S. Candidate in Ecology</span>
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
                <p>你好！我是孙熙正，北京大学城市与环境学院的在读本科生。我正在尝试搭建个人网页，本网页中的内容纯属虚构，切勿当真。</p>
                <p className="text-sm text-stone-400">Hello! I am Shen Lin, a Ph.D. student at the College of Urban and Environmental Sciences, Peking University. My research focuses on the response mechanisms and adaptation strategies of alpine plant communities under global climate change.</p>
              </div>
            </FadeInSection>
            
            <FadeInSection className="md:w-[45%] lg:w-2/5 flex justify-center md:justify-end">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200 to-teal-100 rounded-full blur-xl opacity-60 translate-x-4 translate-y-4"></div>
                <img 
                  src="/images/avatar.jpg" 
                  alt="孙熙正" 
                  className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-xl z-10"
                />
              </div>
            </FadeInSection>
          </div>

          <FadeInSection className="w-full border-t border-stone-200/60 pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap gap-4">
              <a href="https://orcid.org/0009-0008-7367-6227" target="_blank" rel="noopener noreferrer" title="ORCID" className="w-11 h-11 rounded-full bg-white flex items-center justify-center hover:bg-[#A6CE39] transition-all duration-300 group shadow-sm border border-stone-200 hover:border-transparent hover:-translate-y-1">
                <OrcidIcon className="w-5 h-5 text-[#A6CE39] group-hover:text-white transition-colors" />
              </a>
              <a href="#" title="Google Scholar" className="w-11 h-11 rounded-full bg-white flex items-center justify-center hover:bg-[#4285F4] transition-all duration-300 group shadow-sm border border-stone-200 hover:border-transparent hover:-translate-y-1">
                <ScholarIcon className="w-5 h-5 transition-colors" />
              </a>
              <a href="https://www.researchgate.net/profile/Xi-Zheng-Sun" target="_blank" rel="noopener noreferrer" title="ResearchGate" className="w-11 h-11 rounded-full bg-white flex items-center justify-center hover:bg-[#00CCBB] transition-all duration-300 group shadow-sm border border-stone-200 hover:border-transparent hover:-translate-y-1">
                <ResearchGateIcon className="w-5 h-5 text-[#00CCBB] group-hover:text-white transition-colors" />
              </a>
              <a href="https://webofscience.clarivate.cn/wos/author/record/KGK-4195-2024" target="_blank" rel="noopener noreferrer" title="Web of Science" className="w-11 h-11 rounded-full bg-white flex items-center justify-center hover:bg-[#5E33BF] transition-all duration-300 group shadow-sm border border-stone-200 hover:border-transparent hover:-translate-y-1">
                <WosIcon className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors" />
              </a>
              <a href="https://github.com/sunxizheng2003" target="_blank" rel="noopener noreferrer" title="GitHub" className="w-11 h-11 rounded-full bg-white flex items-center justify-center hover:bg-stone-800 transition-all duration-300 group shadow-sm border border-stone-200 hover:border-transparent hover:-translate-y-1">
                <Github className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors" />
              </a>
            </div>
            
            <a href="mailto:sunxizheng@stu.pku.edu.cn" className="inline-flex items-center text-stone-500 hover:text-emerald-600 font-medium transition-colors bg-white px-5 py-2.5 rounded-full border border-stone-200 shadow-sm hover:shadow-md">
              <Mail className="w-4 h-4 mr-2" /> sunxizheng@stu.pku.edu.cn
            </a>
          </FadeInSection>
        </div>
      </section>

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
              {researchProjects.map((project) => (
                <div key={project.id} className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="h-56 overflow-hidden bg-stone-100 border-b border-stone-100 relative">
                    <img src={project.image} alt="Research Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-stone-900 mb-4 group-hover:text-emerald-600 transition-colors">
                      <BilingualText zh={project.titleZh} en={project.titleEn} />
                    </h3>
                    <div className="font-light space-y-2 mb-6 flex-1">
                      <p className="text-stone-600">{project.summaryZh}</p>
                      <p className="text-sm text-stone-400 line-clamp-3">{project.summaryEn}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center px-4 py-2 border border-stone-200 rounded-lg text-sm font-medium text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors self-start cursor-pointer"
                    >
                      <BilingualText zh="阅读详情" en="Read More" enClass="ml-1 text-[0.8em] font-light" /> <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

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
            
            <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
              <a href="#" className="group inline-flex flex-col items-center justify-center px-8 py-3.5 bg-white border border-stone-200 rounded-xl hover:border-emerald-500 hover:shadow-sm transition-all">
                <span className="flex items-center text-sm font-medium text-stone-700 group-hover:text-emerald-700">
                  在 Google Scholar 查看完整列表 <ExternalLink className="w-4 h-4 ml-1.5" />
                </span>
                <span className="text-[0.7rem] text-stone-400 font-light mt-1 tracking-wide uppercase group-hover:text-emerald-500/80 transition-colors">
                  View full list on Google Scholar
                </span>
              </a>
              <a href="https://www.researchgate.net/profile/Xi-Zheng-Sun" target="_blank" rel="noopener noreferrer" className="group inline-flex flex-col items-center justify-center px-8 py-3.5 bg-white border border-stone-200 rounded-xl hover:border-emerald-500 hover:shadow-sm transition-all">
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
        {/* 背景超大号隐约北大水印 Logo 已移除 */}

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

            <div className="space-y-8">
              
              {/* 博士学历卡片 */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300 group flex flex-col md:block">
                
                {/* 桌面端：CSS Grid 精确空隙对齐 (左列加宽到12rem避免换行溢出) */}
                <div className="hidden md:grid grid-cols-[12rem_1fr] gap-x-8">
                  {/* 第一行：学校 */}
                  <div className="flex items-center border-r border-stone-100 pb-7 pr-6">
                    <img src={pkuLogoUrl} alt="Peking University Logo" className="w-[4.25rem] h-[4.25rem] object-contain drop-shadow-sm" />
                  </div>
                  <div className="flex flex-col justify-center border-b border-stone-50 pb-7">
                    <h3 className="text-xl md:text-2xl font-bold text-stone-900 leading-tight">北京大学，城市与环境学院</h3>
                    <p className="text-[0.7rem] text-stone-400 font-medium tracking-widest uppercase mt-1.5">Peking University, College of Urban and Environmental Sciences</p>
                  </div>
                  
                  {/* 第二行：学位 - 添加了 whitespace-nowrap 保证在一行显示 */}
                  <div className="flex items-center border-r border-stone-100 pt-7 pr-6">
                    <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-100/50 whitespace-nowrap">
                      2026.09 - PRESENT
                    </span>
                  </div>
                  <div className="flex flex-col justify-center pt-7">
                    <p className="text-stone-700 font-bold text-[1.1rem] mb-1">理学博士，生态学</p>
                    <p className="text-sm text-stone-500 font-light">Ph.D. in Science, Ecology</p>
                  </div>
                </div>

                {/* 移动端：保持优雅的堆叠结构 */}
                <div className="md:hidden flex flex-col">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-5 mb-5">
                    <img src={pkuLogoUrl} alt="Peking University Logo" className="w-14 h-14 object-contain drop-shadow-sm" />
                    <span className="text-emerald-700 text-[0.65rem] font-bold uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded border border-emerald-100/50 whitespace-nowrap">
                      2026.09 - PRESENT
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 leading-tight">北京大学，城市与环境学院</h3>
                      <p className="text-[0.65rem] text-stone-400 font-medium tracking-widest uppercase mt-1">Peking University, College of Urban and Environmental Sciences</p>
                    </div>
                    <div>
                      <p className="text-stone-700 font-bold text-lg mb-0.5">理学博士，生态学</p>
                      <p className="text-sm text-stone-500 font-light">Ph.D. in Science, Ecology</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 本科学历卡片 */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md hover:border-stone-400 transition-all duration-300 group flex flex-col md:block">
                
                {/* 桌面端：CSS Grid */}
                <div className="hidden md:grid grid-cols-[12rem_1fr] gap-x-8">
                  {/* 第一行：学校 */}
                  <div className="flex items-center border-r border-stone-100 pb-7 pr-6">
                    <img src={pkuLogoUrl} alt="Peking University Logo" className="w-[4.25rem] h-[4.25rem] object-contain drop-shadow-sm opacity-90" />
                  </div>
                  <div className="flex flex-col justify-center border-b border-stone-50 pb-7">
                    <h3 className="text-xl md:text-2xl font-bold text-stone-900 leading-tight">北京大学，城市与环境学院</h3>
                    <p className="text-[0.7rem] text-stone-400 font-medium tracking-widest uppercase mt-1.5">Peking University, College of Urban and Environmental Sciences</p>
                  </div>
                  
                  {/* 第二行：学位 - 添加了 whitespace-nowrap 保证在一行显示 */}
                  <div className="flex items-center border-r border-stone-100 pt-7 pr-6">
                    <span className="text-stone-600 text-xs font-bold uppercase tracking-widest bg-stone-100 px-3 py-1.5 rounded-md border border-stone-200 whitespace-nowrap">
                      2022.09 - 2026.07
                    </span>
                  </div>
                  <div className="flex flex-col justify-center pt-7">
                    <p className="text-stone-700 font-bold text-[1.1rem] mb-1">理学学士，生态学</p>
                    <p className="text-sm text-stone-500 font-light">Bachelor of Science, Ecology</p>
                  </div>
                </div>

                {/* 移动端：保持优雅的堆叠结构 */}
                <div className="md:hidden flex flex-col">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-5 mb-5">
                    <img src={pkuLogoUrl} alt="Peking University Logo" className="w-14 h-14 object-contain drop-shadow-sm opacity-90" />
                    <span className="text-stone-600 text-[0.65rem] font-bold uppercase tracking-widest bg-stone-100 px-2 py-1 rounded border border-stone-200 whitespace-nowrap">
                      2022.09 - 2026.07
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 leading-tight">北京大学，城市与环境学院</h3>
                      <p className="text-[0.65rem] text-stone-400 font-medium tracking-widest uppercase mt-1">Peking University, College of Urban and Environmental Sciences</p>
                    </div>
                    <div>
                      <p className="text-stone-700 font-bold text-lg mb-0.5">理学学士，生态学</p>
                      <p className="text-sm text-stone-500 font-light">Bachelor of Science, Ecology</p>
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
            <div>
              <div className="flex items-center mb-6">
                <Leaf className="w-6 h-6 text-emerald-500 mr-3" />
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  孙熙正 <span className="text-stone-600 mx-2">|</span> Xi-Zheng Sun
                </h2>
              </div>
              <a href="mailto:sunxizheng@stu.pku.edu.cn" className="group inline-flex items-center text-lg text-stone-300 hover:text-white transition-colors">
                <span className="border-b border-stone-700 group-hover:border-emerald-500 transition-colors pb-1">
                  sunxizheng@stu.pku.edu.cn
                </span>
                <ArrowUpRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-emerald-500" />
              </a>
            </div>
            
            <div className="flex flex-wrap gap-5">
              <a href="https://orcid.org/0009-0008-7367-6227" target="_blank" rel="noopener noreferrer" title="ORCID" className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#A6CE39] hover:scale-110 transition-all duration-300 group border border-stone-800 hover:border-transparent shadow-lg">
                <OrcidIcon className="w-5 h-5" />
              </a>
              <a href="#" title="Google Scholar" className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#4285F4] hover:scale-110 transition-all duration-300 group border border-stone-800 hover:border-transparent shadow-lg">
                <ScholarIcon className="w-5 h-5" />
              </a>
              <a href="https://www.researchgate.net/profile/Xi-Zheng-Sun" target="_blank" rel="noopener noreferrer" title="ResearchGate" className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#00CCBB] hover:scale-110 transition-all duration-300 group border border-stone-800 hover:border-transparent shadow-lg">
                <ResearchGateIcon className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://webofscience.clarivate.cn/wos/author/record/KGK-4195-2024" target="_blank" rel="noopener noreferrer" title="Web of Science" className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#5E33BF] hover:scale-110 transition-all duration-300 group border border-stone-800 hover:border-transparent shadow-lg">
                <WosIcon className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://github.com/sunxizheng2003" target="_blank" rel="noopener noreferrer" title="GitHub" className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-stone-700 hover:scale-110 transition-all duration-300 group border border-stone-800 hover:border-transparent shadow-lg">
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