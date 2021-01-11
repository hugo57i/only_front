import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import countrydata from '../../assets/country.json';

@Component({
  selector: 'app-recapitulatif-donnee',
  templateUrl: './recapitulatif-donnee.component.html',
  styleUrls: ['./recapitulatif-donnee.component.css']
})
export class RecapitulatifDonneeComponent implements OnInit {

  @Input() user: User;
  constructor() { }

  ngOnInit() {

  }

}
