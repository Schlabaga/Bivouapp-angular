import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date | string | number): string{
    if(!value) return '';

    const date= new Date(value);
    const now = new Date();

    const seconds = Math.floor((now.getTime() - date.getTime())/1000);

    if(seconds<29){
      return "A l'instant";
    }

    const unities: {[key:string]: number} = {
      'an': 31536000,
      'mois': 2592000,
      'semaine': 604800,
      'jour': 86400,
      'heure': 3600,
      'minute': 60,
      'seconde': 1
    }


    let counter;
    for (const i in unities) {
      counter = Math.floor(seconds / unities[i]);
      if (counter > 0) {
        if (counter === 1) {
          return `Il y a ${counter} ${i}`; // singulier
        } else {
          // pour les unités au pluriel
          const unit = i === 'mois' ? i : i + 's';
          return `Il y a ${counter} ${unit}`;
        }
      }
    }
    return value.toString();


  }

}
