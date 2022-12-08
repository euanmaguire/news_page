type Category = 
    | "general" 
    | "business" 
    | "entertainment" 
    | "health" 
    | "science" 
    | "sports" 
    | "technology";

type NewsResponse = {
    pagination: Pagination;
    data: Article[];
}

type Pagination = {
    count: Int;
    offset: Int;
    limit: Int;
    total: Int;
}

type Article = {
    author: string;
    category: string;
    country: string;
    description: string;
    image: string;
    language: string;
    published_at: string;
    source: string;
    title: string;
    url: string;
}