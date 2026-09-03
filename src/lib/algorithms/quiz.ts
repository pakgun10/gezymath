import { generateSingleProblem, type WorksheetProblem } from './worksheet';

export interface QuizQuestion {
	id: string;
	category: string;
	question: string;
	latexQuestion?: string;
	options: string[];
	correctAnswer: string;
	explanation: string;
}

export interface QuizOptions {
	topic?: string;
	count?: number;
}

export function generateQuizQuestions(options: QuizOptions = {}): QuizQuestion[] {
	const { topic = 'random', count = 5 } = options;
	const questions: QuizQuestion[] = [];

	const availableTopics = [
		'pythagoras', 'fpb-kpk', 'quadratic', 'fraction', 'trigonometri', 'calculus',
		'bilangan-bulat', 'pecahan-desimal', 'perbandingan', 'pangkat-akar',
		'aljabar-dasar', 'spldv', 'pola-barisan', 'fungsi-linear',
		'geometri-bidang', 'geometri-ruang', 'transformasi',
		'statistika', 'peluang', 'aritmetika-sosial',
		'notasi-ilmiah', 'bilangan-prima', 'bentuk-aljabar', 'deret',
		'koordinat', 'konversi-satuan', 'geometri-bidang-lanjut', 'geometri-ruang-lanjut',
		'peluang-lanjut', 'statistika-lanjut', 'aritmetika-lanjut',
		'relasi-domain', 'fungsi-nonlinear', 'sudut-garis', 'kesebangunan', 'komposisi-transformasi'
	];

	for (let i = 1; i <= count; i++) {
		let currentTopic = topic;
		if (topic === 'random') {
			currentTopic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
		}

		const problem = generateSingleProblem(i, currentTopic);
		const { options: generatedOptions, correctAnswer } = generateOptionsForProblem(problem);

		questions.push({
			id: `q${i}`,
			category: problem.topic,
			question: problem.questionText,
			latexQuestion: problem.questionLatex,
			options: generatedOptions,
			correctAnswer,
			explanation: problem.solutionSteps ? problem.solutionSteps.join(' ') : `Jawaban yang tepat adalah ${correctAnswer}.`
		});
	}

	return questions;
}

function generateOptionsForProblem(problem: WorksheetProblem): { options: string[]; correctAnswer: string } {
	const correctAnswer = problem.answerText.trim();
	const set = new Set<string>([correctAnswer]);

	// 1. Currency format Rp15.000 / Rp1.500.000
	const rpMatch = correctAnswer.match(/^Rp\s*([\d\.]+)/i);
	if (rpMatch) {
		const rawVal = parseInt(rpMatch[1].replace(/\./g, ''), 10);
		if (!isNaN(rawVal) && rawVal > 0) {
			const offsets = [0.8, 1.2, 0.5, 1.5, 1.1, 0.9, 2];
			for (const mult of offsets) {
				if (set.size >= 4) break;
				const candVal = Math.round((rawVal * mult) / 1000) * 1000 || rawVal + 5000;
				const candStr = `Rp${candVal.toLocaleString('id-ID')}`;
				if (candStr !== correctAnswer) set.add(candStr);
			}
		}
	}

	// 2. Trigonometry special values
	const trigValues = ['0', '1/2', '1/2 √2', '1/2 √3', '1', '1/3 √3', '√3', '-1', 'Tidak terdefinisi'];
	if (trigValues.includes(correctAnswer)) {
		for (const tv of trigValues) {
			if (set.size >= 4) break;
			if (tv !== correctAnswer) set.add(tv);
		}
	}

	// 3. Unit pattern (e.g., "154 cm²", "10 cm", "20 km", "50 kali", "25%")
	const unitMatch = correctAnswer.match(/^(-?\d+(?:\.\d+)?)\s*(cm²|cm³|cm|m|km|kali|%|kg|g|detik|menit|jam)$/i);
	if (unitMatch && set.size < 4) {
		const val = parseFloat(unitMatch[1]);
		const unit = unitMatch[2];
		const isFloat = unitMatch[1].includes('.');
		const mults = [val + 2, val - 2, val + 5, val - 5, val * 2, Math.max(1, Math.round(val / 2))];
		for (const cand of mults) {
			if (set.size >= 4) break;
			const candStr = `${isFloat ? cand.toFixed(2) : Math.round(cand)} ${unit}`;
			if (candStr !== correctAnswer && cand > 0) set.add(candStr);
		}
	}

	// 4. Pure integer or decimal number (e.g. "12", "8", "3.14")
	const numMatch = correctAnswer.match(/^(-?\d+(?:\.\d+)?)$/);
	if (numMatch && set.size < 4) {
		const val = parseFloat(numMatch[1]);
		const isFloat = numMatch[1].includes('.');
		const diffs = [val + 2, val - 2, val + 4, val - 4, val * 2, Math.round(val / 2), val + 10];
		for (const cand of diffs) {
			if (set.size >= 4) break;
			const candStr = isFloat ? cand.toFixed(2) : String(Math.round(cand));
			if (candStr !== correctAnswer) set.add(candStr);
		}
	}

	// 5. Fraction (e.g., "3/4", "5/8")
	const fracMatch = correctAnswer.match(/^(\d+)\/(\d+)$/);
	if (fracMatch && set.size < 4) {
		const n = parseInt(fracMatch[1], 10);
		const d = parseInt(fracMatch[2], 10);
		const candidates = [
			`${n + 1}/${d}`,
			`${Math.max(1, n - 1)}/${d}`,
			`${n}/${d + 1}`,
			`${n + 2}/${d}`,
			`${n}/${d + 2}`
		];
		for (const c of candidates) {
			if (set.size >= 4) break;
			if (c !== correctAnswer) set.add(c);
		}
	}

	// 6. Coordinates: P'(x, y)
	const coordMatch = correctAnswer.match(/^P'\((-?\d+),\s*(-?\d+)\)$/);
	if (coordMatch && set.size < 4) {
		const x = parseInt(coordMatch[1], 10);
		const y = parseInt(coordMatch[2], 10);
		const cands = [
			`P'(${-x}, ${y})`,
			`P'(${x}, ${-y})`,
			`P'(${-x}, ${-y})`,
			`P'(${y}, ${x})`,
			`P'(${-y}, ${x})`
		];
		for (const c of cands) {
			if (set.size >= 4) break;
			if (c !== correctAnswer) set.add(c);
		}
	}

	// 7. System of equations (x = A, y = B)
	const sysMatch = correctAnswer.match(/^x\s*=\s*(-?\d+),\s*y\s*=\s*(-?\d+)$/i);
	if (sysMatch && set.size < 4) {
		const x = parseInt(sysMatch[1], 10);
		const y = parseInt(sysMatch[2], 10);
		const cands = [
			`x = ${y}, y = ${x}`,
			`x = ${-x}, y = ${y}`,
			`x = ${x}, y = ${-y}`,
			`x = ${x + 1}, y = ${y - 1}`,
			`x = ${-x}, y = ${-y}`
		];
		for (const c of cands) {
			if (set.size >= 4) break;
			if (c !== correctAnswer) set.add(c);
		}
	}

	// 8. Roots of quadratic (x₁ = A, x₂ = B)
	const quadMatch = correctAnswer.match(/^x₁\s*=\s*(-?\d+),\s*x₂\s*=\s*(-?\d+)$/i);
	if (quadMatch && set.size < 4) {
		const x1 = parseInt(quadMatch[1], 10);
		const x2 = parseInt(quadMatch[2], 10);
		const cands = [
			`x₁ = ${-x1}, x₂ = ${x2}`,
			`x₁ = ${x1}, x₂ = ${-x2}`,
			`x₁ = ${-x1}, x₂ = ${-x2}`,
			`x₁ = ${x1 + 1}, x₂ = ${x2 - 1}`
		];
		for (const c of cands) {
			if (set.size >= 4) break;
			if (c !== correctAnswer) set.add(c);
		}
	}

	// 9. Single linear equation (x = A)
	const linMatch = correctAnswer.match(/^x\s*=\s*(-?\d+)$/i);
	if (linMatch && set.size < 4) {
		const x = parseInt(linMatch[1], 10);
		const cands = [`x = ${-x}`, `x = ${x + 2}`, `x = ${x - 2}`, `x = ${x + 5}`];
		for (const c of cands) {
			if (set.size >= 4) break;
			if (c !== correctAnswer) set.add(c);
		}
	}

	// 10. Inequality (x > A / x < A)
	const ineqMatch = correctAnswer.match(/^x\s*(>|<|>=|<=)\s*(-?\d+)$/i);
	if (ineqMatch && set.size < 4) {
		const op = ineqMatch[1];
		const val = parseInt(ineqMatch[2], 10);
		const oppOp = op === '>' ? '<' : op === '<' ? '>' : op === '>=' ? '<=' : '>=';
		const cands = [
			`x ${oppOp} ${val}`,
			`x ${op} ${val + 2}`,
			`x ${op} ${val - 2}`,
			`x ${oppOp} ${val + 1}`
		];
		for (const c of cands) {
			if (set.size >= 4) break;
			if (c !== correctAnswer) set.add(c);
		}
	}

	// Fallbacks if set still has less than 4 elements
	let fallbackCounter = 1;
	while (set.size < 4) {
		const cand = `${correctAnswer} (${fallbackCounter})`;
		set.add(cand);
		fallbackCounter++;
	}

	const shuffledOptions = shuffleArray(Array.from(set));
	return { options: shuffledOptions, correctAnswer };
}

function shuffleArray<T>(array: T[]): T[] {
	const arr = [...array];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}
