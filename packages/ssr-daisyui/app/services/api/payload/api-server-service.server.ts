import axios, { type AxiosInstance } from 'axios'

/**
 * Mock Payload CMS API Service
 * This is a mock implementation for the image-service feature
 */

// Create a mock axios instance for the API client
export const apiServerServiceClient: AxiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30_000,
})

export interface PayloadMedia {
  filename?: string
  filesize?: number
  height?: number
  id: string
  mimeType?: string
  url?: string
  width?: number
}

// Export mock types that might be used
export interface PayloadUser {
  email: string
  id: string
  name?: string
}

// Mock function to clear service client token
export function clearServiceClientToken() {
  delete apiServerServiceClient.defaults.headers.common['Authorization']
}

// Mock function to set service client token
export function setServiceClientToken(token: string) {
  apiServerServiceClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
