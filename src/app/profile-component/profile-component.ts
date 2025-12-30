import {Component, Input} from '@angular/core';
import {UserService} from '../services/user';
import {User} from '../models/user.model';
import {ActivatedRoute} from '@angular/router';
import {TimeAgoPipe} from '../pies/time-ago-pipe';


@Component({
  selector: 'app-profile-component',
  standalone: true,
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.scss',
  imports: [TimeAgoPipe]
})
export class ProfileComponent {

  user: User | undefined;
  constructor(private UserService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    window.scrollTo(0,0);
    const idParam = this.route.snapshot.paramMap.get('id');

    // si c'est null on met 1
    const id = idParam ? Number(idParam) : 1;

    if (id > 0) {
      this.user = this.UserService.getUserById(id);
    }
  }

}
