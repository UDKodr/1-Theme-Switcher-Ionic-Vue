<template>
<div :class="store.theme">
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Inbox</ion-list-header>
            <ion-note>hi@ionicframework.com</ion-note>

            <ion-menu-toggle
              auto-hide="false"
              v-for="(p, i) in appPages"
              :key="i"
            >
              <ion-item
                @click="selectedIndex = i"
                router-direction="root"
                :router-link="p.url"
                lines="none"
                detail="false"
                class="hydrated"
                :class="{ selected: selectedIndex === i }"
              >
                <ion-icon
                  slot="start"
                  :ios="p.iosIcon"
                  :md="p.mdIcon"
                ></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>

          <ion-list id="labels-list">
            <ion-list-header>Settings</ion-list-header>
            <ion-menu-toggle>
              <ion-item @click="$router.push({ path: '/Settings' })">
                <ion-icon
                  slot="start"
                  :ios="settingsOutline"
                  :md="settingsSharp"
                ></ion-icon>
                <ion-label>Settings Page</ion-label>
              </ion-item></ion-menu-toggle
            >
            <ion-item @click="openModal()">
              <ion-icon
                slot="start"
                :ios="settingsOutline"
                :md="settingsSharp"
              ></ion-icon>
              <ion-label>Settings Bottom Sheet</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon
                slot="start"
                :ios="settingsOutline"
                :md="settingsSharp"
              ></ion-icon>
              <ion-select placeholder="Select Theme" v-model="theme"  @ionChange="setTheme($event.detail.value)">
                <ion-select-option value="darkRed">Red</ion-select-option>
                <ion-select-option value="darkPink">Pink</ion-select-option>
                <ion-select-option value="darkPurple">Purple</ion-select-option>
                <ion-select-option value="darkDarkPurple"
                  >Deep Purple</ion-select-option
                >
                <ion-select-option value="darkIndigo">Indigo</ion-select-option>
                <ion-select-option value="darkBlue">Blue</ion-select-option>
                <ion-select-option value="darkLightBlue"
                  >Light Blue</ion-select-option
                >
                <ion-select-option value="darkCyan">Cyan</ion-select-option>
                <ion-select-option value="darkTeal">Teal</ion-select-option>
                <ion-select-option value="darkGreen">Green</ion-select-option>
                <ion-select-option value="darkLightGreen"
                  >Light Green</ion-select-option
                >
                <ion-select-option value="darkLime">Lime</ion-select-option>
                <ion-select-option value="darkYellow">Yellow</ion-select-option>
                <ion-select-option value="darkAmber">Amber</ion-select-option>
                <ion-select-option value="darkOrange">Orange</ion-select-option>
                <ion-select-option value="darkDarkOrange"
                  >Deep Orange</ion-select-option
                >
              </ion-select>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app></div>
</template>

<script lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
  IonSelect,
  IonSelectOption,
  modalController,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import settingsModal from '../src/views/settingsModal.vue'
import { store } from "./theme/theme";
import {
  archiveOutline,
  archiveSharp,
  settingsOutline,
  settingsSharp,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";

export default defineComponent({
    data() {
    return {
    theme: localStorage.getItem("themeSet"),
    store,
    };
  },
  name: "App",
  components: {
    IonApp,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonRouterOutlet,
    IonSplitPane,
    IonSelect,
    IonSelectOption,
  },
  methods: {
     setTheme(value: string) {
      // @ts-ignore: Object is possibly 'null'.
      localStorage.setItem("themeSet", value);
      store.setItem();
    },
    async openModal() {
      const modal = await modalController
        .create({
          component: settingsModal,
          initialBreakpoint: 1,
          breakpoints: [0, 0.5, 1]
        })
      return modal.present();
    },
  },
  
  setup() {
    const selectedIndex = ref(0);
    const appPages = [
      {
        title: "Inbox",
        url: "/folder/Inbox",
        iosIcon: mailOutline,
        mdIcon: mailSharp,
      },
      {
        title: "Outbox",
        url: "/folder/Outbox",
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp,
      },
      {
        title: "Favorites",
        url: "/folder/Favorites",
        iosIcon: heartOutline,
        mdIcon: heartSharp,
      },
      {
        title: "Archived",
        url: "/folder/Archived",
        iosIcon: archiveOutline,
        mdIcon: archiveSharp,
      },
      {
        title: "Trash",
        url: "/folder/Trash",
        iosIcon: trashOutline,
        mdIcon: trashSharp,
      },
      {
        title: "Spam",
        url: "/folder/Spam",
        iosIcon: warningOutline,
        mdIcon: warningSharp,
      },
    ];
    const labels = [
      "Family",
      "Friends",
      "Notes",
      "Work",
      "Travel",
      "Reminders",
    ];

    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }

    const route = useRoute();

    return {
      selectedIndex,
      appPages,
      labels,
      archiveOutline,
      archiveSharp,
      settingsOutline,
      settingsSharp,
      heartOutline,
      heartSharp,
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      isSelected: (url: string) => (url === route.path ? "selected" : ""),
    };
  },
});
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
