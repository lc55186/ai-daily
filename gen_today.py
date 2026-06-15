#!/usr/bin/env python3
"""Generate today's AI daily article via LLM"""
import json, urllib.request, re, sys
from datetime import datetime
from pathlib import Path

base_url = "https://api.longcat.chat/openai/v1"
api_key = "ak_2vA1oU04A6he8rT1QJ1rf4eM1m99t"
model = "LongCat-2.0-Preview"
site_dir = "/root/sites/ai-daily"

system_prompt = "You are a senior technical blog writer specializing in AI and technology news. Write in Chinese (Mandarin). Structure clear with sections, code examples where relevant, unique insights. Tone like peer conversation, not textbook. Code must be runnable."

user_prompt = """Write a Chinese blog post: "AI 日报 2026-06-15"

Requirements:
- 1500-2500 words, 4-6 sections
- Include 2 Python code examples (one related to AI agent evaluation, one related to data analysis)
- Cover these key stories:

1. Anthropic shuts down Fable and Mythos models following Trump admin directive - discuss AI company vs government tension
2. SpaceX is now a public company valued for its AI potential
3. Google sues Chinese cybercrime network that used Gemini to automate scams
4. Stanford grads walk out on Google CEO Sundar Pichai speech - protest against AI industry direction
5. Vibe Coder vs Software Engineer - HN hot discussion on AI coding impact
6. Rio de Janeiro city government model Rio3.5 beats Qwen3.7 in benchmarks
7. HN discussion: Not everyone is using AI for everything (417 points)
8. $130B in data center projects blocked by protests - AI infrastructure faces community resistance
9. Ukraine's one-time test used fully autonomous drones to kill Russian soldiers
10. Lawsuit: ChatGPT validated suicidal woman's distrust of crisis lines

Output format: Start with YAML front matter between --- markers:
title: "AI 日报 2026-06-15：..."
date: "2026-06-15"
tags: [AI, ...]
description: "..."
author: "AI Assistant"
lang: zh

Then the article body in Markdown."""

payload = {
    "model": model,
    "messages": [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ],
    "max_tokens": 4096,
    "temperature": 0.7,
}

data = json.dumps(payload).encode()

try:
    sys.stdout.reconfigure(encoding="utf-8")
except (AttributeError, OSError):
    pass

req = urllib.request.Request(
    f"{base_url}/chat/completions",
    data=data,
    headers={"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"},
    method="POST"
)

print("Generating article via LLM...")
with urllib.request.urlopen(req, timeout=180) as resp:
    body = json.loads(resp.read().decode())
    content = body["choices"][0]["message"]["content"]
    print(f"Generated! ({len(content)} chars)")

# Parse front matter
pattern = r"^---\s*\n(.*?)\n---\n(.*)$"
match = re.match(pattern, content, re.DOTALL)
if match:
    fm_lines = match.group(1)
    body_text = match.group(2)
    fm = {}
    for line in fm_lines.strip().split("\n"):
        if ":" in line:
            key, _, value = line.partition(":")
            value = value.strip().strip('"').strip("'")
            if value.startswith("[") and value.endswith("]"):
                value = [v.strip().strip('"') for v in value[1:-1].split(",")]
            fm[key.strip()] = value
else:
    fm = {}
    body_text = content

# Fill missing front matter
if "title" not in fm: fm["title"] = "AI Daily"
if "date" not in fm: fm["date"] = datetime.now().strftime("%Y-%m-%d")
if "tags" not in fm: fm["tags"] = ["AI", "2026"]
if "description" not in fm:
    first_line = body_text.strip().split("\n")[0][:100]
    fm["description"] = first_line
if "author" not in fm: fm["author"] = "AI Assistant"
if "lang" not in fm: fm["lang"] = "zh"

# Rebuild full markdown
tags_str = ", ".join(f'"{t}"' for t in fm["tags"]) if isinstance(fm["tags"], list) else f'"{fm["tags"]}"'
full_md = f"""---
title: "{fm['title']}"
date: "{fm['date']}"
tags: [{tags_str}]
description: "{fm['description']}"
author: "{fm['author']}"
lang: "{fm['lang']}"
---

{body_text}"""

# Save
slug = "ai-daily-2026-06-15"
article_path = Path(site_dir) / "articles" / f"{slug}.md"
article_path.parent.mkdir(parents=True, exist_ok=True)
article_path.write_text(full_md, encoding="utf-8")
print(f"Saved: {article_path}")
print(f"Title: {fm['title']}")
print(f"Date: {fm['date']}")
