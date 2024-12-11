import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    apiUrl : string | undefined;
    apiLocal: string | undefined;
    apiDesa: string | undefined;
    apiTest:string | undefined;
    apiPre: string | undefined;
    apiProd: string | undefined;
    redirectLocalHost : string | undefined;
    redirectDesa : string | undefined;
}