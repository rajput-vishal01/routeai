import {
  Terminal,
  Zap,
  Shield,
  Layout,
  Cpu,
  ChevronRight,
} from "lucide-react";

export const FEATURES = [
  {
    title: "Multi-Model Router",
    description:
      "Switch between free models instantly using OpenRouter and AI SDK.",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    title: "Minimal UI",
    description:
      "Clean, distraction-free interface inspired by ChatGPT and Vercel.",
    icon: <Layout className="w-5 h-5" />,
  },
  {
    title: "Fast & Responsive",
    description:
      "Optimized for speed with Next.js, streaming, and local caching.",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    title: "Developer Focused",
    description:
      "API-first architecture built with modern tooling and clean logic.",
    icon: <Terminal className="w-5 h-5" />,
  },
  {
    title: "Secure Requests",
    description:
      "All requests are transmitted using standard secure protocols.",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    title: "Always Improving",
    description:
      "Experimental platform — new models and features are deployed daily.",
    icon: <ChevronRight className="w-5 h-5" />,
  },
];

export const STEPS = [
  {
    step: "01",
    title: "Input your prompt",
    desc: "Ask a question, paste complex code, or request a creative task.",
  },
  {
    step: "02",
    title: "Select Intelligence",
    desc: "Choose from 50+ free AI models via our unified selector.",
  },
  {
    step: "03",
    title: "Stream Results",
    desc: "Receive fast, accurate, and contextually aware responses instantly.",
  },
];

export const MODELS = [
  "Meta Llama 3.1 8B",
  "Mistral 7B Instruct",
  "Gemini 1.5 Flash",
  "DeepSeek V3",
  "Claude 3 Haiku",
  "Qwen 2.5 7B Instruct",
  "OLMo 7B Instruct",
  "Phi-3 Mini Instruct",
  "OpenChat 3.5",
  "Yi 1.5 9B Chat",
  "Starling 7B",
  "Toppy M 7B",
  "Zephyr 7B Beta",
  "MythoMax L2 13B",
];