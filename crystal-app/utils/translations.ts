
import { Language } from '../types';

export const translations = {
  zh: {
    appTitle: "Crystal Destiny",
    heroTitle: ["探寻命理", "五行", "之美"],
    heroSubtitle: "结合传统八字命理与现代能量美学，为您量身定制水晶守护方案。",
    input: {
      title: "开启您的晶石探索",
      subtitle: "输入生辰信息，测算五行喜忌",
      name: "姓名 / 昵称",
      namePlaceholder: "请输入您的名字",
      gender: "性别",
      male: "男",
      female: "女",
      birthTime: "出生时间",
      birthDate: "出生日期 (公历)",
      submit: "开始分析",
      loading: "正在测算天机..."
    },
    results: {
      pillars: "八字命盘",
      year: "年柱",
      month: "月柱",
      day: "日柱",
      hour: "时柱",
      analysis: "命理解析",
      distribution: "五行能量分布",
      strongest: "最强",
      weakest: "最弱",
      lucky: "喜用神",
      recommendation: "为您推荐的改运晶石",
      element: "五行属",
      reset: "重新测算",
      knowledgeTitle: "专属水晶能量指引"
    },
    knowledgeBase: {
      title: "水晶与五行能量百科",
      adviceTitle: "开运穿搭指南",
      intro: {
        title: "五行能量学说",
        content: "五行（金、木、水、火、土）是中国古代哲学的核心，代表了宇宙间万事万物的运行规律。水晶作为大自然的精华，拥有特定的振动频率和颜色，与五行能量有着天然的对应关系。通过佩戴合适的水晶，可以平衡人体磁场，补足先天命理的缺失，从而达到改善运势、调节情绪的效果。"
      },
      elements: [
        {
          key: 'metal',
          name: '金 (Metal)',
          color: '白色、金色、银色',
          traits: '决断、收敛、秩序',
          crystals: '白水晶、黄铁矿、月光石',
          desc: '金代表着坚毅与果断。金能量不足的人可能优柔寡断，过强则可能刚愎自用。白色系水晶能提升专注力，净化负面能量。',
          advice: '建议身着白色、杏色或金属色系服饰。佩戴白水晶、月光石或金银首饰，可增强气场中的“金”元素，提升决策力与领导威望。'
        },
        {
          key: 'wood',
          name: '木 (Wood)',
          color: '绿色、青色',
          traits: '生长、仁慈、创造',
          crystals: '绿幽灵、葡萄石、孔雀石',
          desc: '木代表着生机与成长。木能量有助于事业发展和身心健康。绿色系水晶能抚平情绪，带来财富与机遇。',
          advice: '建议多穿绿色、青色系衣物。佩戴绿幽灵、孔雀石或木质饰品，能生旺“木”气，带来生机勃勃的事业运与创意灵感。'
        },
        {
          key: 'water',
          name: '水 (Water)',
          color: '黑色、蓝色',
          traits: '智慧、流动、适应',
          crystals: '黑曜石、海蓝宝、青金石',
          desc: '水代表着智慧与灵动。水能量主导思维与人际交流。深色系水晶能吸收病气，增强洞察力与沟通能力。',
          advice: '建议穿着黑色、深蓝色或波浪纹样的服饰。佩戴黑曜石、海蓝宝或黑发晶，有助于补足“水”能量，增进智慧、灵感与人际流动。'
        },
        {
          key: 'fire',
          name: '火 (Fire)',
          color: '红色、紫色、粉色',
          traits: '热情、礼仪、光明',
          crystals: '紫水晶、红纹石、粉晶',
          desc: '火代表着活力与激情。火能量影响桃花人缘与行动力。红紫色系水晶能激发热情，招来贵人与美好姻缘。',
          advice: '建议搭配红色、紫色或粉色系衣裳。佩戴紫水晶、红纹石或粉晶，可点燃“火”之能量，提升个人魅力、桃花运及社交热情。'
        },
        {
          key: 'earth',
          name: '土 (Earth)',
          color: '黄色、棕色',
          traits: '稳重、承载、信用',
          crystals: '黄水晶、虎眼石、茶晶',
          desc: '土代表着稳固与承载。土能量关乎财富积累与安全感。黄色系水晶对应太阳轮，主偏财运，增强自信与稳定性。',
          advice: '建议穿着黄色、卡其色或大地色系服装。佩戴黄水晶、虎眼石或蜜蜡，能厚植“土”德，带来稳固的财运与安全感。'
        }
      ]
    },
    chat: {
      title: "水晶顾问",
      placeholder: "问问关于水晶、五行或运势的问题...",
      send: "发送",
      welcome: "你好！我是你的智能水晶顾问。有什么我可以帮你的吗？",
      thinking: "思考中..."
    },
    error: "分析服务暂时繁忙，请检查网络或稍后再试。",
    footerQuotes: [
      "宇宙的能量时刻守护着你，保持内心的光亮。",
      "每一次的相遇都是命中注定，相信美好的安排。",
      "水晶是凝固的光芒，愿它照亮你前行的路。",
      "你的能量决定你的运气，心存善念，必有后福。",
      "在这个喧嚣的世界里，愿你找到内心的宁静。",
      "相信直觉，它是灵魂在低语。",
      "调整频率，与美好同频共振。",
      "万物皆有灵，心诚则灵。",
      "你本自具足，水晶只是唤醒你内在的力量。",
      "愿你如水晶般剔透，也如磐石般坚定。"
    ],
    footerDisclaimer: "分析结果仅供娱乐与参考，相信科学，热爱生活。"
  },
  en: {
    appTitle: "Crystal Destiny",
    heroTitle: ["Discover the Beauty of", "Wu Xing", "Destiny"],
    heroSubtitle: "Combining traditional Ba Zi metaphysics with modern energy aesthetics to customize your crystal guardianship.",
    input: {
      title: "Start Your Crystal Journey",
      subtitle: "Enter birth details to analyze your Five Elements",
      name: "Name / Nickname",
      namePlaceholder: "Enter your name",
      gender: "Gender",
      male: "Male",
      female: "Female",
      birthTime: "Birth Time",
      birthDate: "Birth Date (Gregorian)",
      submit: "Analyze Destiny",
      loading: "Divining the heavens..."
    },
    results: {
      pillars: "Ba Zi Pillars",
      year: "Year",
      month: "Month",
      day: "Day",
      hour: "Hour",
      analysis: "Destiny Analysis",
      distribution: "Five Elements Distribution",
      strongest: "Strongest",
      weakest: "Weakest",
      lucky: "Lucky Element",
      recommendation: "Recommended Crystals",
      element: "Element: ",
      reset: "Start Over",
      knowledgeTitle: "Personalized Crystal Guidance"
    },
    knowledgeBase: {
      title: "Crystal & Wu Xing Encyclopedia",
      adviceTitle: "Lucky Styling Advice",
      intro: {
        title: "The Five Elements Theory",
        content: "Wu Xing (Metal, Wood, Water, Fire, Earth) is the core of ancient Chinese philosophy, representing the flow of universal energy. Crystals, as the essence of nature, possess specific vibrational frequencies and colors that correspond naturally to these elements. Wearing the right crystal can balance your bio-magnetic field and complement your destiny chart."
      },
      elements: [
        {
          key: 'metal',
          name: 'Metal',
          color: 'White, Gold, Silver',
          traits: 'Decision, Structure, Order',
          crystals: 'Clear Quartz, Pyrite, Moonstone',
          desc: 'Metal represents firmness and decision-making. White crystals enhance focus and purify negative energy.',
          advice: 'Recommended to wear white, beige, or metallic colors. Accessorize with Clear Quartz, Moonstone, or gold/silver jewelry to enhance the "Metal" aura, boosting decisiveness and leadership authority.'
        },
        {
          key: 'wood',
          name: 'Wood',
          color: 'Green, Cyan',
          traits: 'Growth, Kindness, Creation',
          crystals: 'Green Phantom, Prehnite, Malachite',
          desc: 'Wood represents vitality and growth. Green crystals correspond to the Heart Chakra, soothing emotions and attracting wealth.',
          advice: 'Recommended to wear green or cyan clothing. Wearing Green Phantom, Malachite, or wooden accessories can stimulate "Wood" energy, bringing vitality to career luck and creative inspiration.'
        },
        {
          key: 'water',
          name: 'Water',
          color: 'Black, Blue',
          traits: 'Wisdom, Flow, Adaptability',
          crystals: 'Obsidian, Aquamarine, Lapis Lazuli',
          desc: 'Water represents wisdom and fluidity. Dark/Blue crystals absorb negativity and enhance insight and communication.',
          advice: 'Recommended to wear black, deep blue, or wavy patterns. Accessorize with Obsidian, Aquamarine, or Black Rutilated Quartz to replenish "Water" energy, improving wisdom, intuition, and social flow.'
        },
        {
          key: 'fire',
          name: 'Fire',
          color: 'Red, Purple, Pink',
          traits: 'Passion, Etiquette, Light',
          crystals: 'Amethyst, Rhodochrosite, Rose Quartz',
          desc: 'Fire represents vitality and passion. Red/Purple crystals stimulate enthusiasm and attract romance and noble people.',
          advice: 'Recommended to match red, purple, or pink outfits. Wearing Amethyst, Rhodochrosite, or Rose Quartz can ignite "Fire" energy, enhancing personal charisma, romance, and social enthusiasm.'
        },
        {
          key: 'earth',
          name: 'Earth',
          color: 'Yellow, Brown',
          traits: 'Stability, Support, Trust',
          crystals: 'Citrine, Tiger Eye, Smoky Quartz',
          desc: 'Earth represents stability and grounding. Yellow crystals correspond to the Solar Plexus, enhancing wealth and confidence.',
          advice: 'Recommended to wear yellow, khaki, or earth tones. Accessorize with Citrine, Tiger Eye, or Amber to cultivate "Earth" virtue, bringing stable wealth and a sense of security.'
        }
      ]
    },
    chat: {
      title: "Crystal Consultant",
      placeholder: "Ask about crystals, elements, or luck...",
      send: "Send",
      welcome: "Hello! I am your Crystal Consultant. How can I assist you today?",
      thinking: "Thinking..."
    },
    error: "Analysis service is busy, please check your connection or try again later.",
    footerQuotes: [
      "The universe is always guiding you; keep your inner light bright.",
      "Every encounter is a destiny; trust in the beautiful arrangement.",
      "Crystals are frozen light, illuminating your path forward.",
      "Your energy determines your luck; kindness brings blessings.",
      "In this noisy world, may you find your inner peace.",
      "Trust your intuition; it is the soul whispering.",
      "Align your frequency to resonate with beauty.",
      "Believe in the magic within you.",
      "You are enough, the crystal just awakens your power.",
      "May you be as clear as quartz and as grounded as earth."
    ],
    footerDisclaimer: "Results are for reference/entertainment only. Trust science, love life."
  }
};

export const getTranslation = (lang: Language) => translations[lang];
