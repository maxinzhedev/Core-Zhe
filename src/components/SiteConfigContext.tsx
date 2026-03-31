"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

/* ─── types ─── */

export interface ProjectConfig {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  demoLink: string;
  exploreLink: string;
  repoLink: string;
  docsLink: string;
  hasDemoRecording: boolean;
}

export interface CareerConfig {
  company: string;
  department: string;
  role: string;
  period: string;
  tags: string[];
  highlights: string[];
  metrics: Record<string, string>;
  logo: string;
}

export interface EducationConfig {
  school: string;
  major: string;
  type: string;
  period: string;
  logo: string;
}

export interface HeroConfig {
  name: string;
  title: string;
  motto: string;
  tags: string[];
}

export interface CapabilityMetric {
  label: string;
  value: string;
}

export interface SiteConfig {
  hero: HeroConfig;
  education: EducationConfig[];
  careers: CareerConfig[];
  projects: ProjectConfig[];
  capabilities: {
    metrics: CapabilityMetric[];
  };
  footer: {
    copyright: string;
  };
}

interface SiteConfigContextValue {
  config: SiteConfig;
  isAdmin: boolean;
  updateConfig: (path: string, value: unknown) => void;
  resetConfig: () => void;
}

/* ─── defaults ─── */

export const defaultConfig: SiteConfig = {
  hero: {
    name: "Maxwell Ma",
    title: "AI赋能的平台产品经理",
    motto: "知行合一",
    tags: [
      "解决问题，持续交付用户价值",
      "建立风控模型和流程体系",
      "AI赋能组织提效业务变革",
    ],
  },
  education: [
    {
      school: "北京交通大学",
      major: "软件工程",
      type: "全日制工学硕士",
      period: "2015 - 2017",
      logo: "/pic/北交大.png",
    },
    {
      school: "南京航空航天大学",
      major: "物联网工程",
      type: "全日制工学学士",
      period: "2011 - 2015",
      logo: "/pic/南航大.png",
    },
  ],
  careers: [
    {
      company: "中国星网",
      department: "应用研究院",
      role: "平台产品经理",
      period: "2024.05 - 至今",
      tags: ["从0到1", "AI提效", "星座运营", "全天候保障"],
      highlights: [],
      metrics: { 服务事故: "0", 客户投诉: "0" },
      logo: "/pic/中国星网.png",
    },
    {
      company: "阿里巴巴",
      department: "阿里云智能国际",
      role: "平台产品经理",
      period: "2022.05 - 2024.03",
      tags: ["国际化", "渠道分销", "全生命周期", "AI赋能B端"],
      highlights: [],
      metrics: { "入驻效率": "+60%", "入驻成功率": "+30%", "业务年增": "20%" },
      logo: "/pic/阿里云.JPEG",
    },
    {
      company: "华为",
      department: "云与计算",
      role: "产品运营经理",
      period: "2020.01 - 2022.02",
      tags: ["风控体系", "MTL/LTC", "数据治理", "总裁奖"],
      highlights: [],
      metrics: { "封堵风险资金": "2000万+", "荣誉": "总裁奖" },
      logo: "/pic/华为.png",
    },
    {
      company: "华为",
      department: "云与计算",
      role: "研发工程师 / 产品经理",
      period: "2017.08 - 2020.01",
      tags: ["IoT平台", "车联网", "低代码", "国际大客户"],
      highlights: [],
      metrics: { "标杆客户": "标致/淡马锡", "创新": "低代码平台" },
      logo: "/pic/华为.png",
    },
  ],
  projects: [
    {
      title: "云分销管理系统",
      subtitle: "Cloud Distribution CRM",
      description:
        "面向国际云市场的渠道分销全生命周期管理平台，覆盖伙伴入驻、报价、签约、出账、退出等核心商业流程，支撑业务年增20%战略目标。",
      tags: ["渠道管理", "全生命周期", "风控引擎", "国际化"],
      demoLink: "#",
      exploreLink: "#",
      repoLink: "#",
      docsLink: "#",
      hasDemoRecording: true,
    },
    {
      title: "智能客服工作台",
      subtitle: "AI Service Workbench",
      description:
        "基于AI Agent的智能运营客服平台，融合故障诊断、工单流转、知识库检索等能力，实现服务保障0事故、0投诉的星座运营目标。",
      tags: ["AI Agent", "工单系统", "知识库", "智能诊断"],
      demoLink: "#",
      exploreLink: "#",
      repoLink: "#",
      docsLink: "#",
      hasDemoRecording: false,
    },
  ],
  capabilities: {
    metrics: [
      { label: "年龄", value: "32岁" },
      { label: "学历", value: "硕士学位" },
      { label: "经验", value: "8年大厂 PM" },
    ],
  },
  footer: {
    copyright: "© 2024 马信哲 . 知行合一",
  },
};

const STORAGE_KEY = "site-config-v1";

/* ─── helpers ─── */

function deepSet(obj: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split(".");
  const last = keys.pop()!;
  let cur: Record<string, unknown> = obj;
  for (const k of keys) {
    if (typeof cur[k] !== "object" || cur[k] === null) {
      cur[k] = {};
    }
    cur = cur[k] as Record<string, unknown>;
  }
  cur[last] = value;
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/* ─── context ─── */

const SiteConfigContext = createContext<SiteConfigContextValue>({
  config: defaultConfig,
  isAdmin: false,
  updateConfig: () => {},
  resetConfig: () => {},
});

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}

/* ─── provider ─── */

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [isAdmin, setIsAdmin] = useState(false);

  // hydrate from localStorage + detect admin param
  useEffect(() => {
    // admin mode
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") {
      setIsAdmin(true);
    }

    // load persisted config
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<SiteConfig>;
        setConfig((prev) => ({ ...deepClone(prev), ...saved }));
      }
    } catch {
      // ignore
    }
  }, []);

  // persist on change (skip first render)
  useEffect(() => {
    if (config !== defaultConfig) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }
  }, [config]);

  const updateConfig = useCallback((path: string, value: unknown) => {
    setConfig((prev) => {
      const next = deepClone(prev) as unknown as Record<string, unknown>;
      deepSet(next, path, value);
      return next as unknown as SiteConfig;
    });
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(deepClone(defaultConfig));
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <SiteConfigContext.Provider
      value={{ config, isAdmin, updateConfig, resetConfig }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}
