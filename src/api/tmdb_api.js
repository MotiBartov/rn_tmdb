import axios from 'axios';

const apiKey =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzMxMjE4ZGRjYmQxMjg2MzQxMzVhYmY3NjczZmFiNSIsInN1YiI6IjU4ODc5MzBiYzNhMzY4NTllYzAwMGMwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2-dHZRGtC6VIU5wShfyq5ybKF0tjyRsecvRKZQ-LwVE';
const baseUrl = 'https://api.themoviedb.org/3/';

export default axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});
