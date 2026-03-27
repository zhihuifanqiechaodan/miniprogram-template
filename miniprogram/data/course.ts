/**
 * 首页课程标签颜色类型
 */
export type CourseTagTone = 'neutral' | 'danger' | 'success';

/**
 * 课程标签数据结构
 */
export interface CourseTag {
  text: string;
  tone: CourseTagTone;
}

/**
 * 课程评价数据结构
 */
export interface CourseReview {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
}

/**
 * 课程评分项键名
 */
export type CourseRatingKey = 'difficulty' | 'homework' | 'grading' | 'harvest';

/**
 * 课程评分项色板类型
 */
export type CourseRatingTone = 'danger' | 'primary' | 'success' | 'warning';

/**
 * 课程评分项数据结构
 */
export interface CourseRatingItem {
  key: CourseRatingKey;
  label: string;
  value: number;
  displayValue: string;
  percent: number;
  tone: CourseRatingTone;
}

/**
 * 课程详情数据结构
 */
export interface CourseItem {
  id: number;
  badgeText: string;
  code: string;
  school: string;
  name: string;
  rating: string;
  reviewCount: number;
  badgeColor: string;
  tags: CourseTag[];
  description: string;
  overallRating: number;
  ratingItems: CourseRatingItem[];
  reviews: CourseReview[];
}

/**
 * 构建课程评分项列表
 * @param {{
 *   difficulty: number;
 *   homework: number;
 *   grading: number;
 *   harvest: number;
 * }} ratingValues 课程评分值
 * @returns {CourseRatingItem[]} 标准化后的课程评分项列表
 */
function createCourseRatingItems(ratingValues: {
  difficulty: number;
  homework: number;
  grading: number;
  harvest: number;
}): CourseRatingItem[] {
  return [
    {
      key: 'difficulty',
      label: '课程难度',
      value: ratingValues.difficulty,
      displayValue: ratingValues.difficulty.toFixed(1),
      percent: Math.round(ratingValues.difficulty * 20),
      tone: 'danger',
    },
    {
      key: 'homework',
      label: '作业多少',
      value: ratingValues.homework,
      displayValue: ratingValues.homework.toFixed(1),
      percent: Math.round(ratingValues.homework * 20),
      tone: 'primary',
    },
    {
      key: 'grading',
      label: '给分好坏',
      value: ratingValues.grading,
      displayValue: ratingValues.grading.toFixed(1),
      percent: Math.round(ratingValues.grading * 20),
      tone: 'success',
    },
    {
      key: 'harvest',
      label: '收获大小',
      value: ratingValues.harvest,
      displayValue: ratingValues.harvest.toFixed(1),
      percent: Math.round(ratingValues.harvest * 20),
      tone: 'warning',
    },
  ];
}

// 首页与详情页共享课程数据
export const courseCatalog: CourseItem[] = [
  {
    id: 1,
    badgeText: '9021',
    code: 'COMP9021',
    school: 'UNSW',
    name: 'Principles of Programming',
    rating: '4.8',
    reviewCount: 124,
    badgeColor: '#DBEAFE',
    tags: [
      { text: '硬核', tone: 'neutral' },
      { text: '作业多', tone: 'danger' },
      { text: '干货满满', tone: 'success' },
    ],
    description:
      '编程基础里的高口碑硬核课，重点覆盖 Python、递归、数据抽象与算法思维。作业量不小，但认真跟下来会明显提升写代码和拆解问题的能力。',
    overallRating: 4.8,
    ratingItems: createCourseRatingItems({
      difficulty: 3.5,
      homework: 4.0,
      grading: 3.0,
      harvest: 4.5,
    }),
    reviews: [
      {
        id: 101,
        author: 'Mia',
        avatar: 'M',
        date: '2026-03-05',
        content: '内容非常扎实，题目质量高，适合真正想补编程基本功的人。每周任务不少，但做完会有明显进步。',
      },
      {
        id: 102,
        author: 'Alex',
        avatar: 'A',
        date: '2026-02-20',
        content: '适合提前预习，尤其是 recursion 和 list processing。考试不算阴间，重点是平时一定要跟上节奏。',
      },
    ],
  },
  {
    id: 2,
    badgeText: '5001',
    code: 'FINC5001',
    school: 'USYD',
    name: 'Capital Markets and Corporate Finance',
    rating: '3.2',
    reviewCount: 89,
    badgeColor: '#FEE2E2',
    tags: [
      { text: '挂科率高', tone: 'danger' },
      { text: '理论课', tone: 'neutral' },
    ],
    description:
      '覆盖资本市场、融资决策和企业金融核心概念，理论密度高，阅读量也不低。对金融基础薄弱的同学来说，期中和期末都有明显压力。',
    overallRating: 3.2,
    ratingItems: createCourseRatingItems({
      difficulty: 4.2,
      homework: 4.3,
      grading: 2.2,
      harvest: 3.3,
    }),
    reviews: [
      {
        id: 201,
        author: 'Tom',
        avatar: 'T',
        date: '2026-03-01',
        content: '课程逻辑完整，但 lecture 信息量很大。建议配合 tutorial 提前梳理公式，不然临考前会很崩。',
      },
      {
        id: 202,
        author: 'Jerry',
        avatar: 'J',
        date: '2026-02-18',
        content: '老师讲得还行，但 grading 偏严格。适合愿意啃理论的同学，想轻松拿分的不建议碰。',
      },
    ],
  },
  {
    id: 3,
    badgeText: '1001',
    code: 'MKTG1001',
    school: 'USYD',
    name: 'Marketing Principles',
    rating: '4.5',
    reviewCount: 210,
    badgeColor: '#FFEDD5',
    tags: [
      { text: '水课', tone: 'success' },
      { text: '给分好', tone: 'success' },
      { text: '有趣', tone: 'success' },
    ],
    description:
      '典型的商科入门课，案例多、课堂互动多，整体节奏轻松。对想拉 GPA 的同学比较友好，适合作为平衡学期强度的课程。',
    overallRating: 4.5,
    ratingItems: createCourseRatingItems({
      difficulty: 2.0,
      homework: 2.3,
      grading: 4.4,
      harvest: 3.9,
    }),
    reviews: [
      {
        id: 301,
        author: 'Lily',
        avatar: 'L',
        date: '2026-03-09',
        content: 'group work 不算太折磨，平时多准备案例发言就行。final 也比较常规，适合求稳。',
      },
      {
        id: 302,
        author: 'Noah',
        avatar: 'N',
        date: '2026-02-26',
        content: '内容不难，老师讲得很有感染力。只要按 rubric 写作业，拿到不错分数并不难。',
      },
    ],
  },
  {
    id: 4,
    badgeText: '136',
    code: 'FIT9136',
    school: 'Monash',
    name: 'Algorithms and Programming',
    rating: '4.0',
    reviewCount: 56,
    badgeColor: '#E0E7FF',
    tags: [
      { text: 'Python', tone: 'neutral' },
      { text: '基础课', tone: 'neutral' },
    ],
    description:
      '面向零基础或转专业同学的编程入门课，内容覆盖 Python、基础算法和问题建模。难度控制合理，但需要持续练习。',
    overallRating: 4.0,
    ratingItems: createCourseRatingItems({
      difficulty: 2.8,
      homework: 2.9,
      grading: 3.6,
      harvest: 4.0,
    }),
    reviews: [
      {
        id: 401,
        author: 'Ethan',
        avatar: 'E',
        date: '2026-03-12',
        content: '教程做得比较循序渐进，适合补基础。assignment 不算难，但最好别拖到 ddl 前一天。',
      },
      {
        id: 402,
        author: 'Sophie',
        avatar: 'S',
        date: '2026-02-28',
        content: '如果之前没写过代码，这门课体验会比想象中好。多刷 lab，考试部分基本够用了。',
      },
    ],
  },
  {
    id: 5,
    badgeText: '1101',
    code: 'ACCT1101',
    school: 'UQ',
    name: 'Accounting for Decision Making',
    rating: '3.8',
    reviewCount: 102,
    badgeColor: '#DCFCE7',
    tags: [
      { text: '考试难', tone: 'danger' },
      { text: '必修', tone: 'neutral' },
    ],
    description:
      '会计核心概念和报表逻辑讲得比较系统，适合打基础。平时内容不算可怕，但期末综合性较强，需要提前刷题巩固。',
    overallRating: 3.8,
    ratingItems: createCourseRatingItems({
      difficulty: 3.5,
      homework: 3.2,
      grading: 3.1,
      harvest: 3.7,
    }),
    reviews: [
      {
        id: 501,
        author: 'Ava',
        avatar: 'A',
        date: '2026-03-03',
        content: 'tutorial 很关键，很多易错点都是在算题时暴露出来。背概念不够，必须自己做分录。',
      },
      {
        id: 502,
        author: 'Ryan',
        avatar: 'R',
        date: '2026-02-14',
        content: '作为商科基础课还算良心，但 final 确实不轻松。平时测验分一定要尽量拿满。',
      },
    ],
  },
  {
    id: 6,
    badgeText: '1111',
    code: 'ELEC1111',
    school: 'UNSW',
    name: 'Electrical Circuit Fundamentals',
    rating: '2.9',
    reviewCount: 45,
    badgeColor: '#F3E8FF',
    tags: [
      { text: '天书', tone: 'danger' },
      { text: '慎选', tone: 'danger' },
    ],
    description:
      '电路基础理论较多，知识点抽象，前几周没跟上后面会越听越痛苦。实验和理论都需要投入时间，选课前要评估自己基础。',
    overallRating: 2.9,
    ratingItems: createCourseRatingItems({
      difficulty: 4.6,
      homework: 4.4,
      grading: 1.8,
      harvest: 2.7,
    }),
    reviews: [
      {
        id: 601,
        author: 'Ben',
        avatar: 'B',
        date: '2026-03-08',
        content: '推导很多，lecture 节奏也偏快。适合有物理和电路底子的同学，零基础会比较折磨。',
      },
      {
        id: 602,
        author: 'Chloe',
        avatar: 'C',
        date: '2026-02-10',
        content: 'lab 不难，但考试题型变化比较大。建议多找往年题，单靠听课很难形成手感。',
      },
    ],
  },
];

// 默认课程详情 id
export const defaultCourseId = courseCatalog[0].id;

/**
 * 根据课程 id 获取课程详情
 * @param {number} id 课程 id
 * @returns {CourseItem} 匹配到的课程数据
 */
export function findCourseById(id: number): CourseItem {
  const matchedCourse = courseCatalog.find((course) => course.id === id);
  return matchedCourse || courseCatalog[0];
}
