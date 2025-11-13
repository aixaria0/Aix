/**
 * API Client
 * Configured with internal authentication token gating
 * All requests require valid bearer token authentication
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import authService, { AuthenticationError } from './auth';

export class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance | null = null;

  private constructor() {}

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  /**
   * Initialize the API client
   * Must be called after auth service is initialized
   */
  initialize(): void {
    if (!authService.isReady()) {
      throw new AuthenticationError(
        'Cannot initialize API client: Authentication not configured'
      );
    }

    const baseURL = authService.getApiBaseUrl();
    const token = authService.getBearerToken();

    this.axiosInstance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // Request interceptor to ensure token is always present
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Verify token is still available
        if (!authService.isReady()) {
          throw new AuthenticationError('Authentication token is missing');
        }
        
        // Update token in case it changed
        const currentToken = authService.getBearerToken();
        if (config.headers) {
          config.headers.Authorization = `Bearer ${currentToken}`;
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          throw new AuthenticationError(
            'Authentication failed. Please verify your internal credentials.'
          );
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get the axios instance
   * Throws if not initialized
   */
  private getAxiosInstance(): AxiosInstance {
    if (!this.axiosInstance) {
      throw new AuthenticationError(
        'API client not initialized. Please configure authentication first.'
      );
    }
    return this.axiosInstance;
  }

  /**
   * Make a GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const instance = this.getAxiosInstance();
    return instance.get<T>(url, config);
  }

  /**
   * Make a POST request
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const instance = this.getAxiosInstance();
    return instance.post<T>(url, data, config);
  }

  /**
   * Make a PUT request
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const instance = this.getAxiosInstance();
    return instance.put<T>(url, data, config);
  }

  /**
   * Make a DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const instance = this.getAxiosInstance();
    return instance.delete<T>(url, config);
  }

  /**
   * Clear the API client (for testing or logout)
   */
  clear(): void {
    this.axiosInstance = null;
  }
}

export default ApiClient.getInstance();
