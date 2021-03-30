export interface Resposta {

  status: string;
  sources: [
    {
      id: string;
      name: string;
      description: string;
      url: string;
      category: string;
      language: string;
      country: string;
    }
  ];
}
