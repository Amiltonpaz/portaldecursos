
export interface Professor{

  nome: string;
  idade: number;
  foto: string;
  cursos: Curso[];
  rating: number;
  sumario: string;
}

export interface Curso{

  id: any;
  titulo: string;
  descricao: string;
  foto: string;
  professor: Professor;
  rating: number;
  descriptionFull: string;
}


