import { AuthService } from './auth.service';
import { getAuthorizationHeader } from '../utils/getAuthorizationHeader';
import { ManifestService } from './manifest.service';
import { ReportService } from './report.service';

import axios, { AxiosInstance } from 'axios';

const baseURL = 'http://warehouse.qubex.info.np/api/';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  timeoutErrorMessage: 'Time out!',
  headers: getAuthorizationHeader(),
});

export const authService = new AuthService(axiosInstance);
export const manifestService = new ManifestService(axiosInstance);
export const reportService = new ReportService(axiosInstance);
