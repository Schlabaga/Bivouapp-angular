import { Pipe, PipeTransform } from '@angular/core';

// ici on transforme une date en texte du type "Il y a 2 heures"
@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date | string | number): string{
    if(!value) return '';

    // On convertit la valeur en Date si ce n'est pas déjà le cas
    const date= new Date(value);
    const now = new Date();

    // Calcul du nombre de secondes écoulées entre maintenant et la date
    const seconds = Math.floor((now.getTime() - date.getTime())/1000);

    // Si moins de 29 secondes on affiche "A l'instant"
    if(seconds<29){
      return "A l'instant";
    }

    // Dictionnaire qui contient le nombre de secondes pour chaque unité de temps
    const unities: {[key:string]: number} = {
      'an': 31536000,
      'mois': 2592000,
      'semaine': 604800,
      'jour': 86400,
      'heure': 3600,
      'minute': 60,
      'seconde': 1
    }

    // On boucle sur les unités pour trouver la plus grande qui corresponde
    let counter;
    for (const i in unities) {
      counter = Math.floor(seconds / unities[i]);
      if (counter > 0) {
        if (counter === 1) {
          return `Il y a ${counter} ${i}`; // singulier
        } else {
          // pour les unités au pluriel (sauf mois qui ne change pas)
          const unit = i === 'mois' ? i : i + 's';
          return `il y a ${counter} ${unit}`;
        }
      }
    }

    // Si rien ne correspond, on retourne la valeur telle quelle
    return value.toString();
  }
}
