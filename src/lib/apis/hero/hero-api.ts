import { BaseApiResult } from "../api-types";
import { BaseApi } from "../base";
import { Hero } from "./hero-type";

export class HeroApi extends BaseApi {
  getHero() {
    return this.get<BaseApiResult<Hero[]>>({
      url: "/hero",
    });
  }
}
