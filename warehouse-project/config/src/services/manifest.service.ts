import { AxiosInstance } from 'axios';
import { Manifest } from '../types/manifest';

export class ManifestService {
  protected readonly _http: AxiosInstance;

  public constructor(http: AxiosInstance) {
    this._http = http;
  }

  getAll = async () => {
    const res = await this._http.get('/manifests');
    const manifests: Array<Manifest> = res.data;
    return manifests;
  };
}

export default ManifestService;
