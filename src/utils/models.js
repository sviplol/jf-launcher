/**
 * 上游支持的全部模型
 * supportsImages 全部设为 true，避免用户发图时报错
 */

export const ALL_MODELS = [
  { id:"fast-model", name:"【NB】快速", desc:"优先响应速度，适合简单任务与快速问答（默认档，最低消耗）", type:"chat", supportsReasoning:true, supportsImages:true, supportsToolCall:true, maxInputTokens:200000, maxOutputTokens:48000, defaultReasoning:"medium", recommended:true, isTier:true , supportedEfforts:["low","medium","high","xhigh","max"], defaultEffort:"medium", canDisableThinking:false, credits:"x1.68", iconUrl:"https://download.codebuddy.cn/model-icon/wb-fast.svg" },
  { id:"balanced-model", name:"【NB】均衡", desc:"兼顾速度与质量，适合大多数日常工作", type:"chat", supportsReasoning:true, supportsImages:true, supportsToolCall:true, maxInputTokens:200000, maxOutputTokens:48000, defaultReasoning:"medium", isTier:true , supportedEfforts:["low","medium","high","xhigh","max"], defaultEffort:"medium", canDisableThinking:false, credits:"x5.2", iconUrl:"https://download.codebuddy.cn/model-icon/wb-balanced.svg" },
  { id:"deep-model", name:"【NB】极致", desc:"优先深度与准确性，适合复杂分析和高要求任务", type:"chat", supportsReasoning:true, supportsImages:true, supportsToolCall:true, maxInputTokens:200000, maxOutputTokens:48000, defaultReasoning:"medium", isTier:true , supportedEfforts:["low","medium","high","xhigh","max"], defaultEffort:"medium", canDisableThinking:false, credits:"x9.6", iconUrl:"https://download.codebuddy.cn/model-icon/wb-primary.svg" },
  { id:"hy3-preview", name:"【NB】hy3-preview", desc:"HY3 预览版", type:"chat", supportsReasoning:true, supportsImages:true, supportsToolCall:false, maxInputTokens:192000, maxOutputTokens:128000, defaultReasoning:"medium" , supportedEfforts:["low","medium","high","xhigh","max"], defaultEffort:"medium", canDisableThinking:true },
  { id:"hy4-preview", name:"【NB】hy4-preview", desc:"腾讯混元HY4，深度推理", type:"chat", supportsReasoning:true, supportsImages:true, supportsToolCall:false, maxInputTokens:128000, maxOutputTokens:8192, defaultReasoning:"high" , supportedEfforts:["low","medium","high","xhigh","max"], defaultEffort:"medium", canDisableThinking:true },
  { id:"glm-5.3", name:"【NB】glm-5.3", desc:"智谱最新旗舰，推理+视觉+工具调用", type:"chat", supportsReasoning:true, supportsImages:true, supportsToolCall:true, maxInputTokens:1000000, maxOutputTokens:131072, defaultReasoning:"high", recommended:true , supportedEfforts:["low","medium","high","xhigh","max"], defaultEffort:"medium", canDisableThinking:true },
  { id:"glm-5.3-flash", name:"【NB】glm-5.3-flash", desc:"智谱快速版，低延迟高性价比", type:"chat", supportsReasoning:true, supportsImages:true, supportsToolCall:true, maxInputTokens:128000, maxOutputTokens:8192, defaultReasoning:"medium" , supportedEfforts:["low","medium","high","xhigh","max"], defaultEffort:"medium", canDisableThinking:true },
  { id:"glm-5.2", name:"【NB】glm-5.2", desc:"智谱上一代旗舰，推理+视觉+工具调用", type:"chat", supportsReasoning:true, supportsImages:true, supportsToolCall:true, maxInputTokens:1000000, maxOutputTokens:131072, defaultReasoning:"high", recommended:true , supportedEfforts:["low","medium","high","xhigh","max"], defaultEffort:"medium", canDisableThinking:true },
  { id:"glm-5.1", name:"【NB】glm-5.1", desc:"智谱上一代旗舰", type:"chat", supportsReasoning:true, supportsImages:true, supportsToolCall:true, maxInputTokens:1000000, maxOutputTokens:131072, defaultReasoning:"high" , supportedEfforts:["low","medium","high","xhigh","max"], defaultEffort:"medium", canDisableThinking:true },
  { id:"glm-5v-turbo", name:"【NB】glm-5v-turbo", desc:"视觉模型，支持图片理解", type:"vision", supportsReasoning:false, supportsImages:true, supportsToolCall:false, maxInputTokens:1000000, maxOutputTokens:131072, defaultReasoning:"none" },
  { id:"minimax-m3", name:"【NB】minimax-m3", desc:"MiniMax 最新版", type:"chat", supportsReasoning:false, supportsImages:true, supportsToolCall:true, maxInputTokens:1000000, maxOutputTokens:524288, defaultReasoning:"none" },
  { id:"kimi-k3", name:"【NB】kimi-k3", desc:"月之暗面 Kimi 最新旗舰", type:"chat", supportsReasoning:true, supportsImages:true, supportsToolCall:true, maxInputTokens:1000000, maxOutputTokens:131072, defaultReasoning:"high", recommended:true , supportedEfforts:["low","medium","high","xhigh","max"], defaultEffort:"medium", canDisableThinking:true },
  { id:"kimi-k3-1", name:"【NB】kimi-k3-1", desc:"月之暗面 Kimi K3-1，官方最新版", type:"chat", supportsReasoning:true, supportsImages:true, supportsToolCall:true, maxInputTokens:1000000, maxOutputTokens:32000, defaultReasoning:"medium", supportedEfforts:["low","medium","high"], defaultEffort:"medium", canDisableThinking:true },
  { id:"kimi-k2.7", name:"【NB】kimi-k2.7", desc:"月之暗面 Kimi 最新版", type:"chat", supportsReasoning:true, supportsImages:true, supportsToolCall:true, maxInputTokens:262144, maxOutputTokens:262144, defaultReasoning:"high" , supportedEfforts:["low","medium","high","xhigh","max"], defaultEffort:"medium", canDisableThinking:true },
  { id:"kimi-k2.6", name:"【NB】kimi-k2.6", desc:"Kimi 上一版本", type:"chat", supportsReasoning:true, supportsImages:true, supportsToolCall:true, maxInputTokens:262144, maxOutputTokens:262144, defaultReasoning:"medium" , supportedEfforts:["low","medium","high","xhigh","max"], defaultEffort:"medium", canDisableThinking:true },
  { id:"glm-5.0-turbo", name:"【NB】glm-5.0-turbo", desc:"快速响应版", type:"chat", supportsReasoning:false, supportsImages:true, supportsToolCall:true, maxInputTokens:1000000, maxOutputTokens:131072, defaultReasoning:"none" },
  { id:"deepseek-v3", name:"【NB】deepseek-v3", desc:"DeepSeek 通用对话", type:"chat", supportsReasoning:false, supportsImages:true, supportsToolCall:true, maxInputTokens:1000000, maxOutputTokens:384000, defaultReasoning:"none" },
  { id:"deepseek-r1", name:"【NB】deepseek-r1", desc:"DeepSeek 推理模型，深度思考", type:"reasoning", supportsReasoning:true, supportsImages:true, supportsToolCall:false, maxInputTokens:1000000, maxOutputTokens:384000, defaultReasoning:"max", recommended:true , supportedEfforts:["low","medium","high","xhigh","max"], defaultEffort:"medium", canDisableThinking:true },
  { id:"deepseek-v3.2", name:"【NB】deepseek-v3.2", desc:"DeepSeek V3 升级版", type:"chat", supportsReasoning:false, supportsImages:true, supportsToolCall:true, maxInputTokens:1000000, maxOutputTokens:384000, defaultReasoning:"none" },
  { id:"deepseek-v4-flash", name:"【NB】deepseek-v4-flash", desc:"快速版，低延迟", type:"chat", supportsReasoning:false, supportsImages:true, supportsToolCall:true, maxInputTokens:1000000, maxOutputTokens:384000, defaultReasoning:"none" },
  { id:"deepseek-v4-pro", name:"【NB】deepseek-v4-pro", desc:"DeepSeek 专业版", type:"chat", supportsReasoning:true, supportsImages:true, supportsToolCall:true, maxInputTokens:1000000, maxOutputTokens:384000, defaultReasoning:"medium" , supportedEfforts:["low","medium","high","xhigh","max"], defaultEffort:"medium", canDisableThinking:true },
  { id:"minimax-m2.7", name:"【NB】minimax-m2.7", desc:"MiniMax 对话模型", type:"chat", supportsReasoning:false, supportsImages:true, supportsToolCall:false, maxInputTokens:1000000, maxOutputTokens:524288, defaultReasoning:"none" },
];

export function buildModelConfig(model, reasoningLevels, deepThinking) {
  const levels = Array.isArray(reasoningLevels) ? reasoningLevels : [reasoningLevels];
  const hasReasoning = levels.filter(l => l !== "none");

  // WorkBuddy 5.4.7 三档调度模型特殊处理（fast/balanced/deep）
  if (model.isTier || model.id === "fast-model" || model.id === "balanced-model" || model.id === "deep-model") {
    return {
      id: model.id,
      name: model.name,
      supportsReasoning: true,
      onlyReasoning: true,
      reasoning: { effort: "medium", summary: "auto", available: ["low","medium","high"] },
      supportsToolCall: true,
      supportsImages: true,
      maxInputTokens: 200000,
      maxOutputTokens: 48000,
      maxAllowedSize: 200000,
      deepThinking: deepThinking,
      isTier: true,
      temperature: 1,
      desc: model.desc,
      credits: model.credits,
      iconUrl: model.iconUrl,
    };
  }

  const base = {
    id: model.id,
    name: model.name,
    supportsReasoning: model.supportsReasoning,
    onlyReasoning: model.supportsReasoning && hasReasoning.length > 0,
    reasoningLevels: model.supportsReasoning ? hasReasoning : [],
    reasoning: hasReasoning.length > 0 ? {
      effort: hasReasoning.includes("max") ? "max" : hasReasoning[0],
      summary: "auto",
      available: hasReasoning,
    } : undefined,
    supportsToolCall: model.supportsToolCall,
    supportsImages: true,
    maxInputTokens: model.maxInputTokens,
    maxOutputTokens: model.maxOutputTokens,
    deepThinking: deepThinking && model.supportsReasoning,
    supportedEfforts: model.supportsReasoning ? (model.supportedEfforts || ["low","medium","high","xhigh","max"]) : undefined,
    defaultEffort: model.supportsReasoning ? (model.defaultEffort || "medium") : undefined,
    canDisableThinking: model.supportsReasoning ? true : undefined,
  };
  Object.keys(base).forEach(k => base[k] === undefined && delete base[k]);
  return base;
}
