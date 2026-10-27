import {readFile} from "node:fs/promises";
const required=["id","recommendedOn","title","authors","published","journal","doi","summary","sections"];
const papers=JSON.parse(await readFile(new URL("../data/daily-papers.json",import.meta.url),"utf8"));
if(!Array.isArray(papers)||!papers.length)throw new Error("daily-papers.json 必须是非空数组");
const ids=new Set();
for(const paper of papers){for(const key of required)if(!paper[key])throw new Error(`论文缺少字段：${key}`);if(ids.has(paper.id))throw new Error(`重复 id：${paper.id}`);ids.add(paper.id);if(!/^\d{4}-\d{2}-\d{2}$/.test(paper.recommendedOn)||!/^\d{4}-\d{2}-\d{2}$/.test(paper.published))throw new Error(`日期格式应为 YYYY-MM-DD：${paper.id}`);if(!/^10\.\S+/i.test(paper.doi))throw new Error(`DOI 格式不正确：${paper.id}`);if(!Array.isArray(paper.sections)||paper.sections.length!==6)throw new Error(`每篇论文必须恰有六个阅读部分：${paper.id}`);for(const section of paper.sections)if(!section.heading||!Array.isArray(section.body)||!section.body.length)throw new Error(`阅读部分不完整：${paper.id}`)}
console.log(`Validated ${papers.length} daily papers.`);
