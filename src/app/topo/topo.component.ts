import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import '../util/rxjs-extensions';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;

  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
    .debounceTime(1000)
    .distinctUntilChanged()
    .switchMap((termo:string) => {
      console.log('Requisição HTTP para API: ', termo)
      if(termo.trim() === ''){
        return Observable.of<Oferta[]>([]);
      }
      return this.ofertasService.pesquisaOfertas(termo);
    })
    .catch((err: any) => {
      console.log('Erro no consumo da API: ', err);
      return Observable.of<Oferta[]>([]);
    })
  }

  public pesquisa(termoDaPesquisa: string): void{
    this.subjectPesquisa.next(termoDaPesquisa);
    /*this.ofertas = this.ofertasService.pesquisaOfertas(termoDaPesquisa);
    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas),
      (erro: any) => console.log('Erro status: ', erro.status),
      () => console.log('Fluxo de eventos concluído.')
    );*/
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }
}
