<template>
    <div>
        <v-card
        class=" pa-6 mt-4"
        outlined
        tile
        >
            <v-card elevation="3" class="pa-8">
                <v-card-title>
                    Data Akun APR
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="akun"
                    :search="search"
                    sort-by="id"
                    class="elevation-1"
                ></v-data-table>
            </v-card>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            search: "",
            headers: [
                // { text: "ID", value: "id" },
                { text: "Username", value: "username" },
                { text: "Email", value: "email" },
                { text: "Position", value: "position" },
            ],
            akun: [
                {
                    // "id": 1,
                    "username": "",
                    "email": "",
                    "position": "",
                },
            ],
        }
    },
    methods: {
        async getAuthAll() {
            const getData = await this.$axios(`http://localhost:8080/api/auth/user`);
            this.akun = getData.data;
        },
    },
    mounted() {
        this.getAuthAll();
    }
}
</script>
<style>
    
</style>