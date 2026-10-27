import {readFile,writeFile} from "node:fs/promises";
const target=new URL("../data/daily-papers.json",import.meta.url);
const paper=JSON.parse(process.env.DAILY_PAPER_JSON||"null");
if(!paper)throw new Error("缺少 repository_dispatch 的 paper payload");
const papers=JSON.parse(await readFile(target,"utf8"));
if(papers.some(item=>item.id===paper.id))throw new Error(`已存在相同 id：${paper.id}`);
papers.push(paper);
await writeFile(target,`${JSON.stringify(papers,null,2)}\n`);
