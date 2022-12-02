<template>
    <div>
        <b-button id="menu-button-lg" class="navbar-toggler d-md-down-none" type="button">
            <span class="navbar-toggler-icon"></span>
        </b-button>

        <b-button id="menu-button-sm" class="navbar-toggler d-xl-none" sdsidebartoggler="" type="button">
            <span class="navbar-toggler-icon"></span>
        </b-button>

        <a class="navbar-brand" href="https://www.serpro.gov.br">
            <img class="logoSerpro navbar-brand-full" src="../assets/images/ass-governo-serpro.png" title="Serpro"
                alt="Serpro">
        </a>
        <span _ngcontent-gyk-c1="" class="mx-auto"></span>
        <div class="ml-3 mr-3 mr-lg-5 ng-tns-c0-0" slot-top-right="">
            <div class="ng-tns-c0-0 nav navbar-nav">
                <div class="usermenu">
                    <b-dropdown id="dropdown-avatar" class="nav-item dropdown dropdown-menu-right" placement="bottom right">
                        <template #button-content>
                            <div class="d-flex align-items-center nav-link" dropdown-trigger="">
                                <span class="user-info mr-2 d-none d-md-flex right">
                                    <span id="infUserName" class="user-name align-content-end">Lucas Martins do Amaral</span>
                                    <span class="user-job align-content-end">Administrador</span>
                                </span>
                                <img alt="Avatar" aria-hidden="true" class="img-avatar" src="../assets/images/user.png">
                            </div>
                        </template>
                        <b-dropdown-item class="left"> <i class="nav-icon fa fa-user"></i>
                            <span id="infUserCPF">000.000.000-00</span></b-dropdown-item>
                        <b-dropdown-item class="left"><i class="nav-icon fa fa-power-off"></i>
                            <span id="sair"><strong> Sair</strong></span></b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { BDropdown, BDropdownItem, BButton } from 'bootstrap-vue'
export default {
    name: "AppHeader",
    components: {
        BDropdown,
        BDropdownItem,
        BButton
    },
}
</script>
<style>
#dropdown-avatar button, #dropdown-avatar button :hover {
    background: none;
    display: flex;
    align-items: center;
    border: none;
    box-shadow: none;
    transform: none;
}
#dropdown-avatar ul {
    right: 0px !important;
    top: -5px !important;
}
#dropdown-avatar .btn.btn-secondary.dropdown-toggle::after, .btn.btn-secondary.dropdown-toggle:active::after {
    color: black !important;
}
.user-info, .user-info :hover {
    text-align: right;
}
</style>