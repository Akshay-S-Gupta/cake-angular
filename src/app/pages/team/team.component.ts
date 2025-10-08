import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  standalone: true,
  templateUrl: './team.component.html'
})
export class TeamComponent {
  members = [
    { name: 'Akshay', photo: 'assets/team/Akshay.jpg' },
    { name: 'Anushka', photo: 'assets/team/Anushka.jpg' },
    { name: 'Maria', photo: 'assets/team/Maria.jpg' }
  ];
}


