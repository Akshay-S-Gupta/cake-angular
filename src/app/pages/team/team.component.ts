import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NgFor],
  templateUrl: './team.component.html'
})
export class TeamComponent {
  members = [
    { name: 'Akshay', photo: 'assets/team/Akshay.jpg' },
    { name: 'Anushka', photo: 'assets/team/Anushka.jpg' },
    { name: 'Maria', photo: 'assets/team/Maria.jpg' }
  ];
}


