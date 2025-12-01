import { BaseApiResult } from "../api-types";
import { BaseApi } from "../base";
import { Experience } from "./experience-type";

export class ExperienceApi extends BaseApi {
  getExperiences() {
    return this.get<BaseApiResult<Experience[]>>({
      url: "/experiences",
    });
  }
}
