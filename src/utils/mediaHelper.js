/**
 * Universal media helper for YouTube and Direct Video streaming
 */

export function extractYouTubeId(urlOrId) {
  if (!urlOrId || typeof urlOrId !== 'string') return null;

  const trimmed = urlOrId.trim();

  // If already an 11-character ID without slashes or query params
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Handle youtu.be/ID, youtube.com/watch?v=ID, youtube.com/shorts/ID, youtube.com/embed/ID, etc.
  const regexPatterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([a-zA-Z0-9_-]{11})/,
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
  ];

  for (const regex of regexPatterns) {
    const match = trimmed.match(regex);
    if (match) {
      const candidate = match[1] || match[7];
      if (candidate && candidate.length === 11) {
        return candidate;
      }
    }
  }

  return null;
}

export function isYouTube(urlOrId) {
  return Boolean(extractYouTubeId(urlOrId));
}

export function getYouTubeEmbedUrl(urlOrId, { autoplay = true, mute = false } = {}) {
  const id = extractYouTubeId(urlOrId);
  if (!id) return null;
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    enablejsapi: '1',
  });
  if (mute) {
    params.set('mute', '1');
  }
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function getYouTubeThumbnail(urlOrId, quality = 'hqdefault') {
  const id = extractYouTubeId(urlOrId);
  if (!id) return null;
  // Options: 'maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}

/**
 * Universal Behance helper
 */
export function extractBehanceId(urlOrId) {
  if (!urlOrId || typeof urlOrId !== 'string') return null;

  const trimmed = urlOrId.trim();

  // If already pure digits
  if (/^\d{6,12}$/.test(trimmed)) {
    return trimmed;
  }

  // Handle embed url: behance.net/embed/project/243275685?ilo0=1
  // Handle gallery url: behance.net/gallery/243275685/Instagram-Carousel-...
  const match = trimmed.match(/(?:embed\/project\/|gallery\/|project\/)(\d+)/i);
  if (match && match[1]) {
    return match[1];
  }

  // Any other path containing /243275685
  const fallbackMatch = trimmed.match(/\/(\d{6,12})/);
  if (fallbackMatch && fallbackMatch[1]) {
    return fallbackMatch[1];
  }

  return null;
}

export function isBehance(urlOrId) {
  return Boolean(extractBehanceId(urlOrId));
}

export function getBehanceEmbedUrl(urlOrId) {
  const id = extractBehanceId(urlOrId);
  if (!id) return null;
  return `https://www.behance.net/embed/project/${id}?ilo0=1`;
}

export function getBehanceGalleryUrl(urlOrId) {
  if (typeof urlOrId === 'string' && urlOrId.includes('behance.net/gallery/')) {
    return urlOrId;
  }
  const id = extractBehanceId(urlOrId);
  if (!id) return 'https://www.behance.net';
  return `https://www.behance.net/gallery/${id}`;
}

export function extractBehanceTitleFromUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const match = url.match(/gallery\/\d+\/([a-zA-Z0-9_-]+)/i);
  if (match && match[1]) {
    return match[1]
      .split(/[-_]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  return '';
}