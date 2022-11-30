<template>
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
                <ul class="nav navbar-nav">
                    <li class="nav-item dropdown" dropdown="" placement="bottom right">
                        <a class="nav-link user dropdown-toggle" data-toggle="dropdown" dropdowntoggle=""
                            href="http://serprodesign.estaleiro.serpro/showcase/#" role="button" id="dropdown-0"
                            aria-haspopup="true" aria-expanded="false">
                            <div class="d-flex align-items-center nav-link" dropdown-trigger="">
                                <span class="user-info mr-2 d-none d-md-flex">
                                    <span id="infUserName" class="user-name"></span>
                                    <span class="user-job">Administrador</span>
                                </span>
                                <img alt="Avatar" aria-hidden="true" class="img-avatar" src="./images/content/user.png">
                            </div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-0"
                            style="left: auto; right: 0px;">

                            <div class="dropdown-item">
                                <i class="nav-icon fa fa-user"></i>
                                <span id="infUserCPF">000.000.000-00</span>

                            </div>

                            <div id="btnSysLogout" class="dropdown-item" onclick="Session.logout()">
                                <i class="nav-icon fa fa-power-off"></i>
                                <span id="sair"><strong> Sair</strong></span>
                            </div>
                        </div>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: "AppHeader"
}
</script>