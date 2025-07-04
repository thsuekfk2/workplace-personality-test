export interface TestStats {
  totalTests: number;
  typeDistribution: Record<string, number>;
  averageCompletionTime: number;
  lastUpdated: number;
}

export function updateStats(personalityTypeId: string, completionTime: number) {
  if (typeof window === 'undefined') return;

  const stats = getStats();
  
  stats.totalTests += 1;
  stats.typeDistribution[personalityTypeId] = (stats.typeDistribution[personalityTypeId] || 0) + 1;
  
  const totalTime = stats.averageCompletionTime * (stats.totalTests - 1) + completionTime;
  stats.averageCompletionTime = totalTime / stats.totalTests;
  
  stats.lastUpdated = Date.now();
  
  localStorage.setItem('testStats', JSON.stringify(stats));
}

export function getStats(): TestStats {
  if (typeof window === 'undefined') {
    return {
      totalTests: 0,
      typeDistribution: {},
      averageCompletionTime: 0,
      lastUpdated: 0
    };
  }

  const saved = localStorage.getItem('testStats');
  if (saved) {
    return JSON.parse(saved);
  }

  return {
    totalTests: 0,
    typeDistribution: {},
    averageCompletionTime: 0,
    lastUpdated: 0
  };
}

export function getMostPopularType(): string | null {
  const stats = getStats();
  if (Object.keys(stats.typeDistribution).length === 0) return null;
  
  return Object.entries(stats.typeDistribution).reduce((a, b) => 
    stats.typeDistribution[a[0]] > stats.typeDistribution[b[0]] ? a : b
  )[0];
}

export function formatCompletionTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  
  if (minutes > 0) {
    return `${minutes}분 ${remainingSeconds}초`;
  }
  return `${remainingSeconds}초`;
}