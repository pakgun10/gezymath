export interface SetData {
  name: string;
  elements: string[];
}

export interface VennResult {
  sets: SetData[];
  union: string[];
  intersection: string[];
  differenceAB: string[];
  differenceBA: string[];
  onlyA: string[];
  onlyB: string[];
  onlyC?: string[];
  steps: string[];
}

export function parseSetString(input: string): string[] {
  if (!input) return [];
  const raw = input.split(/[,;\s]+/).map((s) => s.trim()).filter(Boolean);
  return Array.from(new Set(raw));
}

export function calculateVenn2Sets(setAStr: string, setBStr: string, nameA: string = 'A', nameB: string = 'B'): VennResult {
  const elementsA = parseSetString(setAStr);
  const elementsB = parseSetString(setBStr);

  const setA = new Set(elementsA);
  const setB = new Set(elementsB);

  const unionSet = new Set([...elementsA, ...elementsB]);
  const intersectionSet = new Set(elementsA.filter((x) => setB.has(x)));

  const onlyASet = new Set(elementsA.filter((x) => !setB.has(x)));
  const onlyBSet = new Set(elementsB.filter((x) => !setA.has(x)));

  const union = Array.from(unionSet).sort();
  const intersection = Array.from(intersectionSet).sort();
  const onlyA = Array.from(onlyASet).sort();
  const onlyB = Array.from(onlyBSet).sort();

  const steps = [
    `1. Anggota Himpunan:`,
    `   ${nameA} = { ${elementsA.join(', ')} } (n(${nameA}) = ${elementsA.length})`,
    `   ${nameB} = { ${elementsB.join(', ')} } (n(${nameB}) = ${elementsB.length})`,
    `2. Irisan (${nameA} ∩ ${nameB}) [Anggota yang ada di kedua himpunan]:`,
    `   ${nameA} ∩ ${nameB} = { ${intersection.join(', ')} } (n = ${intersection.length})`,
    `3. Gabungan (${nameA} ∪ ${nameB}) [Semua anggota gabungan]:`,
    `   ${nameA} ∪ ${nameB} = { ${union.join(', ')} } (n = ${union.length})`,
    `4. Selisih (${nameA} - ${nameB}) [Anggota ${nameA} tetapi bukan ${nameB}]:`,
    `   ${nameA} - ${nameB} = { ${onlyA.join(', ')} }`,
    `5. Selisih (${nameB} - ${nameA}) [Anggota ${nameB} tetapi bukan ${nameA}]:`,
    `   ${nameB} - ${nameA} = { ${onlyB.join(', ')} }`
  ];

  return {
    sets: [
      { name: nameA, elements: elementsA },
      { name: nameB, elements: elementsB }
    ],
    union,
    intersection,
    differenceAB: onlyA,
    differenceBA: onlyB,
    onlyA,
    onlyB,
    steps
  };
}
