import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * Store an item in localstorage
   *
   * @param key key of the value to be stored
   * @param value string to be stored
   */
  public setProperty(key: string, value: string): void{
    localStorage.setItem(key, value);
  }

  /**
   * Store an item in localstorage
   *
   * @param key key of the stored value
   */
   public getProperty(key: string): string{
    return localStorage.getItem(key);
  }

  /**
   * Remove an item in localstorage
   *
   * @param key key of the stored value
   */
   public removeProperty(key: string): void{
    localStorage.removeItem(key);
  }
}
