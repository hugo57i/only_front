import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit, OnDestroy {

  public login: string;
  public motDePasse: string;

  public logsSubscribe: Subscription;
  public wrongLogs: boolean = false;
  public alreadyConnected: boolean = false;

  constructor(public userService: UserService) { }

  ngOnInit() {
    if(localStorage.getItem('connected') !== null && localStorage.getItem('connected') === 'true') {
      this.alreadyConnected = true;
      this.login = localStorage.getItem('login');
    }
  }

  ngOnDestroy() {
    if(this.logsSubscribe) {
      this.logsSubscribe.unsubscribe();
    }
  }

  public checkValues(): boolean {
    if ( this.login && this.login !== '' && this.motDePasse
    && this.motDePasse !== '') {
      return false;
    }
    return true;
  }

  public onSubmit(): void {
    this.logsSubscribe = this.userService.login(this.login, this.motDePasse).subscribe(data => {
      this.wrongLogs = data.body.success === true ? false : true;
      if(data.body.success) {
        localStorage.setItem('connected', 'true');
        localStorage.setItem('login', this.login);
        localStorage.setItem('token', data.headers.get('Authorization'));
        this.alreadyConnected = true;
      } 
    });
  }

  public onDisconnect(): void {
    localStorage.clear();
    this.alreadyConnected = false;
  }

}
