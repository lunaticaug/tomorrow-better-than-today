---
layout: default
title: Archive
permalink: /archive/
---

<div class="archive-page">
    <div class="container" style="max-width: 800px; margin: 0 auto; padding: 3rem 1.5rem;">
        <h1 style="font-size: 3rem; margin-bottom: 2rem;">Archive</h1>

        <p style="color: var(--secondary-text); margin-bottom: 3rem;">
            All posts organized by date
        </p>

        {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
        {% for year in posts_by_year %}
        <div class="archive-year" style="margin-bottom: 3rem;">
            <h2 style="font-size: 2rem; margin-bottom: 1.5rem; color: var(--primary-text);">
                {{ year.name }}
            </h2>

            <div class="archive-posts">
                {% for post in year.items %}
                <article class="archive-item" style="display: flex; align-items: baseline; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color);">
                    <time style="color: var(--secondary-text); min-width: 100px; font-size: 0.875rem;">
                        {{ post.date | date: "%b %d" }}
                    </time>
                    <div style="flex: 1; margin-left: 2rem;">
                        <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">
                            <a href="{{ post.url | relative_url }}" style="color: var(--primary-text); text-decoration: none;">
                                {{ post.title }}
                            </a>
                        </h3>
                        {% if post.category %}
                        <span style="display: inline-block; padding: 0.25rem 0.75rem; background: var(--bg-secondary); border-radius: 20px; font-size: 0.75rem; color: var(--secondary-text);">
                            {{ post.category }}
                        </span>
                        {% endif %}
                    </div>
                </article>
                {% endfor %}
            </div>
        </div>
        {% endfor %}

        {% if site.posts.size == 0 %}
        <div style="text-align: center; padding: 4rem 0; color: var(--secondary-text);">
            <p style="font-size: 1.25rem;">No posts yet.</p>
            <p>Check back soon for new content!</p>
        </div>
        {% endif %}

        <div style="margin-top: 4rem; text-align: center;">
            <a href="{{ '/' | relative_url }}" class="btn btn-outline" style="padding: 0.75rem 1.5rem; border: 1px solid var(--border-color); border-radius: 8px; text-decoration: none; color: var(--primary-text); display: inline-block;">
                ← Back to Home
            </a>
        </div>
    </div>
</div>