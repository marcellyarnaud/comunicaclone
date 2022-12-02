<template>
    <div>
        <div>
            <b-button v-b-toggle.sidebar-no-header id="menu-button-lg" class="navbar-toggler d-md-down-none">
                <span class="navbar-toggler-icon"></span>
            </b-button>
            <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
                <template #default="{ hide }">
                    <div class="p-3">
                        <h4 id="sidebar-no-header-title">Custom header sidebar</h4>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        </p>
                        <nav class="mb-3">
                            <b-nav vertical>
                                <b-nav-item active @click="hide">Active</b-nav-item>
                                <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
                                <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
                            </b-nav>
                        </nav>
                        <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
                    </div>
                </template>
            </b-sidebar>
        </div>

        <a class="navbar-brand" href="https://www.serpro.gov.br">
            <img class="logoSerpro navbar-brand-full" src="../assets/images/ass-governo-serpro.png" title="Serpro"
                alt="Serpro">
        </a>
        <span _ngcontent-gyk-c1="" class="mx-auto"></span>
        <div class="ml-3 mr-3 mr-lg-5 ng-tns-c0-0" slot-top-right="">
            <div class="ng-tns-c0-0 nav navbar-nav">
                <div class="usermenu">
                    <b-dropdown id="dropdown-avatar" class="nav-item dropdown dropdown-menu-right"
                        placement="bottom right">
                        <template #button-content>
                            <div class="d-flex align-items-center nav-link" dropdown-trigger="">
                                <span class="user-info mr-2 d-md-inline-flex right">
                                    <span id="infUserName" class="user-name">Lucas Martins do Amaral</span>
                                    <span id="infUserJob" class="user-job">Administrador</span>
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
#dropdown-avatar button,
#dropdown-avatar button :hover {
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
    padding-block: 0;
}

.btn.btn-secondary.dropdown-toggle::after,
.btn.btn-secondary.dropdown-toggle:active::after {
    color: black !important;
}

#dropdown-avatar button,
#dropdown-avatar button :hover {
    text-align: right !important;
}

.dropdown-menu {
    padding-bottom: 0;
    padding-top: 0;
    line-height: 1.5;
}

#infUserJob.user-job,
#infUserJob.user-job:hover {
    font-size: 0.75rem;
    width: 100% !important;
    display: block !important;
    text-align: right !important;
}
</style>