import axios, { AxiosInstance } from 'axios';
import {
  StartGameRequest,
  StartGameResponse,
  UpdateGameStateRequest,
  UpdateGameStateResponse,
  EndGameRequest,
  EndGameResponse,
  GetGameStateRequest,
  GetGameStateResponse,
} from '@pong/shared';

/**
 * Game API Client
 * SRP: Only handles game API communication
 * DIP: Depends on axios abstraction
 */
export class GameApiClient {
  private axiosInstance: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string = process.env.VITE_API_URL || 'http://localhost:3000/api') {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
    });

    // Add request interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        throw error;
      },
    );
  }

  async startGame(request: StartGameRequest): Promise<StartGameResponse> {
    try {
      const response = await this.axiosInstance.post<StartGameResponse>(
        '/games/start',
        request,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getGameState(request: GetGameStateRequest): Promise<GetGameStateResponse> {
    try {
      const response = await this.axiosInstance.get<GetGameStateResponse>(
        `/games/${request.sessionId}/state`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateGameState(
    request: UpdateGameStateRequest,
  ): Promise<UpdateGameStateResponse> {
    try {
      const response = await this.axiosInstance.post<UpdateGameStateResponse>(
        `/games/${request.sessionId}/update`,
        request,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async endGame(request: EndGameRequest): Promise<EndGameResponse> {
    try {
      const response = await this.axiosInstance.post<EndGameResponse>(
        `/games/${request.sessionId}/end`,
        request,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      return new Error(
        error.response?.data?.error || 'API request failed',
      );
    }
    return new Error('Unknown error occurred');
  }
}