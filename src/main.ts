import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


  @Component ({
    selector: 'app-main',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './main.html',
    styleUrls: ['./main.css']
  })
  export default class MainComponent implements OnInit {
    nombreCliente = '';

    constructor(private router: Router) {}

    ngOnInit(): void {
      const datosCliente = localStorage.getItem('client');
      if (!datosCliente) {
        this.router.navigate(['/login']);
        return;
      }

      const cliente = JSON.parse(datosCliente);
    }
  }