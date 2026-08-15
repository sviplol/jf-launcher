# JF自动部署工具 — 项目交接文档 (HANDOVER)

> 本文档面向完全没看过历史对话的接手 agent。读完即可无缝继续开发。
> 最后更新：2026-07-31，当前版本 **v2**（APP_VERSION=2）

---

## 1. 项目目标和背景

### 这是什么
**JF自动部署工具**（Tauri 2 桌面客户端），是一款"卡密激活 + 一键部署 AI 模型到 WorkBuddy/CodeBuddy/Claude 等客户端 + 余额查询"的工具。它是从**母站 GLM 工具（fast-mmd / AI全自动部署，品牌 2bbb.cn）fork 出来的子站**，独立运营。

### 要解决什么问题
- 用户购买卡密后，打开软件 → 输卡密激活 → 一键把模型配置写入 WorkBuddy 等客户端 → 直接对话。
- **省去用户手动选站**：软件根据卡密自动识别属于 JF 站还是 TK 站（试错路由）。
- 两个站**完全独立**：卡密不通用、数据不互通、后端独立。

### 两个站的关系（重要！）
| | JF 站（积分计费） | TK 站（Token 计费） |
|---|---|---|
| 域名 | `jf.ainb7.com` | `tk.ainb7.com` |
| 计费单位 | 积分 | Token（1 积分 = 15002 Token） |
| 卡密前缀示例 | `5200-`、`1000-`、`3000-` | `1KW-`（约1000万Token）、`1Y-` |
| 后端 | 同一台服务器不同端口/库 | 同左 |
| 客户端标题 | "JF自动部署工具" | "Token自动部署工具" |

**两个站共用同一个客户端 EXE**，靠卡密自动识别路由到对应后端。

### 部署目标平台
WorkBuddy（主）、CodeBuddy CN、OpenCode、Trae、Claw Code、Claude Code。其中 **WorkBuddy 是重点**，逻辑最复杂（要处理 entry_*.info 三种格式）。

---

## 2. 当前进度

### 已完成 ✅
1. **从母站 fork 并全部重品牌**：`2bbb.cn`/`AI全自动部署`/`GLM API` → `jf.ainb7.com`/`JF自动部署`，全项目 0 残留（含 index.html、manifest.json、README、version.json、二进制）。
2. **卡密自动识别 JF/TK**：去掉选站步骤，激活时先试 JF，返回"卡号不存在"自动试 TK。
3. **卡号不存在弹"购买卡密"对话框**：点击跳转淘宝购买页。
4. **卡密验证**：只拦 `fm-` 开头的 API 密钥（防止用户误填），其余前缀一律放行给后端判断。
5. **credits 对齐官方**：`to_wb_credits` 全部改为 WorkBuddy 官方值（glm-5.1=x0.79、kimi-k3=x1.62 等，字符串格式）。
6. **ALL_MODELS 官方排序**：Auto→Hy3→GLM-5.2→GLM-5.1→GLM-5V→MiniMax-M3→Kimi-K3→...
7. **Diagnostics 对话检测自动预填** apiKey 和 serverPlatform；新增"强制修复"按钮（fix_proxy + 重启提示）。
8. **TK 站 Token 数值精确显示**：积分 × 15002 取整 + 千分位（`disp()` 函数），JF 站积分不变。
9. **标题按站动态显示**：JF→"JF自动部署工具"，TK→"Token自动部署工具"。
10. **左上角版本号**：从写死 v12 改为 `get_app_version` 读真实版本 v2。
11. **退出登录按钮可见**：压缩 sidebar 整体高度（header/deploy/menu/footer），最小高度 600px 下完整显示。
12. **一键部署按钮防换行**：white-space:nowrap + min-height。
13. **强制更新地址**：从母站蓝奏云改为 `https://jf.ainb7.com/start/deploy`（本地+服务器+fallback 三处）。
14. **Mac dmg 命名纠正**：按 CI artifact 文件名归类（不按大小），M芯片=arm64、英特尔=x86_64。
15. **v2 全量发布**：GitHub + 蓝奏云 + 飞书 + 桌面 + `前台/子站/` 测试文件夹。

### 在做 🔄
- 无（上一个任务"本地路由工具集成 WorkBuddy 部署"的提示词已交付，属另一个项目）。

### 未开始 ❌
- Mac 版本的 Apple 签名 + 公证（解决"已损坏"提示，需 $99/年 Apple Developer 账号，用户未购买，暂用 `xattr -cr` 命令绕过）。
- WorkBuddy 部署的 `deploy_codebuddy` 读取 `glm_deploy_config.json` 的历史问题（用户明确要求**不要动**，保持原样）。

---

## 3. 完整文件结构和作用

项目根目录：`C:\Users\Administrator\CodeBuddy\20260626043128\glm-launcher-backup-20260721\`
（注意：目录名带"glm-launcher"是历史遗留，实际已是 JF 子站代码）

```
glm-launcher-backup-20260721/
├── src/                          # 前端 (Vue 3 + Vite)
│   ├── App.vue                   # 主框架：激活/登录/注册页、卡密自动识别、购买弹窗、CHANGELOG、强制更新检测
│   ├── main.js                   # Vue 入口
│   ├── utils/
│   │   ├── api.js                # API 请求：BASE_URLS{jf,tk}、redeemCard、lookup、recharge、checkUpdate
│   │   ├── models.js             # ALL_MODELS 模型清单（16个，官方排序+完整字段）
│   │   ├── deploy.js             # 部署辅助
│   │   └── store.js              # 状态管理（localStorage 持久化，含 glm→jf 兼容映射）
│   └── views/
│       ├── DeployWizard.vue      # 部署向导：模型多选(orderedIds按官方顺序)、平台选择、生成配置
│       ├── MainApp.vue           # 主界面：余额/消耗/剩余显示(disp换算)、记录、退出按钮、动态标题、get_app_version
│       └── Diagnostics.vue       # 自检：apiKey/serverPlatform预填、对话检测、强制修复按钮
├── src-tauri/                    # Rust 后端
│   ├── src/
│   │   ├── lib.rs                # 核心：APP_VERSION、deploy_workbuddy、deploy_codebuddy、
│   │   │                         #   kill_workbuddy_processes、find_all_workbuddy_entries、
│   │   │                         #   restart_app、to_wb_*系列函数(元数据)、run_fix、卡密API、get_app_version
│   │   ├── main.rs               # Tauri 入口（调 lib.rs 的 run）
│   │   └── bin/                  # 备用二进制
│   ├── Cargo.toml                # crate 名 jf-launcher
│   ├── tauri.conf.json           # productName=JF自动部署、identifier=cn.ainb7.jflauncher、version=1.0.0
│   └── build.rs
├── public/
│   ├── version.json              # {version:2, url:更新地址}
│   └── manifest.json             # PWA manifest（品牌已改 JF）
├── .github/workflows/build.yml   # CI：push main 自动编 Windows安装版+Mac M+Mac Intel，Mac自动传蓝奏云
├── version.json                  # 版本+更新地址（强制更新检测用）
├── index.html                    # <title>JF自动部署</title>
├── package.json / vite.config.js # 前端构建配置
├── mac-fix-damaged.command       # Mac"已损坏"修复脚本（xattr -cr 引导）
├── rewrite_mainapp.py / rewrite_models.py  # 历史遗留脚本，已无用
└── HANDOVER.md                   # 本文档
```

---

## 4. 技术栈和关键决策

| 项 | 选择 | 原因 |
|---|---|---|
| 桌面框架 | **Tauri 2**（Rust + Vue3 + WebView2） | 用户硬性要求，禁用 Electron/C#/Qt。包小（免安装版17MB） |
| 前端 | Vue 3 + Vite | 沿用母站，不重构 |
| 后端 | 纯 Rust（无额外服务） | 单 EXE，零依赖 |
| 编译 | GitHub Actions（`.github/workflows/build.yml`） | Mac dmg 必须在 macOS runner 编，本地 Windows 编不了 |
| 强制更新 | 服务器 `/api/fastmmd/version` 返回 `{version, url}`，客户端 `APP_VERSION` 对比，低于则弹强制更新跳 url | 简单可靠 |
| 卡密路由 | 试错（先试 JF 再试 TK），不靠前缀判断 | 两站前缀不固定、会变，试错最稳 |
| 单实例 | `tauri-plugin-single-instance`，锁名=`{identifier}-sim` | identifier 独立(cn.ainb7.jflauncher)故与母站互不干扰 |

**版本号规则（重要）**：每次更新同步改 5 处 + 服务器 + 文件名后缀：
1. `lib.rs` `APP_VERSION`
2. `version.json` 的 `version`
3. `public/version.json` 的 `version`
4. `App.vue` 的 `CHANGELOG` 加条目
5. 服务器后端 `app.py` 的 `version`（改完 `systemctl restart`）
6. 文件名后缀 `_v2`、`_v3`...

---

## 5. 踩过的坑和注意事项（必读）

### 域名/品牌
- **绝不能再出现 `2bbb.cn`、`lanzout.com`、`glm.ainb7.com`、`GLM API`、`AI全自动部署`**。改完 grep 全项目验证 0 残留，再编译后 strings 扫二进制确认。
- 正确域名：`jf.ainb7.com`（JF）、`tk.ainb7.com`（TK）。Base URL 必须带 `/v1`（如 `https://jf.ainb7.com/v1`）。
- 域名拼接走 `domainMap = { glm:"jf", tk:"tk" }`（兼容老用户 localStorage 存的 `platform:"glm"`），DeployWizard 和 MainApp 各一份。
- **曾踩的坑**：`App.vue` 平台下拉框 `value` 原本是 `"glm"`（只改了显示文字没改 value），导致部署拼出 `glm.ainb7.com`。已改为 `value="jf"`。`store.js`/`api.js` 保留 `glm→jf` 兼容映射（保老用户 localStorage 登录态），这部分**不能删**。
- `dist/` 是 Vite 构建产物（`npm run tauri build` 时重新生成），不要手改，改源码即可。

### WorkBuddy 部署（最容易写坏）
- **部署前必须 `kill_workbuddy_processes()` 并等 3 秒**，否则 WorkBuddy 退出时把内存旧状态覆盖回配置=白部署。
- `~/.workbuddy/models.json` 必须是**对象** `{"models":[...]}`，不能是数组。
- `~/.workbuddy/local_storage/entry_*.info` 有**三种格式**（gzip+base64+引号 / 裸JSON数组 / 裸JSON对象），可能多个文件，全部要识别处理、全部先备份。
- entry 里模型 id 加 `custom-local:` 前缀；注入前先删旧 `custom-local:` 再把所有现有模型 `isDefault` 置 false。
- **entry 模型字段 ≠ models.json 模型字段**：entry 的 `vendor` 是单字符厂商码（glm系=`"e"`、auto/deepseek/kimi/minimax=`"f"`、hy3=`"j"`），不是 `"user"`；entry 多 `onlyReasoning`/`isDefault`/`maxAllowedSize`/`maxInputTokens`/`maxOutputTokens`，tags 是 `["craft"]`（models.json 是 `["custom"]`）。字段写漏/写错 → WorkBuddy 报 `credits.match is not a function` 或 ACL 错误（`set_fullscreen not allowed by ACL`）。
- **`credits` 必须是字符串**（`"x0.79"`），不是数字！写成数字 WorkBuddy 调 `.match()` 报错。
- 所有写文件前先备份 `.launcher_bak` 后缀。

### TK 站数值
- 后端把卡密面额存成**积分**（1积分=15002 Token）。前端显示用 `disp()`：`serverPlatform==='tk'` 时 `Math.round(n×15002)` 取整+千分位，JF 原样。所有显示点都要过 `disp()`（余额/消耗/剩余/记录/toast）。
- `1KW` 卡密 balance=667 积分 → 显示 `10,006,334 Token`（精确值，不是约等）。

### 编码/环境
- Windows PowerShell 控制台是 GBK，中文显示乱码**不代表文件内容错**。验证中文用 Python 读文件字节或 `unicode_escape`。
- 上传文件到蓝奏云/飞书时，**Python 脚本里写中文文件名要确认源文件本身编码正确**（曾因 GBK 写入导致文件名损坏，用 unicode 转义修复）。
- CI artifact 下载后中文文件名可能变 GBK 乱码，需用 unicode escape 重命名。

### Mac dmg
- **按 CI artifact 文件名归类**（含"M芯片"/"英特尔"字样），**绝不按文件大小判断**（曾因此放反，客户 M 芯片下到 x86_64 版反而不报损坏）。M芯片=arm64，英特尔=x86_64。验证方法：7z 解开 dmg 读 `Contents/MacOS/jf-launcher` 的 Mach-O cputype（0x0100000C=arm64，0x01000007=x86_64）。

### 服务器后端
- 服务器：`45.192.98.86`，SSH 端口 `7766`，root/`p15q5hTjjqXI`（用 paramiko 连接，禁止命令行 ssh 会卡密码）。
- **后端代码在 `/opt/glm-pool/app.py`**（目录名叫 glm-pool 但实际是 JF 站代码，里面全是 jf.ainb7.com），端口 5889，gunicorn 运行，数据库 `pool.db`。TK 站后端在 `/opt/tk-pool/app.py`，端口 5890，独立数据库（结构不同，无 card_codes 表，卡密在别处）。
- nginx 已配 `jf.ainb7.com`→5889、`tk.ainb7.com`→5890，Let's Encrypt SSL 已申请。
- 已加 nginx rewrite：裸 `/chat/completions`、`/models`、`/messages` 自动转 `/v1/xxx`（兼容用户在 WorkBuddy 填不带 /v1 的地址）。
- paramiko 的 `systemctl restart` 常超时（是等输出卡住，不是服务没起来），restart 后单独用新连接验证服务状态。
- 改后端前**必须备份** `app.py.bak.时间戳`。

### 测试/验证铁律
- 改完代码必须自己编译+实测通过才交付，不允许"应该可以"。
- 编译命令：项目根目录 `npm run tauri build`（在 src-tauri 下用 cargo 亦可）。
- 免安装版产物：`src-tauri/target/release/jf-launcher.exe`；安装版：`src-tauri/target/release/bundle/nsis/JF自动部署_1.0.0_x64-setup.exe`。
- 测试文件夹：`C:\Users\Administrator\Desktop\前台\子站\`，每次发布复制一份免安装版到这儿（带版本号）方便用户测试。桌面也放一份。

---

## 6. 如何运行/验证项目是否正常

### 本地编译
```bash
cd C:\Users\Administrator\CodeBuddy\20260626043128\glm-launcher-backup-20260721
npm run tauri build
# 期望：0 error。2 个 unused 警告是原代码遗留，正常。
```

### 验证清单
1. **无旧站残留**：
   ```bash
   # 全项目应为 0
   grep -ri "2bbb\|lanzout\|glm.ainb7\|GLM API\|AI全自动" src src-tauri public index.html version.json
   ```
2. **二进制品牌**：`strings` 或 Select-String 扫 `jf-launcher.exe`，应含 `jf.ainb7.com/start/deploy`，不含 `2bbb`。
3. **运行**：双击 `jf-launcher.exe`，标题栏显示"JF自动部署"，激活页 placeholder"请输入卡密（自动识别 JF/TK 站）"。
4. **卡密激活**：输 JF 卡密（如 `5200-` 开头）→ 命中 JF 站；输 TK 卡密（`1KW-`）→ 自动转 TK 站；输不存在的 → 弹"购买卡密"对话框。
5. **后端**：`curl https://jf.ainb7.com/api/fastmmd/version` 应返回 `{"url":"https://jf.ainb7.com/start/deploy","version":2}`。
6. **部署到 WorkBuddy**：部署后查 `~/.workbuddy/models.json` 是对象格式、`url` 带 `/v1`、`credits` 是字符串；`local_storage/entry_*.info` 注入了 `custom-local:` 模型；WorkBuddy 被自动重启且能对话。

### 发布流程（每次更新）
1. 改代码 → 升版本号（5处+服务器）→ 编译 → 验证。
2. `git add -A; git commit -m "..."; git push origin main`（远程 `https://github.com/sviplol/jf-launcher`，分支 main）。本地有代理 `127.0.0.1:7897` 时 push 才通。
3. CI 自动编 Windows + Mac M + Mac Intel。
4. 传蓝奏云 nb 文件夹（fol_id=4574946）+ 飞书文档，文件名带版本号。
5. 复制免安装版到桌面 + `前台/子站/`。

**蓝奏云/飞书/GitHub 凭证**：在本机 `C:\Users\Administrator\.claude\skills\lanzou-cloud\` 有相关上传模块和历史脚本（`lanzou_upload.py`），GitHub token、飞书 app_id/secret、蓝奏云 ylogin/phpdisk_info 都在历史会话的临时脚本里用过，需要时从 skills 目录或重新向用户索取。**这些密钥不要写进任何提交到 GitHub 的文件。**

---

## 7. 下一步要做的具体任务清单

1. **【待用户提供】Mac 签名+公证**：用户买 Apple Developer 账号（$99/年）后，在 `build.yml` 的 Mac job 加 `codesign` + `xcrun notarytool` + `stapler`，解决"已损坏"提示。当前用 `mac-fix-damaged.command`（xattr -cr）绕过。
2. **【观察中】TK 站卡密生成**：TK 站后端 card_codes 表当前为空，用户运营生成后需实测 TK 卡密激活、Token 数值显示是否正确。
3. **【另一个项目】本地路由工具集成 WorkBuddy 部署**：提示词已交付（`C:\Users\Administrator\_ai_workspace\本地路由集成WorkBuddy部署_提示词.md`），不属于本工具，但若用户反馈集成后 WorkBuddy 报 credits/ACL 错误，参考本文档第 5 节"WorkBuddy 部署"坑点排查。
4. **【持续】每次功能迭代**：严格走"升版本号 5 处 + 服务器 → 编译 → 验证 → 推送 GitHub/蓝奏云/飞书 → 复制测试文件夹"流程。

---

## 附：关键凭证与路径速查

- **GitHub 仓库**：`https://github.com/sviplol/jf-launcher`（main 分支）
- **服务器**：`45.192.98.86:7766`，root / `p15q5hTjjqXI`（paramiko 连接）
- **后端代码**：服务器 `/opt/glm-pool/app.py`（注意目录名是 glm-pool 但内容是 JF）
- **飞书文档**：`https://my.feishu.cn/docx/Bd78d2lbio4SBsx17UXcE0CJnhF`
- **蓝奏云 nb 文件夹**：fol_id=4574946
- **更新地址**：`https://jf.ainb7.com/start/deploy`
- **测试文件夹**：`C:\Users\Administrator\Desktop\前台\子站\`
- **本地路由集成提示词**：`C:\Users\Administrator\_ai_workspace\本地路由集成WorkBuddy部署_提示词.md`
