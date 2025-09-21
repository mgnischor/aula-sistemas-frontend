import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterModule],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {}
