<template>
    <div>
        <button id="menu-button-lg" class="navbar-toggler d-md-down-none" type="button">
            <span class="navbar-toggler-icon"></span>
        </button>

        <button id="menu-button-sm" class="navbar-toggler d-xl-none" sdsidebartoggler="" type="button">
            <span class="navbar-toggler-icon"></span>
        </button>

        <a class="navbar-brand" href="https://www.serpro.gov.br">
            <img class="logoSerpro navbar-brand-full"
                src="https://serpro.gov.br/++theme++serpro.portalserprotema/++resource++serpro.portalserprotema/img/ass-governo-serpro.png"
                title="Serpro" alt="Serpro">
        </a>
        <span _ngcontent-gyk-c1="" class="mx-auto"></span>

        <div class="ml-3 mr-3 mr-lg-5 ng-tns-c0-0" slot-top-right="">
            <div class="ng-tns-c0-0">
                <div class="usermenu">
                    <b-dropdown id="dropdown-avatar" text="José" class="nav-item dropdown" placement="bottom right">
                        <b-dropdown-item> <i class="nav-icon fa fa-user"></i>
                            <span id="infUserCPF">000.000.000-00</span></b-dropdown-item>
                        <b-dropdown-item><i class="nav-icon fa fa-power-off"></i>
                            <span id="sair"><strong> Sair</strong></span></b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { BDropdown, BDropdownItem } from 'bootstrap-vue'
export default {
    name: "AppHeader",
    components: {
        BDropdown,
        BDropdownItem
    },
}
</script>