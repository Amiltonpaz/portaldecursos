export interface ResNoticias {
  status: string;
  total: string;
  articles: [];
}

export interface Source {
  id: string;
  name: string;
}

export interface Artigo {
author: string;
title: string;
description: string;
url: string;
urlToImage: string;
publishedAt: string;
content: string;
}
