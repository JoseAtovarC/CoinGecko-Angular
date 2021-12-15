import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Coin } from './interface/coins';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public coins: Coin[] = [];
  public filterCoins:Coin[]=[];
  public titles: string[] = [
    '#', 'Coin', 'Price', 'Price Change', '24H Volume'
  ];

  public searchText:string="";

  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.http.get<Coin[]>("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .subscribe(
        res => {
          this.coins = res;
          this.filterCoins=res
        },
        err => {
          console.log(err)
        }
      )
  }

  searchComponent() {
   this.filterCoins= this.coins.filter(v=> 
    v.name.toLowerCase().includes(this.searchText.toLowerCase())||
    v.symbol.toLowerCase().includes(this.searchText.toLowerCase()))
  }

}
