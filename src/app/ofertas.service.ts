import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model';
import { URL_API } from './app.api'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OfertasService {

    public constructor(private http: Http){
    }

    public getOfertas(): Promise<Oferta[]>{
        // efetuar uma requisição Http
       return this.http.get(`${URL_API}?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta.json())
        // retornar uma promise Oferta[]
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]>{
        return this.http.get(`${URL_API}?categoria=${categoria}`)
        .toPromise()
        .then((resposta: any) => resposta.json())
    }

    public getOfertaPorId(id: number): Promise<Oferta>{
       return this.http.get(`${URL_API}?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
           return resposta.json()[0];
        })
    }

    /*
    public ofertas: Oferta[] = [
        {
            id: 1,
            categoria: "restaurante",
            titulo: "Super Burger",
            descricao_oferta: "Rodízio de Mini-hambúrger com opção de entrada.",
            anunciante: "Original Burger",
            valor: 29.90,
            destaque: true,
            imagens: [
                { url: "/assets/ofertas/1/img1.jpg" },
                { url: "/assets/ofertas/1/img2.jpg" },
                { url: "/assets/ofertas/1/img3.jpg" },
                { url: "/assets/ofertas/1/img4.jpg" }
            ]
        },
        {
            id: 2,
            categoria: "restaurante",
            titulo: "Cozinha Mexicana",
            descricao_oferta: "Almoço ou Jantar com Rodízio Mexicano delicioso.",
            anunciante: "Mexicana",
            valor: 32.90,
            destaque: true,
            imagens: [
                { url: "/assets/ofertas/2/img1.jpg" },
                { url: "/assets/ofertas/2/img2.jpg" },
                { url: "/assets/ofertas/2/img3.jpg" },
                { url: "/assets/ofertas/2/img4.jpg" }
            ]

        },
        {
            id: 4,
            categoria: "diversao",
            titulo: "Estância das águas",
            descricao_oferta: "Diversão garantida com piscinas, trilhas e muito mais.",
            anunciante: "Estância das águas",
            valor: 31.90,
            destaque: true,
            imagens: [
                { url: "/assets/ofertas/3/img1.jpg" },
                { url: "/assets/ofertas/3/img2.jpg" },
                { url: "/assets/ofertas/3/img3.jpg" },
                { url: "/assets/ofertas/3/img4.jpg" },
                { url: "/assets/ofertas/3/img5.jpg" },
                { url: "/assets/ofertas/3/img6.jpg" }
            ]
        }
    ]

    public getOfertas(): Array<Oferta> {
        return this.ofertas;
    }

    public getOfertas2(): Promise<Oferta[]> {
        return new Promise((resolve, reject) => {
            console.log('Será que passou por aqui ?')
            let deu_certo = true;
            if(deu_certo){
                setTimeout(() => {
                    resolve(this.ofertas)  
                }, 3000);
                
            }else{
                reject({ codigo_erro: 404, mensagem_erro: 'Servidor não encontrado!'})
            }
        })
        .then(( ofertas: Oferta[]) => {
            console.log('Tratativa primeiro then')
            return ofertas;
        })
        .then(( ofertas: Oferta[]) => {
            console.log('Tratativa segundo then')
            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    resolve2( ofertas )
                }, 3000);
            });
        })
        .then(( ofertas: Oferta[]) => {
            console.log('Terceiro then executado após 3 segundos porque estava aguardando a segunda Promise')
            return ofertas;
        })
    }
    */
}