# 每日论文阅读：维护与自动发布

页面由 `data/daily-papers.json` 驱动：每个对象必须包含目录所需的书目信息，以及按顺序排列的六个 `sections`。本地或网页端修改后，GitHub Actions 会运行结构校验；GitHub Pages 会从默认分支自动发布静态页面。

## 日常人工归档

1. 复制最近一篇对象，填写唯一的 `id`（推荐使用 `YYYY-MM-DD-简短英文主题`）。
2. 保留六个部分，且把事实、作者结论和自己的推断明确区分。
3. 提交到 `main` 或通过 Pull Request 合并。校验通过后，目录和详情页都会自动更新。

## 从外部工具自动提交

仓库提供 `repository_dispatch` 事件类型 `publish-daily-paper`。外部发布器（例如获得明确授权的 ChatGPT/GitHub 集成或自建脚本）可向 GitHub REST API 的 `/repos/junhaoshen489/literature-library/dispatches` 发送：

```json
{
  "event_type": "publish-daily-paper",
  "client_payload": {"paper": {"id": "...", "recommendedOn": "YYYY-MM-DD", "title": "...", "authors": "...", "published": "YYYY-MM-DD", "journal": "...", "doi": "10....", "summary": "...", "sections": [{"heading": "1. 论文基本信息", "body": ["..."]}, {"heading": "2. 核心创新", "body": ["..."]}, {"heading": "3. 关键结论", "body": ["..."]}, {"heading": "4. 为什么值得读", "body": ["..."]}, {"heading": "5. 后续启发", "body": ["..."]}, {"heading": "6. 值得思考的问题", "body": ["..."]}]}}
}
```

调用方需要一个仅具该仓库 Contents 写入权限的细粒度 GitHub token。工作流会拒绝缺字段、重复 ID 或少于/多于六个阅读部分的数据，然后以 `github-actions[bot]` 身份提交。

GitHub Actions 无法直接读取 ChatGPT 对话或每日推荐内容，因此在未配置外部发布器和令牌前，它不能自行生成论文；当前工作流解决的是“结构化内容一旦送达即可校验并发布”的自动化环节。
