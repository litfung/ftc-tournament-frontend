import { Node } from './Node';
import { Team } from './Team';

export class Photo {
  value: string;
}

export class Email {
  value: string;
  type?: string;
}

export class Name {
  givenName?: string;
  familyName?: string;
  middleName?: string;
}

export class Profile {
  provider?: string;
  id?: string;
  displayName?: string;
  name?: Name;
  emails?: Email[];
  photos?: Photo[];
}

export class User extends Node {
  teams?: Team[];
  username?: string;
  profile?: Profile;
}