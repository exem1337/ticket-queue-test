<template>
    <!-- Элемент из списка типов талонов -->
    <div class="typeItem shadow" @click="$emit('typeSelected', type)">
        <p>{{ type.typeName }}</p>
        <i class="material-icons" @click.stop="$emit('deleteType', type)">close</i>
        <i class="material-icons cardIcon">settings</i>
    </div>
</template>

<script lang="ts">
import ticketType from "@/classes/ticketType";
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        type: Object as () => ticketType
    },
    setup(props) {
    }
})

</script>

<style lang="scss" scoped>
.cardIcon{
    position: absolute;
    bottom: 0px !important;
    left: -50px !important;
    font-size: 7.5em !important;
    width: fit-content;
    height: fit-content;
    opacity: 15%;
    animation: rotate360 1.2s linear infinite;
    transition: color .3s ease;
    animation-play-state: paused;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none;   /* Chrome/Safari/Opera */
    -khtml-user-select: none;    /* Konqueror */
    -moz-user-select: none;      /* Firefox */
    -ms-user-select: none;       /* Internet Explorer/Edge */
    user-select: none;
    color: #ff9800;
}

.typeItem{
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    min-width: 150px;
    width: 100%;
    height: 100px;
    background-color: #cccccc;
    cursor: pointer;
    transition: .3s ease;
    position: relative;
    z-index: 1;

    font-size: 1.25em;
    &:hover {
        transform: scale(105%);
        background-color: #ff9800;
        color: #fff;
    }

    &:hover > .cardIcon {
        animation-play-state: running;
        color:#fff;
    }

    @keyframes rotate360 {
        to{ transform: rotate(360deg); }
    }

    &:active {
        transform: scale(100%);
    }

    i {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 2em;
        cursor: pointer;
        z-index: 2;
    }
}
</style>
