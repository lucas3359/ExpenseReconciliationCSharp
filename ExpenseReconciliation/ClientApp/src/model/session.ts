import User from './user';

export default interface Session {
  loggedIn: boolean,
  user: User | null,
  token: string | null,
}
/*

export default class SessionContext {
  private loggedIn: boolean = false;
  private user: User | null = null;
  private token: string | null = null;
  
  constructor() {
    this.loggedIn = false;
    this.user = null;
    this.token = null;
  }
  
  public getThis(): Session {
    return {
      loggedIn: this.loggedIn,
      user: this.user,
      token: this.token,
    };
  }
  
  public updateSession(user: User,
               token: string) {
    this.loggedIn = true;
    this.user = user;
    this.token = token;
  }
  
  public resetSession() {
    this.loggedIn = false;
    this.user = null;
    this.token = null;
  }
}*/
