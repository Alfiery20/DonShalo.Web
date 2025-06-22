import { environment } from "environments/environment";

const _apps_url = environment.apps_url;

export class constants {
    static readonly apiUrl: string = _apps_url.api;
  }
  