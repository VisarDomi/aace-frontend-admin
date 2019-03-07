<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        @click="open_user_profile(item)"
        :class="{ 'table-success': item.register_status == 'approved',
        'table-info' : item.register_status =='applying',
        'table-info2' : item.register_status =='reapplying',
        'table-danger' : item.register_status =='rejected',
        'table-warning' : item.register_status =='rebutted' }"
      >
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.first_name }}</md-table-cell>
        <md-table-cell md-label="Surname">{{ item.last_name }}</md-table-cell>
        <md-table-cell md-label="Phone">{{ item.phone }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Status">{{ item.register_status }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      users: []
    };
  },
  mounted() {
    axios
      .get("https://aace.ml/api/user/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("admin_token")
        }
      })
      .then(res => {
        this.users = res.data;
        console.log("this.users: ", this.users);
        if (this.users.register_status == "applying") {
          this.tableStatus == "table-info";
        } else if (this.users.register_status == "reapplying") {
          this.tableStatus == "table-info2";
        } else if (this.users.register_status == "rebutted") {
          this.tableStatus == "table-warning";
        } else if (this.users.register_status == "approved") {
          this.tableStatus == "table-success";
        } else {
          this.tableStatus == "table-danger";
        }
      });
  },
  methods: {
    open_user_profile: function(item) {
      this.$router.push({
        name: "User Profile",
        params: {
          id: item.id
        }
      });
    }
  }
};
</script>

<style scoped>
.table-info {
  background-color: #b8ecf3;
}
.table-info2 {
  background-color: #91a8da;
}

.table-success {
  background-color: #cde9ce;
}

.table-danger {
  background-color: #fccac7;
}

.table-warning {
  background-color: #fff9c8;
}
</style>
