export interface FrequencyItem {
  value: number;
  frequency: number;
}

export interface StatisticsResult {
  count: number;
  min: number;
  max: number;
  range: number;
  sum: number;
  mean: number;
  median: number;
  modes: number[];
  variancePopulation: number;
  stdDevPopulation: number;
  varianceSample: number;
  stdDevSample: number;
  q1: number;
  q2: number;
  q3: number;
  iqr: number;
  sortedData: number[];
  frequencies: FrequencyItem[];
  steps: string[];
}

function calculatePercentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  if (sorted.length === 1) return sorted[0];

  const index = (sorted.length - 1) * p;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;

  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

export function calculateStatistics(data: number[]): StatisticsResult {
  const cleanData = data.filter((d) => !isNaN(d) && isFinite(d));

  if (cleanData.length === 0) {
    return {
      count: 0,
      min: 0,
      max: 0,
      range: 0,
      sum: 0,
      mean: 0,
      median: 0,
      modes: [],
      variancePopulation: 0,
      stdDevPopulation: 0,
      varianceSample: 0,
      stdDevSample: 0,
      q1: 0,
      q2: 0,
      q3: 0,
      iqr: 0,
      sortedData: [],
      frequencies: [],
      steps: ['Masukkan sekumpulan data angka.']
    };
  }

  const sortedData = [...cleanData].sort((a, b) => a - b);
  const count = sortedData.length;
  const min = sortedData[0];
  const max = sortedData[count - 1];
  const range = max - min;
  const sum = sortedData.reduce((acc, val) => acc + val, 0);
  const mean = sum / count;

  // Median & Quartiles
  const median = calculatePercentile(sortedData, 0.5);
  const q1 = calculatePercentile(sortedData, 0.25);
  const q2 = median;
  const q3 = calculatePercentile(sortedData, 0.75);
  const iqr = q3 - q1;

  // Mode(s) & Frequencies
  const freqMap = new Map<number, number>();
  sortedData.forEach((val) => freqMap.set(val, (freqMap.get(val) || 0) + 1));

  let maxFreq = 0;
  freqMap.forEach((freq) => {
    if (freq > maxFreq) maxFreq = freq;
  });

  const modes: number[] = [];
  if (maxFreq > 1) {
    freqMap.forEach((freq, val) => {
      if (freq === maxFreq) modes.push(val);
    });
  }

  const frequencies: FrequencyItem[] = Array.from(freqMap.entries())
    .map(([value, frequency]) => ({ value, frequency }))
    .sort((a, b) => a.value - b.value);

  // Variances
  const sumSqDiff = sortedData.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  const variancePopulation = sumSqDiff / count;
  const stdDevPopulation = Math.sqrt(variancePopulation);

  const varianceSample = count > 1 ? sumSqDiff / (count - 1) : 0;
  const stdDevSample = Math.sqrt(varianceSample);

  const steps: string[] = [
    `1. Mengurutkan data (N = ${count}):`,
    `   [ ${sortedData.join(', ')} ]`,
    `2. Menghitung Rata-rata (Mean / x̄):`,
    `   x̄ = Σx / N = ${sum} / ${count} = ${mean.toFixed(4)}`,
    `3. Menghitung Median (Nilai Tengah):`,
    `   Q₂ (Median) = ${median.toFixed(4)}`,
    `4. Modus (Nilai Paling Sering Muncul):`,
    `   ${modes.length > 0 ? `Modus = { ${modes.join(', ')} } (Frekuensi: ${maxFreq})` : 'Tidak ada modus (semua data berfrekuensi sama)'}`,
    `5. Kuartil & Jangkauan Interkuartil:`,
    `   Q₁ (Kuartil Bawah) = ${q1.toFixed(4)}`,
    `   Q₃ (Kuartil Atas) = ${q3.toFixed(4)}`,
    `   IQR = Q₃ - Q₁ = ${iqr.toFixed(4)}`,
    `6. Varians & Deviasi Standar:`,
    `   Varians Sampel (s²) = ${varianceSample.toFixed(4)} (s = ${stdDevSample.toFixed(4)})`,
    `   Varians Populasi (σ²) = ${variancePopulation.toFixed(4)} (σ = ${stdDevPopulation.toFixed(4)})`
  ];

  return {
    count,
    min,
    max,
    range,
    sum,
    mean: Number(mean.toFixed(4)),
    median: Number(median.toFixed(4)),
    modes,
    variancePopulation: Number(variancePopulation.toFixed(4)),
    stdDevPopulation: Number(stdDevPopulation.toFixed(4)),
    varianceSample: Number(varianceSample.toFixed(4)),
    stdDevSample: Number(stdDevSample.toFixed(4)),
    q1: Number(q1.toFixed(4)),
    q2: Number(q2.toFixed(4)),
    q3: Number(q3.toFixed(4)),
    iqr: Number(iqr.toFixed(4)),
    sortedData,
    frequencies,
    steps
  };
}
