import axios from 'axios';

interface LoginCredentials {
  name: string;
  email: string;
}

interface Dog {
  id: string;
  img: string;
  name: string;
  breed: string;
  age: number;
  zip_code: string;
}

interface SearchParams {
  page: number;
  size: number;
  breeds?: string[];
  sort?: string;
  filter?: string;
}

interface SearchResponse {
  resultIds: string[];
  total: number;
}

// Available sort options
export const SORT_OPTIONS = [
  { value: 'breed:asc', label: 'Breed (A-Z)' },
  { value: 'breed:desc', label: 'Breed (Z-A)' },
  { value: 'name:asc', label: 'Name (A-Z)' },
  { value: 'name:desc', label: 'Name (Z-A)' },
  { value: 'age:asc', label: 'Age (Youngest First)' },
  { value: 'age:desc', label: 'Age (Oldest First)' },
];

const API_URL = import.meta.env.VITE_API_URL || 'https://frontend-take-home-service.fetch.com';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiService = {
  async login(credentials: LoginCredentials): Promise<void> {
    try {
      await api.post('/auth/login', credentials);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error('Invalid credentials');
        }
        if (error.response?.status === 429) {
          throw new Error('Too many login attempts. Please try again later.');
        }
      }
      throw new Error('Login failed. Please try again.');
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error('Invalid credentials');
        }
        if (error.response?.status === 429) {
          throw new Error('Too many logout attempts. Please try again later.');
        }
      }
      throw new Error('Logout failed. Please try again.');
    }
  },

  async getBreeds(): Promise<string[]> {
    try {
      const response = await api.get<string[]>('/dogs/breeds');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch breeds');
    }
  },
  async getDogs(ids: string[]): Promise<Dog[]> {
    try {
      const response = await api.post<Dog[]>('/dogs', ids);

      return response.data;

      // return dogs;
    } catch (error) {
      console.error('Error fetching dogs:', error);
      throw error;
    }
  },

  async searchDogs({
    page,
    size,
    breeds,
    sort = 'breed:asc',
    filter,
  }: SearchParams): Promise<{ dogs: Dog[]; total: number }> {
    try {
      const from = (page - 1) * size;
      const params = new URLSearchParams({
        size: size.toString(),
        from: from.toString(),
        sort,
      });

      if (breeds?.length) {
        breeds.forEach((breed) => params.append('breeds', breed));
      }

      if (filter) {
        params.append('filter', filter);
      }

      const searchResponse = await api.get<SearchResponse>(`/dogs/search?${params}`);
      const dogsResponse = await api.post<Dog[]>('/dogs', searchResponse.data.resultIds);

      return {
        dogs: dogsResponse.data,
        total: searchResponse.data.total,
      };
    } catch (error) {
      throw new Error('Failed to fetch dogs');
    }
  },

  async matchDog(dogIds: string[]): Promise<string> {
    try {
      const response = await api.post<{ match: string }>('/dogs/match', dogIds);
      return response.data.match;
    } catch (error) {
      throw new Error('Failed to find a match');
    }
  },
};

export default apiService;
export type { Dog, LoginCredentials, SearchParams };
