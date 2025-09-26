---
layout: post
title: "초안 예시 - 이 글은 아직 공개되지 않습니다"
date: 2025-01-26
categories: draft
---

# 초안 폴더 사용법

이 포스트는 `_drafts/` 폴더에 있어서 GitHub Pages에서 보이지 않습니다.

## 언제 사용하나요?

- 아직 작성 중인 글
- 검토가 필요한 글
- 나중에 공개할 글

## 공개하려면?

```bash
# _drafts에서 _posts로 이동
mv _drafts/2025-01-26-draft-example.md _posts/
```

## 로컬에서 미리보기

```bash
# 로컬에서만 초안 포함해서 보기
jekyll serve --drafts
```

---

💡 팁: 이 폴더의 글들은 push해도 블로그에 안 나타나요!