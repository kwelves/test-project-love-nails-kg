# AGENTS.md

<INSTRUCTIONS>
всегда отвечай на русском

Для сайта Love Nails основным и единственным публичным URL считать:
https://test-project-love-nails-kg.vercel.app/

## Запрещено без явной команды

- НЕ делать Vercel deploy (ни preview, ни production)
- НЕ делать git push / git push origin
- НЕ открывать браузер и не проверять URL (ни localhost, ни vercel)
- НЕ запускать npm run build
- НЕ запускать Graphify
- НЕ делать npm ci / npm install если package.json не менялся

## Разрешено всегда

- Читать и редактировать файлы
- git add / git commit локально
- npm run dev (только если я явно прошу запустить сервер)

## Правило

Любое тяжёлое действие (deploy, push, build, browser, Graphify) —
только если я написал явно. Если не уверен — спроси, не делай.
</INSTRUCTIONS>

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Use PROJECT_AREAS.md as the responsibility map for splitting work between chats, code areas, and site blocks. Before changing files, identify the relevant project area and keep edits inside that area unless the task requires a cross-area change.

When the user types `/graphify`, invoke the `skill` tool with `skill: "graphify"` before doing anything else.

Rules:
- Use Graphify by default for every implementation request, codebase analysis, architecture question, refactor, debugging task, and final answer that depends on project structure.
- Before changing code, query the existing graph for relevant files, flows, and dependencies whenever `graphify-out/graph.json` exists.
- During implementation, use graph queries/path/explain to reduce raw source browsing and keep the work scoped to the connected project areas.
- After code changes, run `graphify update .` so the existing graph stays current; rebuild the graph only when the graph is missing, corrupted, or a full refresh is explicitly useful.
- If Graphify is unavailable or fails, continue with normal code inspection, mention the issue briefly, and repair/update Graphify when practical.
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
