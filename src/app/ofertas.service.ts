import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model';
import { URL_API } from './app.api'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

@Injectable()
export class OfertasService {

    public constructor(private http: Http){
    }

    public getOfertas(): Promise<Oferta[]>{
        // efetuar uma requisição Http
       return this.http.get(`${URL_API}?destaque=true`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
        // retornar uma promise Oferta[]
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]>{
        return this.http.get(`${URL_API}?categoria=${categoria}`)
        .toPromise()
        .then((resposta: Response) => resposta.json())
    }

    public getOfertaPorId(id: number): Promise<Oferta>{
       return this.http.get(`${URL_API}?id=${id}`)
        .toPromise()
        .then((resposta: Response) => {
           return resposta.json()[0];
        })
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]>{
        return this.http.get(`${URL_API}?descricao_oferta_like=${termo}`)
        .retry(10)
        .map((resposta: Response) => resposta.json());
    }
}