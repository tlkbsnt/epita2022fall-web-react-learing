import { AxiosInstance } from 'axios';

export class ReportService {
  protected readonly _http: AxiosInstance;

  public constructor(http: AxiosInstance) {
    this._http = http;
  }

  getTrucksSummary = async () => {
    const res = await this._http.get('/report/trucks', {
      responseType: 'blob',
    });
    return res.data;
  };

  getTruckReport = async (truckId: number) => {
    const res = await this._http.get(`/report/truck/${truckId}`, {
      responseType: 'blob',
    });
    return res.data;
  };
}

export default ReportService;
