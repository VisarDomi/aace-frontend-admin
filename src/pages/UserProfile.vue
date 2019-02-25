<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="green" :user_id="user_id">

        </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card :user_id="user_id">

        </user-card>
      </div>
    </div>
  </div>
</template>

<script>
import { EditProfileForm, UserCard } from "@/pages";

export default {
  data(){
    return {
      user_id: ""
    }
  },
  created() {
    this.user_id = this.$route.params.id
  },
  components: {
    EditProfileForm,
    UserCard
  }
};
</script>
