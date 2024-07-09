export interface Author {
    id: number;
    name: string;
    bio?: string;
    birthdate: Date;
  }
  
  export interface Book {
    id: number;
    title: string;
    description?: string;
    published_date: Date;
    author_id: number;
  }

  
  export interface ApiResponse<T=null> {
    success: boolean;
    message: string;
    data: T | null;
  }


