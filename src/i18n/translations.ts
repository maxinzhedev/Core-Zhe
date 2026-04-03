/** Centralized Chinese→English translation map.
 *  Components call `t(zhText, enText)` from LanguageContext.
 *  This file provides the English lookup for all hardcoded Chinese strings.
 */

const zh2en: Record<string, string> = {
  /* ── Hero ── */
  "AI时代的平台产品专家": "Platform Product Expert in the AI Era",
  "知行合一": "Unity of Knowledge and Action",
  "全局解题": "Systemic Solutions",
  "从一个具体问题出发，交付的是背后那套系统级的解决方案。": "Start with one real problem. Deliver the system behind it.",
  "秩序构建": "Building Order",
  "风控模型与流程体系，是业务高速运转的安全底座。": "Risk models and process frameworks that let the business move fast and stay safe.",
  "智能跃迁": "AI in Practice",
  "让AI真正扎进业务流程，改变团队实际的工作方式。": "Making AI a real part of how teams work — not just a slide in a deck.",

  /* ── Education Section ── */
  "学习经历": "Education",
  "从物联网工程到软件工程，构建跨学科技术基底":
    "From IoT to Software Engineering — an interdisciplinary technical foundation",
  "硕士": "Master",
  "学士": "Bachelor",
  "北京交通大学": "Beijing Jiaotong University",
  "南京航空航天大学": "Nanjing Univ. of Aeronautics & Astronautics",
  "软件工程": "Software Engineering",
  "物联网工程": "IoT Engineering",
  "全日制工学硕士": "Full-time M.Eng.",
  "全日制工学学士": "Full-time B.Eng.",
  // Master courses
  "高级软件工程": "Advanced Software Engineering",
  "软件需求工程": "Requirements Engineering",
  "软件体系结构": "Software Architecture",
  "软件质量保证与测试": "QA & Testing",
  "面向对象分析与设计": "OO Analysis & Design",
  "统一建模语言 (UML)": "UML Modeling",
  "人机交互设计": "HCI Design",
  "高级数据库系统": "Advanced Database Systems",
  "分布式计算与云计算": "Distributed & Cloud Computing",
  "软件项目管理": "Software Project Management",
  // Bachelor courses
  "数据结构": "Data Structures",
  "计算机组成原理": "Computer Architecture",
  "操作系统": "Operating Systems",
  "计算机网络": "Computer Networks",
  "嵌入式与硬件": "Embedded Systems & Hardware",
  "传感器与识别": "Sensors & RFID",
  "通信基础": "Communication Fundamentals",
  // Course descriptions (master)
  "研究软件开发全生命周期（SDLC），涵盖敏捷开发（Agile）、看板（Kanban）及增量模型。":
    "Study the full SDLC — Agile, Kanban and incremental models.",
  "学习如何识别商机并将其转化为 PRD。重点包括用例图（Use Case）、用户故事（User Story）及需求变更管理。":
    "Identify opportunities and convert them to PRDs. Covers Use Cases, User Stories and change management.",
  "研究分层架构、微服务架构及事件驱动架构，对应 IoT 平台的研发经验。":
    "Layered, microservices and event-driven architectures applied to IoT platform R&D.",
  "包含单元测试、集成测试以及多粒度等级测试。":
    "Unit testing, integration testing and multi-granularity testing.",
  "深入学习设计模式（工厂模式、观察者模式），理解 Salesforce 等低代码平台「元数据驱动」逻辑的基础。":
    "Design patterns (Factory, Observer) — the metadata-driven logic behind low-code platforms like Salesforce.",
  "包括类图、序列图、状态机图等，用于描述复杂的 B 端业务流程（如 LTC/MTL 流程）。":
    "Class, sequence and state-machine diagrams for complex B2B workflows (LTC / MTL).",
  "研究界面表单、交互逻辑及用户体验（UX），对应对「角色使用体验」负责的要求。":
    "UI forms, interaction logic and UX — responsible for role-specific user experience.",
  "分布式数据库、查询优化、事务处理与并发控制。":
    "Distributed databases, query optimization, transaction processing and concurrency control.",
  "分布式系统原理、云计算架构设计与资源调度。":
    "Distributed system principles, cloud architecture design and resource scheduling.",
  "项目规划、风险管理、团队协作与交付管理。":
    "Project planning, risk management, team collaboration and delivery management.",
  // Course descriptions (bachelor)
  "线性表、树与二叉树、图论、查找与排序算法（具备 C/C++ 实现能力）。":
    "Linear structures, trees, graphs, search & sort algorithms (C/C++ proficiency).",
  "CPU 功能与结构、指令系统、存储器层次结构（Cache/主存）、总线与 I/O 系统。":
    "CPU architecture, instruction set, memory hierarchy (cache/main), bus & I/O systems.",
  "进程管理（同步/互斥）、内存管理（分页/分段/虚拟存储）、文件系统、磁盘调度。":
    "Process management, memory management (paging/segmentation/virtual), filesystem & disk scheduling.",
  "OSI/TCP/IP 参考模型、物理层、数据链路层、网络层（IP/路由）、传输层（TCP/UDP）及应用层协议。":
    "OSI/TCP-IP stack — physical, data link, network (IP/routing), transport (TCP/UDP) and application layer.",
  "单片机原理及应用、嵌入式系统设计、数字电路与逻辑设计。":
    "MCU principles, embedded system design, digital circuits & logic design.",
  "传感器技术、RFID 原理与应用、无线传感器网络 (WSN)。":
    "Sensor tech, RFID principles & applications, WSN.",
  "信号与系统、通信原理、短距离无线通信（Zigbee/蓝牙等）。":
    "Signals & systems, communication principles, short-range wireless (Zigbee/BLE).",
  // Minor categories
  "企业级平台": "Enterprise Platforms",
  "管理与商科": "Management & Business",
  "前沿技术": "Frontier Tech",
  // Minor item names
  "PMP 项目管理": "PMP Project Management",
  "经济师": "Economist",
  "会计学 & 工商管理": "Accounting & Business Administration",
  // Minor item descriptions
  "全球领先的 CRM 及 AI Agent 平台，覆盖销售云、服务云、营销云及 Agentforce 自主 AI 智能体，赋能企业数字化转型与智能化运营。":
    "World-leading CRM & AI Agent platform — Sales Cloud, Service Cloud, Marketing Cloud and Agentforce autonomous AI agents.",
  "全球领先的企业管理软件，涵盖 ERP、S/4HANA、BTP 等，支撑大型企业财务、供应链、人力资源等核心业务流程。":
    "Leading enterprise software — ERP, S/4HANA, BTP supporting finance, supply chain and HR.",
  "微软低代码/无代码平台生态，包括 Power Apps、Power Automate、Power BI 和 Copilot Studio，快速构建业务应用与自动化工作流。":
    "Microsoft low-code ecosystem — Power Apps, Power Automate, Power BI and Copilot Studio.",
  "项目管理专业人士认证体系，涵盖项目启动、规划、执行、监控与收尾全生命周期，强调敏捷与预测混合方法论。":
    "PMP certification covering the full project lifecycle, emphasizing Agile-predictive hybrid methodology.",
  "经济专业技术资格，系统学习宏微观经济学、产业经济、金融市场与财政税收，提升商业分析与决策能力。":
    "Economist qualification — macro/microeconomics, industrial economics, finance & taxation.",
  "掌握财务报表分析、成本核算、管理会计及企业战略管理、市场营销、组织行为学等商科核心知识体系。":
    "Financial analysis, cost accounting, strategic management, marketing & organizational behavior.",
  "自主智能体技术，涵盖 LLM 驱动的 Agent 架构、RAG 检索增强、多 Agent 协作、Tool Use 及 Workflow 编排等前沿领域。":
    "Autonomous agent tech — LLM-driven Agent architectures, RAG, multi-agent collaboration, Tool Use & workflow orchestration.",
  "现代 DevOps 与持续交付平台，覆盖 CI/CD 流水线、特征标志、云成本管理及混沌工程，实现高效可靠的软件交付。":
    "Modern DevOps — CI/CD pipelines, feature flags, cloud cost management & chaos engineering.",
  "元数据驱动的应用构建范式，通过可视化建模、声明式配置和自动化代码生成，大幅提升业务应用交付效率。":
    "Metadata-driven app development — visual modeling, declarative config and automated code generation.",
  // Experiences & honors
  "三星中国研究院实习": "Samsung China R&D Center Intern",
  "赛格威机器人实习": "Segway Robotics Intern",
  "艺龙旅行网实习": "eLong Travel Intern",
  "实习经历": "Internship Experience",
  "校园荣誉": "Campus Honors",
  "中科院客座学生": "CAS Visiting Student",
  "班长": "Class President",
  "优秀学生干部奖": "Outstanding Student Leader",
  "社会实践金奖": "Social Practice Gold Award",
  "校级奖学金": "University Scholarship",
  "校电视台主持人": "University TV Host",
  "职业辅修": "Professional Minor",

  /* ── Career Section ── */
  "工作经历": "Career Experience",
  "从研发到产品，从IoT到云到星网，持续构建数字化平台能力":
    "From R&D to Product, IoT to Cloud to StarNet — building digital platform capabilities",
  "中国星网": "China StarNet",
  "应用研究院": "Applied Research Institute",
  "平台产品经理": "Platform Product Manager",
  "至今": "Present",
  "阿里巴巴": "Alibaba",
  "阿里云智能国际": "Alibaba Cloud International",
  "华为": "Huawei",
  "云与计算": "Cloud & Computing",
  "产品运营经理": "Product Operations Manager",
  "研发工程师 / 产品经理": "R&D Engineer / Product Manager",
  // Career tags
  "从0到1": "From 0 to 1",
  "AI提效": "AI Efficiency",
  "星座运营": "Constellation Ops",
  "全天候保障": "24/7 Assurance",
  "国际化": "Globalization",
  "渠道分销": "Channel Distribution",
  "全生命周期": "Full Lifecycle",
  "AI赋能B端": "AI-Empowered B2B",
  "风控体系": "Risk Control",
  "数据治理": "Data Governance",
  "总裁奖": "President Award",
  "IoT平台": "IoT Platform",
  "车联网": "Connected Cars",
  "低代码": "Low-Code",
  "国际大客户": "Global Key Accounts",
  // Career highlights
  "从0到1构建运营商智能运营服务平台，制定标准、流程、效能评估指标，应用AI提效赋能":
    "Built intelligent operations platform from scratch — defined standards, processes, KPIs and applied AI for efficiency",
  "涵盖服务保障系统、客服系统、项目管理系统等多个子系统":
    "Covers service assurance, customer service and project management subsystems",
  "跨集团拉通业务流程，完成流程、标准、数字化实现、运营计划全天候设计":
    "Aligned cross-group business processes — standards, digitalization and 24/7 operations design",
  "保障大系统按时交付支撑星座运营计划":
    "Ensured on-time delivery of core systems supporting constellation operation plans",
  "构建阿里云国际渠道分销业务全生命周期流程体系":
    "Built the full-lifecycle process for Alibaba Cloud international channel distribution",
  "覆盖分销商入驻、报价、签约、退出等全链路，及伙伴作业、出账、拓客等多角色商业流程":
    "Covered distributor onboarding, quoting, contracting, exit and multi-role business workflows",
  "对历史分销体系建立治理方针和准则":
    "Established governance policies for legacy distribution systems",
  "通过AI赋能B端产品降本增效、风险识别，包括伙伴风险预估、合同风险点标注":
    "Applied AI for cost reduction, risk identification — partner risk prediction and contract risk annotation",
  "于华为企业业务孵化华为云转型期，建立华为云分销风控体系":
    "Established Huawei Cloud distribution risk control system during enterprise-to-cloud transformation",
  "设计MTL、LTC三级流程，制定合作伙伴政策并推动数字化基础设施落地":
    "Designed MTL/LTC 3-tier processes, defined partner policies and drove digital infrastructure deployment",
  "对历史数据建立数据治理与集成标准，纳入新管控体系":
    "Built data governance and integration standards, integrating into the new control framework",
  "通过百余项佣金财务异常案例总结，发现各维度漏洞，推动重构分销履约链路":
    "Summarized 100+ commission anomaly cases, identified loopholes and drove fulfillment chain restructuring",
  "于华为物联网平台迎接国际头部车厂市场契机，实现车联网、车辆模型等SaaS应用落地":
    "Seized market opportunities with international automotive OEMs on Huawei IoT platform — delivered connected-car SaaS",
  "通过业务模型建设和迭代打磨用户需求与产品实现之间的鸿沟":
    "Bridged the gap between user requirements and product implementation through iterative business modeling",
  "建立研发文档技能库满足跨团队复用需求":
    "Built an R&D documentation knowledge base for cross-team reuse",
  "建立「故障处理-需求挖掘-分析评估-排期落地-客户教育」的B端产品迭代方法论":
    "Created a B2B iteration methodology: incident → requirement → analysis → scheduling → customer education",
  // Career metrics
  "服务事故": "Service Incidents",
  "客户投诉": "Customer Complaints",
  "入驻效率": "Onboarding Efficiency",
  "入驻成功率": "Onboarding Success Rate",
  "业务年增": "Annual Growth",
  "封堵风险资金": "Risk Capital Blocked",
  "荣誉": "Honor",
  "标杆客户": "Benchmark Clients",
  "标致/淡马锡": "Peugeot/Temasek",
  "创新": "Innovation",
  "低代码平台": "Low-Code Platform",
  // SVG labels
  "服务保障": "Service Assurance",
  "客服": "Customer Service",
  "项目管理": "Project Mgmt",
  "AI引擎": "AI Engine",
  "入驻": "Onboard",
  "报价": "Quote",
  "签约": "Contract",
  "作业": "Operate",
  "出账": "Billing",
  "退出": "Exit",
  "佣金审计": "Commission Audit",
  "财务异常": "Financial Anomaly",
  "合规校验": "Compliance Check",
  "L1 策略层": "L1 Strategy",
  "L2 管控层": "L2 Control",
  "L3 执行层": "L3 Execution",
  "车辆模型": "Vehicle Model",
  "低代码引擎": "Low-Code Engine",
  "数据分析": "Data Analytics",

  /* ── Projects Section ── */
  "项目复现": "Project Showcase",
  "可交互的产品原型，还原真实业务场景与设计思路":
    "Interactive prototypes recreating real business scenarios and design thinking",
  "云分销管理系统": "Cloud Distribution CRM",
  "智能客服工作台": "AI Service Workbench",
  "面向国际云市场的渠道分销全生命周期管理平台，覆盖伙伴入驻、报价、签约、出账、退出等核心商业流程，支撑业务年增20%战略目标。":
    "Full-lifecycle channel distribution platform for global cloud market — onboarding, quoting, contracting, billing and exit, supporting 20% annual growth target.",
  "基于AI Agent的智能运营客服平台，融合故障诊断、工单流转、知识库检索等能力，实现服务保障0事故、0投诉的星座运营目标。":
    "AI Agent-powered intelligent operations platform — integrating fault diagnosis, ticket workflow and knowledge retrieval for zero-incident, zero-complaint operations.",
  "渠道管理": "Channel Mgmt",
  "风控引擎": "Risk Engine",
  "AI Agent": "AI Agent",
  "工单系统": "Ticket System",
  "知识库": "Knowledge Base",
  "智能诊断": "Smart Diagnosis",
  "旅程演示": "Demo Tour",
  "自由探索": "Free Explore",
  "代码仓库": "Repository",
  "产品文档": "Documentation",

  /* ── Career Journey Section ── */
  "职业旅途": "Career Journey",
  "八年深耕，跨越研发、产品、商务三大领域，构建国际化全栈视野":
    "8 years spanning R&D, Product and Business — building an international full-stack perspective",
  "研发": "R&D",
  "产品运营": "Product & Ops",
  "客户拓展": "Customer Dev",
  "深入技术底层，理解代码到架构": "Deep into technology — code to architecture",
  "主导产品全生命周期管理": "Leading full product lifecycle management",
  "一线洞察需求，赋能商业闭环": "Frontline insights powering business closure",
  "年": "yrs",
  "个月": "mos",
  "驻海外工作": "Overseas Work",
  "海外业务经验": "Int'l Business",
  "负责海外业务片区": "Business Regions",
  "罗马尼亚": "Romania",
  "印尼": "Indonesia",
  "新加坡": "Singapore",
  "中东": "Middle East",
  "东南亚": "Southeast Asia",
  "中国": "China",
  "↔ 拖动旋转地球仪": "↔ Drag to rotate",
  "个": "",
  "英语能力": "English",
  "全流程多岗位": "Multi-Role Pipeline",
  "深入理解产品从 0 到 1 的完整链路": "Deep understanding of the full 0-to-1 product pipeline",
  "覆盖企业数字化产品的完整视角": "Full-spectrum perspective across enterprise digital products",
  "需求洞察": "Demand Insight",
  "商业闭环": "Business Loop",
  "产品定义": "Product Definition",
  "全生命周期管理": "Full Lifecycle Mgmt",
  "技术实现": "Tech Implementation",
  "代码到架构": "Code to Architecture",
  "赋能支撑": "SUPPORTING",
  "AI 时代就绪": "AI-Era Ready",
  "为应对新角色定位和挑战做好准备": "Prepared for new role definitions and challenges in the AI era",
  "国际化多元视野": "Global Perspective",
  "英文沟通良好，胜任工作讨论和技术文档读写": "Strong English skills for work discussions and technical documentation",
  // AI readiness
  "B端平台业务与AI能力结合": "Combining B2B platform business with AI capabilities",
  "更好地应对柔性业务与刚性系统的融合挑战": "Better addressing the fusion of flexible business with rigid systems",
  "应对AI时代角色变化挑战": "Addressing role transformation in the AI era",
  "通过Vibe Coding从交付产品文档到交付准系统，更高效，更准确": "From delivering PRDs to delivering near-systems via Vibe Coding — faster and more accurate",
  "Harness/Context/Prompt工程": "Harness / Context / Prompt Engineering",
  "充分挖掘大模型的能力，规避大模型的风险": "Maximizing LLM capabilities while mitigating risks",
  "紧跟AI技术演进热潮": "Keeping pace with AI technology evolution",
  "过滤可用的技术，瞭望未来的方向，让组织效能永居潮头": "Filtering usable tech, looking to the future — keeping organizational efficiency at the forefront",

  /* ── Certifications Section ── */
  "荣誉与认证": "Honors & Certifications",
  "从华为总裁奖到多项云计算与技术认证，每一份证书背后都是实战淬炼的专业能力。":
    "From Huawei President Award to multiple cloud and tech certifications — each backed by battle-tested expertise.",
  "全部": "All",
  "云计算": "Cloud",
  "网络": "Network",
  "生态": "Ecosystem",
  "最高荣誉": "Top Honor",
  "技术认证": "Tech Certs",
  "生态认证": "Eco Certs",
  "认证体系": "Cert Systems",
  "查看": "View",
  "华为总裁奖": "Huawei President Award",
  "华为集团": "Huawei Group",
  "华为最高级别个人荣誉奖项，授予在业务突破中做出卓越贡献的个人。表彰在重大项目中的战略洞察与端到端交付能力。":
    "Huawei's highest personal honor — recognizing outstanding contribution in business breakthroughs, strategic insight and end-to-end delivery.",
  "华为技术认证": "Huawei Certification",
  "华为云高级认证，验证在云服务解决方案设计、迁移策略及混合云架构方面的专业能力。":
    "Advanced Huawei Cloud cert — cloud solution design, migration strategy and hybrid cloud architecture.",
  "阿里云": "Alibaba Cloud",
  "阿里云专业级数据分析认证，涵盖大数据处理、数据仓库设计、BI 可视化及数据驱动决策全链路能力。":
    "Professional data analysis cert — big data, data warehouse design, BI visualization and data-driven decision making.",
  "华为高级视频会议认证，掌握企业级视频会议系统的规划、部署与运维能力。":
    "Advanced video conferencing cert — planning, deploying and operating enterprise video systems.",
  "华为大学": "Huawei University",
  "系统掌握企业 ICT 基础架构的规划、设计与演进策略，涵盖数据中心、网络及安全体系建设。":
    "Enterprise ICT infrastructure planning, design and evolution — data center, network and security.",
  "华为生态伙伴合作体系认证，理解华为渠道策略、合作伙伴赋能模式与生态共赢方法论。":
    "Huawei ecosystem partnership cert — channel strategy, partner enablement and win-win methodology.",

  /* ── Methodology Section ── */
  "方法论": "Methodology",
  "经验沉淀为方法，方法驱动下一场实践":
    "Experience crystallizes into methodology; methodology drives the next practice",
  "战略与优先级：需求繁杂，但好钢必须用在刀刃上": "Strategy & Prioritization: Focus Resources on What Truly Matters",
  "组织与变革：超越单纯的功能交付，用\u201c利益对齐\u201d化解落地阻力": "Organization & Change: Beyond Feature Delivery \u2014 Resolve Resistance Through Interest Alignment",
  "架构与降维：以克制的信息架构，为极度复杂的业务进行\u201c认知降维\u201d": "Architecture & Simplification: Restrained IA for Cognitive Load Reduction",
  "机制与演进：流程设计要兼顾\u201c正向价值驱动\u201d与\u201c高阶容错弹性\u201d": "Mechanism & Evolution: Balancing Value-Driven Flow with Resilient Fault Tolerance",
  "在资源、人力和时间高度受限的项目中，**B端产品经理的核心价值在于管理不确定性**。面对模糊且海量的诉求，我主张以 **MVP（最小可行性产品）** 快速切入，寻找各方利益的\u201c最大公约数\u201d来驱动项目敏捷演进。在宏观统筹的同时，以点带面，层层剥离表象，**挖掘出业务参与者最底层的真实诉求**，以数据和严密的逻辑推动项目的整体完善。":
    "In projects with highly constrained resources, manpower and time, **the core value of a B2B PM lies in managing uncertainty**. Facing ambiguous and overwhelming demands, I advocate cutting in fast with **MVP (Minimum Viable Product)**, finding the \u201cgreatest common denominator\u201d of all stakeholders to drive agile evolution. While coordinating the big picture, I peel back layers to **uncover the deepest real needs of business participants**, driving holistic improvement through data and rigorous logic.",
  "**B端系统的上线，本质上是一场组织管理变革。** 面对长流程、跨部门的复杂系统设计，核心不在于画出多完美的流程图，而在于**敏锐捕捉各部门、各角色的个人诉求与组织诉求**。在构建复杂系统（如阿里云分销系统）时，唯有系统能为链条上的每一个角色提供可感知的价值，系统才能真正\u201c长\u201d在业务上。当面临较大的惯性阻力时，采用**\u201c局部培养志愿者和标杆团队、以点带面形成口碑\u201d**的策略，往往比强行推行更具穿透力。":
    "**Launching a B2B system is essentially an organizational management transformation.** For complex cross-departmental system design, the key isn\u2019t drawing perfect flowcharts \u2014 it\u2019s **keenly capturing each department\u2019s and role\u2019s personal and organizational needs**. When building complex systems (e.g., Alibaba Cloud\u2019s distribution system), only when the system provides perceivable value to every role in the chain can it truly take root. When facing strong inertia, **\u201ccultivating local champions and benchmark teams to build grassroots reputation\u201d** often penetrates deeper than forced rollouts.",
  "B端业务往往天然复杂，**产品经理的价值在于用确定性的系统框架去解构不确定性的业务**。界面的清晰易用，背后是深厚的业务抽象能力。在复杂系统的构建中，应坚持**\u201c要点前置、风险强控、变更可溯\u201d**的设计原则。我们不仅要珍惜用户的物理点击，更要**珍惜用户的注意力与认知带宽**。通过合理的信息分层和架构编排，让用户在处理复杂业务时依然能聚焦核心，有的放矢。":
    "B2B business is inherently complex. **A PM\u2019s value lies in using deterministic system frameworks to deconstruct uncertain business**. Clean, usable interfaces reflect deep business abstraction skills. In complex systems, uphold the principles of **\u201ckey points first, risk tightly controlled, changes traceable\u201d**. We must cherish not just users\u2019 physical clicks, but more importantly, **their attention and cognitive bandwidth**. Through proper information layering, users can stay focused on what matters even when handling complex workflows.",
  "优秀的B端流程不应是死板的行政枷锁，而应具备**自驱性和鲁棒性（健壮性）**。自驱性意味着流程设计要能给推进者提供正向反馈或明确的责任锚定，让流程\u201c自己跑起来\u201d；鲁棒性则体现在对异常和挫折的处理上。如果一个长流程因为末端的一个节点被驳回就必须从头再来，这不仅是对组织效率和客户体验的巨大损耗，更是在扼杀用户对系统的信任感。**流程应当具备\u201c状态保留\u201d和\u201c断点续传\u201d的弹性**，在严谨与效率之间找到最佳平衡。":
    "Excellent B2B workflows should not be rigid administrative shackles but possess **self-driving capability and robustness**. Self-driving means the design provides positive feedback or clear accountability anchoring, letting the process \u201crun itself\u201d. Robustness shows in handling exceptions \u2014 if a long workflow must restart from scratch because one endpoint node is rejected, this devastates not only organizational efficiency and customer experience but erodes user trust. **Workflows should have \u201cstate preservation\u201d and \u201ccheckpoint resume\u201d resilience**, finding the optimal balance between rigor and efficiency.",
  "沟通": "Communication",
  "调研": "Research",
  "共识": "Consensus",
  "推广": "Promotion",
  "简洁": "Simplicity",
  "逻辑": "Logic",
  "聚焦": "Focus",
  "追溯": "Traceability",
  "自驱": "Self-Driven",
  "编排": "Orchestration",
  "容错": "Fault Tolerance",
  "复用": "Reuse",
  "MVP": "MVP",
  "数据驱动": "Data-Driven",
  "最大公约数": "Common Ground",
  "漫谈产品经理和软件工程": "On Product Management & Software Engineering",

  /* ── Hobbies Section ── */
  "爱好与特长": "Interests & Talents",
  "技术之外，热爱运动与音乐": "Beyond technology — passionate about sports and music",
  "羽毛球": "Badminton",
  "乒乓球": "Table Tennis",
  "游泳": "Swimming",
  "骑行": "Cycling",
  "吉他": "Guitar",
  "钢琴": "Piano",
  "架子鼓": "Drums",
  "《一种电子设备及控制方法》": "Electronic Device & Control Method",
  "第一发明人": "First Inventor",
  "公开号": "Publication No.",
  "《北京蒸汽朋克》": "Beijing Steampunk",
  "原创歌曲专辑": "Original Music Album",
  "雪花落下想起你": "Snowflakes Remind Me of You",
  "点击前往 QQ 音乐收听": "Listen on QQ Music",

  /* ── Footer ── */
  "寻求志同道合的伙伴，让我们共同定义 AI 时代的组织价值。":
    "Seeking like-minded partners to define organizational value in the AI era.",
};

export default zh2en;

/** Helper: given a Chinese string, return its English translation or fallback */
export function getEn(zh: string, fallback?: string): string {
  return zh2en[zh] ?? fallback ?? zh;
}
