import { BaseApiResult } from "../api-types";
import { BaseApi } from "../base";
import { SocialMedia } from "./social-media-type";

export class SocialMediaApi extends BaseApi {
  getSocialMedias() {
    return this.get<BaseApiResult<SocialMedia[]>>({
      url: "/social-medias",
    });
  }
}
