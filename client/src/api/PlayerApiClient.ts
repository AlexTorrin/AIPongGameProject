import axios, { AxiosInstance } from 'axios';
import {
  GetPlayerStatsRequest,
  GetPlayerStatsResponse,
  UpdatePlayerProfileRequest,
  UpdatePlayerProfileResponse,
} from '@pong/shared';

/**
 * Player API Client
 * SRP: Only handles player-related API communication
 */
export class PlayerApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = process.env.VITE_API_URL || 'http://localhost:3000/api') {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
    });
  }

  async getPlayerStats(
    request: GetPlayerStatsRequest,
  ): Promise<GetPlayerStatsResponse> {
    try {
      const response = await this.axiosInstance.get<GetPlayerStatsResponse>(
        `/players/${request.playerId}/stats`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updatePlayerProfile(
    request: UpdatePlayerProfileRequest,
  ): Promise<UpdatePlayerProfileResponse> {
    try {
      const response = await this.axiosInstance.put<UpdatePlayerProfileResponse>(
        `/players/${request.playerId}`,
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