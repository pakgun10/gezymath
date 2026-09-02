export type CategoryId =
  | 'aritmetika'
  | 'aljabar'
  | 'geometri'
  | 'trigonometri'
  | 'kalkulus'
  | 'statistika'
  | 'probabilitas'
  | 'matriks'
  | 'grafik'
  | 'himpunan'
  | 'transformasi'
  | 'kalkulator';

export interface ToolCategory {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
  badgeColor: string;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  route: string;
  icon: string;
  keywords: string[];
  popular?: boolean;
  educationalLevel: 'SD' | 'SMP' | 'SMA' | 'Kuliah' | 'Umum';
  isMVP?: boolean;
}
