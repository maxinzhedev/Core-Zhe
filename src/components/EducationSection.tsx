"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

interface Course {
  name: string;
  desc: string;
}

interface Education {
  degree: string;
  school: string;
  major: string;
  type: string;
  period: string;
  logo: string;
  courses: Course[];
}

const education: Education[] = [
  {
    degree: "硕士",
    school: "北京交通大学",
    major: "软件工程",
    type: "全日制工学硕士",
    period: "2015 - 2017",
    logo: "/pic/北交大.png",
    courses: [
      {
        name: "高级软件工程",
        desc: "研究软件开发全生命周期（SDLC），涵盖敏捷开发（Agile）、看板（Kanban）及增量模型。",
      },
      {
        name: "软件需求工程",
        desc: "学习如何识别商机并将其转化为 PRD。重点包括用例图（Use Case）、用户故事（User Story）及需求变更管理。",
      },
      {
        name: "软件体系结构",
        desc: "研究分层架构、微服务架构及事件驱动架构，对应 IoT 平台的研发经验。",
      },
      {
        name: "软件质量保证与测试",
        desc: "包含单元测试、集成测试以及多粒度等级测试。",
      },
      {
        name: "面向对象分析与设计",
        desc: "深入学习设计模式（工厂模式、观察者模式），理解 Salesforce 等低代码平台「元数据驱动」逻辑的基础。",
      },
      {
        name: "统一建模语言 (UML)",
        desc: "包括类图、序列图、状态机图等，用于描述复杂的 B 端业务流程（如 LTC/MTL 流程）。",
      },
      {
        name: "人机交互设计",
        desc: "研究界面表单、交互逻辑及用户体验（UX），对应对「角色使用体验」负责的要求。",
      },
      {
        name: "高级数据库系统",
        desc: "分布式数据库、查询优化、事务处理与并发控制。",
      },
      {
        name: "分布式计算与云计算",
        desc: "分布式系统原理、云计算架构设计与资源调度。",
      },
      {
        name: "软件项目管理",
        desc: "项目规划、风险管理、团队协作与交付管理。",
      },
    ],
  },
  {
    degree: "学士",
    school: "南京航空航天大学",
    major: "物联网工程",
    type: "全日制工学学士",
    period: "2011 - 2015",
    logo: "/pic/南航大.png",
    courses: [
      {
        name: "数据结构",
        desc: "线性表、树与二叉树、图论、查找与排序算法（具备 C/C++ 实现能力）。",
      },
      {
        name: "计算机组成原理",
        desc: "CPU 功能与结构、指令系统、存储器层次结构（Cache/主存）、总线与 I/O 系统。",
      },
      {
        name: "操作系统",
        desc: "进程管理（同步/互斥）、内存管理（分页/分段/虚拟存储）、文件系统、磁盘调度。",
      },
      {
        name: "计算机网络",
        desc: "OSI/TCP/IP 参考模型、物理层、数据链路层、网络层（IP/路由）、传输层（TCP/UDP）及应用层协议。",
      },
      {
        name: "嵌入式与硬件",
        desc: "单片机原理及应用、嵌入式系统设计、数字电路与逻辑设计。",
      },
      {
        name: "传感器与识别",
        desc: "传感器技术、RFID 原理与应用、无线传感器网络 (WSN)。",
      },
      {
        name: "通信基础",
        desc: "信号与系统、通信原理、短距离无线通信（Zigbee/蓝牙等）。",
      },
    ],
  },
];

const experiences = [
  { icon: "/pic/三星电子.png", text: "三星中国研究院实习" },
  { icon: "/pic/中科院.png", text: "中科院客座学生" },
];

const honors = ["班长", "优秀学生干部奖", "社会实践金奖", "校级奖学金", "校电视台主持人"];

/* ---- 211 Badge ---- */
function Badge211() {
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 leading-none">
      <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current" aria-hidden>
        <path d="M8 0l2.2 5.5L16 6.3l-4 3.7 1 5.5L8 12.8 2.9 15.5l1-5.5-4-3.7 5.8-.8z" />
      </svg>
      211
    </span>
  );
}

/* ---- Course Pill ---- */
function CoursePill({ course }: { course: Course }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`
          text-xs px-2.5 py-1 rounded-lg font-medium transition-all duration-200
          ${
            open
              ? "bg-electric-blue/15 text-electric-blue border-electric-blue/30"
              : "bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-white/50 border-slate-200/60 dark:border-white/[0.08]"
          }
          border hover:bg-electric-blue/10 hover:text-electric-blue hover:border-electric-blue/25
        `}
      >
        {course.name}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-0 top-full mt-1.5 w-64 md:w-72 p-3 rounded-xl
              bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10
              shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <p className="text-xs font-bold text-slate-700 dark:text-white/80 mb-1">
              {course.name}
            </p>
            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-white/50">
              {course.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---- Education Card ---- */
function EducationCard({
  item,
  index,
  isInView,
}: {
  item: Education;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="glow-border rounded-2xl p-6 md:p-8 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white dark:bg-white/10 border border-slate-100 dark:border-white/5 flex items-center justify-center overflow-hidden p-1.5">
          <Image
            src={item.logo}
            alt={item.school}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-electric-blue/10 text-electric-blue border border-electric-blue/20">
              {item.degree}
            </span>
            <Badge211 />
            <span className="text-xs font-mono text-slate-400 dark:text-white/30">
              {item.period}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">
            {item.school}
          </h3>
          <p className="text-sm text-slate-500 dark:text-white/50 mt-0.5">
            {item.major}
            <span className="text-slate-300 dark:text-white/20 mx-1.5">|</span>
            <span className="text-slate-400 dark:text-white/40">{item.type}</span>
          </p>
        </div>
      </div>

      {/* Courses */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
        <p className="text-[11px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-widest mb-3">
          Core Courses
        </p>
        <div className="flex flex-wrap gap-1.5">
          {item.courses.map((c) => (
            <CoursePill key={c.name} course={c} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ---- Section ---- */
export default function EducationSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-electric-blue/60 text-sm tracking-widest uppercase mb-3">
            02 / Education
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-800 dark:text-white">
            学习经历
          </h2>
          <p className="mt-3 text-slate-400 dark:text-white/40 max-w-lg">
            从物联网工程到软件工程，构建跨学科技术基底
          </p>
        </div>

        {/* Degree cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {education.map((item, index) => (
            <EducationCard
              key={item.school}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Experience & Honors row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {experiences.map((item, index) => (
            <motion.div
              key={item.text}
              className="glow-border rounded-2xl p-5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white dark:bg-white/10 border border-slate-100 dark:border-white/5 flex items-center justify-center overflow-hidden p-1">
                  <Image
                    src={item.icon}
                    alt={item.text}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-white/70">
                  {item.text}
                </span>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="glow-border rounded-2xl p-5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className="flex items-center gap-2 flex-wrap">
              {honors.map((h) => (
                <span
                  key={h}
                  className="text-xs font-mono px-2.5 py-1 rounded-full bg-gem-green/10 text-gem-green border border-gem-green/20"
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
