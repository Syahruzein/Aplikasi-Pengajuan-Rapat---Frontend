<template>
    <div id="FooterView" class="container-fluid">
        <div class="row justify-content-center">
            <div class="col">
                <br><br>
                <p class="text-center fs-5 text-white">Website Pengajuan Rapat <span class="text-yellow">| PENS &copy; {{ new Date().getFullYear() }}</span></p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #FooterView{
        height: 20vh;
        background-color: rgba(49, 49, 49, 1);
    }
</style>

<script>
export default {
    name: 'FooterView',
}
</script>