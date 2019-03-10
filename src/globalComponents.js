import DropDown from "./components/Dropdown.vue";
import NavTabsCard  from './components/Cards/NavTabsCard.vue';
import NavTabsTable from './components/Tables/NavTabsTable.vue';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component("drop-down", DropDown);
    Vue.component("nav-tabs-card",NavTabsCard);
    Vue.component("nav-tabs-table",NavTabsTable);
  }
};

export default GlobalComponents;
