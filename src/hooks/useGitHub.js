/* ═══════════════════════════════════════════════════════════
   useGitHub — Real-time GitHub data hook
   Fetches user profile, repos, languages, and events
   Caches results in sessionStorage with 10-min TTL
═══════════════════════════════════════════════════════════ */

import { useState, useEffect, useCallback } from "react";
import { GITHUB_USERNAME, GH_REPOS as FALLBACK_REPOS, GH_STATS as FALLBACK_STATS, SKILLS as FALLBACK_SKILLS } from "../config/data";

const BASE_URL = "https://api.github.com";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

/* ── Cache helpers ── */
function getCached(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) {
      sessionStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function setCache(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch { /* quota exceeded — silently fail */ }
}

/* ── Fetcher with error handling ── */
async function ghFetch(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { Accept: "application/vnd.github.v3+json" },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return res.json();
}

/* ── Main hook ── */
export function useGitHub() {
  const [data, setData] = useState({
    profile: null,
    repos: [],
    languages: [],
    events: [],
    stats: FALLBACK_STATS,
    loading: true,
    error: null,
  });

  const fetchAll = useCallback(async () => {
    const cacheKey = `gh_${GITHUB_USERNAME}`;
    const cached = getCached(cacheKey);
    if (cached) {
      setData({ ...cached, loading: false, error: null });
      return;
    }

    try {
      // Parallel fetch: profile, repos (sorted by updated), events
      const [profile, repos, events] = await Promise.all([
        ghFetch(`/users/${GITHUB_USERNAME}`),
        ghFetch(`/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`),
        ghFetch(`/users/${GITHUB_USERNAME}/events/public?per_page=100`),
      ]);

      // Aggregate languages across all repos
      const langBytes = {};
      const langPromises = repos
        .filter((r) => !r.fork && r.language)
        .slice(0, 30) // limit to avoid rate limit
        .map(async (r) => {
          try {
            const langs = await ghFetch(`/repos/${GITHUB_USERNAME}/${r.name}/languages`);
            Object.entries(langs).forEach(([lang, bytes]) => {
              langBytes[lang] = (langBytes[lang] || 0) + bytes;
            });
          } catch { /* skip individual repo errors */ }
        });

      await Promise.all(langPromises);

      // Calculate language percentages
      const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0);
      let languages = [];
      
      if (totalBytes > 0) {
        let currentPctSum = 0;
        const entries = Object.entries(langBytes).sort((a, b) => b[1] - a[1]);
        
        languages = entries.map(([name, bytes], index) => {
          let pct;
          if (index === entries.length - 1) {
            pct = Math.max(0, 100 - currentPctSum); // Remaining to 100
          } else {
            pct = Math.round((bytes / totalBytes) * 100);
            currentPctSum += pct;
          }
          return { name, bytes, pct };
        });
      } else {
        languages = FALLBACK_SKILLS.map((s) => ({ name: s.name, pct: s.pct, bytes: 100 }));
      }

      // Calculate total stars
      const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

      // Build stats object
      const stats = {
        repos: profile.public_repos,
        followers: profile.followers,
        following: profile.following,
        stars: totalStars,
      };

      // Sort repos by updated_at for "recent" feed
      const sortedRepos = repos
        .filter((r) => !r.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      const result = {
        profile,
        repos: sortedRepos,
        languages,
        events,
        stats,
      };

      setCache(cacheKey, result);
      setData({ ...result, loading: false, error: null });
    } catch (err) {
      console.warn("GitHub API error, using fallback data:", err.message);
      setData({
        profile: null,
        repos: FALLBACK_REPOS,
        languages: FALLBACK_SKILLS.map((s) => ({ name: s.name, pct: s.pct, bytes: 0 })),
        events: [],
        stats: FALLBACK_STATS,
        loading: false,
        error: err.message,
      });
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return data;
}
