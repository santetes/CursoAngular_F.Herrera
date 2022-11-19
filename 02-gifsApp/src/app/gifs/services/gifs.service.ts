import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifResponse, Gif } from '../interfaces/gifts.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _ApiKey: string = '1TpDBYvXGJfoUHuwM20R3wKIOR0cgtEb'
  private servicioUrl:string = 'https://api.giphy.com/v1/gifs'
  private _historial: string[] = []
  public resultados:Gif[] =[]

  get historial():string[]{
    return [...this._historial]
  }

  constructor(private httpClient:HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) ?? []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) ?? []

  }

  buscarGifts(query:string):void{

    query = query.trim().toLowerCase()

    if(!this._historial.includes(query)){
      this._historial.unshift(query)
      this._historial = this._historial.splice(0,10)

      localStorage.setItem('historial', JSON.stringify(this._historial) )
    }


    const params = new HttpParams()
            .set('api_key', this._ApiKey)
            .set('limit', '10')
            .set('q', query);

    this.httpClient.get<SearchGifResponse>(`${this.servicioUrl}/search`, {params})
                    .subscribe((resp:SearchGifResponse)=>{
                      this.resultados = resp.data
                      localStorage.setItem('resultados', JSON.stringify(resp.data))
                    })
    
  }

}
