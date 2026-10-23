import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /**
   *
   * @param raw
   */
  toPayload(raw: any) {
    return { ...raw, duchy: raw.duchy?._id ?? null };
  }
}