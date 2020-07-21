import { AxixosRequestConfig } from "./types/index"

import xhr from "./xhr"

function axios(config: AxixosRequestConfig): void {
  xhr(config)
}
export default axios