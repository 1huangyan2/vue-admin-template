import { App } from 'vue'
import PageFooter from './PageFooter/index.vue'
import ContentWrapper from './ContentWrapper/index.vue'
import SimpleTable from './SimpleTable/index.vue'

const components = [PageFooter, ContentWrapper, SimpleTable]

export default {
  install: function (app: App) {
    components.forEach((com) => {
      app.component(com.name, com)
    })
  }
}
