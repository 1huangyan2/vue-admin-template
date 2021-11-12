import { App } from 'vue'
import PageFooter from './PageFooter/index.vue'
import ContentWrapper from './ContentWrapper/index.vue'

const components = [PageFooter, ContentWrapper]

export default {
  install: function (app: App) {
    components.forEach((com) => {
      app.component(com.name, com)
    })
  }
}
