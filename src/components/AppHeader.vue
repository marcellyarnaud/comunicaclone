<template>
    <div>
        <div>
            <b-button v-b-toggle.sidebar-no-header id="menu-button-lg" 
                class="navbar-toggler d-md-down-none border-0" :disabled=!isLoggedIn>
                <span class="navbar-toggler-icon"></span>
            </b-button>
            <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
                <template #default="{ hide }">
                    <div class="p-3">
                        <nav class="mb-3">
                            <b-nav vertical>
                                <b-navbar toggleable type="light">
                                    <b-navbar-brand class="my-nav-brand" href="#">Administração</b-navbar-brand>
                                    <b-navbar-toggle target="navbar-toggle-administracao">
                                        <template #default="{ expanded }">
                                            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
                                            <b-icon v-else icon="chevron-bar-down"></b-icon>
                                        </template>
                                    </b-navbar-toggle>
                                    <b-collapse id="navbar-toggle-administracao" is-nav>
                                        <b-navbar-nav class="d-flex flex-column align-items-start">
                                            <b-nav-item class="subitem">
                                                <div class="row">
                                                    <div class="col-2">
                                                        <i class="nav-icon fa fa-paper-plane"></i>
                                                    </div>
                                                    <div class="col-auto" style="text-align: left;">
                                                        Logs da Aplicação
                                                    </div>
                                                </div>
                                            </b-nav-item>
                                            <b-nav-item class="subitem">
                                                <div class="row">
                                                    <div class="col-2">
                                                        <i class="nav-icon fa fa-user"></i>
                                                    </div>
                                                    <div class="col-auto" style="text-align: left;">
                                                        Perfis Usuários
                                                    </div>
                                                </div>
                                            </b-nav-item>
                                        </b-navbar-nav>
                                    </b-collapse>
                                </b-navbar>

                                <b-navbar toggleable type="light">
                                    <b-navbar-brand class="my-nav-brand" href="#">Gerenciar</b-navbar-brand>
                                    <b-navbar-toggle target="navbar-toggle-gerenciar">
                                        <template #default="{ expanded }">
                                            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
                                            <b-icon v-else icon="chevron-bar-down"></b-icon>
                                        </template>
                                    </b-navbar-toggle>
                                    <b-collapse id="navbar-toggle-gerenciar" is-nav>
                                        <b-navbar-nav class="d-flex flex-column align-items-start">
                                            <b-nav-item class="subitem">
                                                <div class="row">
                                                    <div class="col-2">
                                                        <i class="nav-icon fa fa-mail-bulk"></i>
                                                    </div>
                                                    <div class="col-auto" style="text-align: left;">
                                                        Comunicações
                                                    </div>
                                                </div>
                                            </b-nav-item>
                                        </b-navbar-nav>
                                    </b-collapse>
                                </b-navbar>
                            </b-nav>
                        </nav>
                    </div>
                </template>
                <template #footer="{ hide }">
                    <div class="d-flex text-light flex-row-reverse px-3 py-2">
                        <b-button size="sm" @click="hide">Fechar</b-button>
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
                        placement="bottom right" :disabled="cpf === ''">
                        <template #button-content>
                            <div class="d-flex align-items-center nav-link" dropdown-trigger="">
                                <span class="user-info mr-2 d-md-inline-flex right">
                                    <span id="infUserName" class="user-name">{{ nome }}</span>
                                    <span id="infUserJob" class="user-job">{{ perfil }}</span>
                                </span>
                                <img alt="Avatar" aria-hidden="true" class="img-avatar" src="../assets/images/user.png">
                            </div>
                        </template>
                        <b-dropdown-item class="left"> <i class="nav-icon fa fa-user"></i>
                            <span id="infUserCPF"> {{ cpf }}</span></b-dropdown-item>
                        <b-dropdown-item class="left"><i class="nav-icon fa fa-power-off"></i>
                            <span id="sair"><strong> Sair</strong></span></b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: "AppHeader",
    props:  {
        nome: String,
        perfil: String,
        cpf: String,
        isLoggedIn: Boolean
    },
    components: {
    },
    computed:   {
    }
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

#sidebar-no-header {
    top: 55px;
    height: -webkit-fill-available;
}

.b-sidebar-body {
    background-color: azure;
}

.b-sidebar-footer {
    background-color: #00348c;
}

.my-nav-brand {
    justify-content: left !important;
    font-weight: bold;
}

.subitem {
    justify-content: left !important;
    padding-left: 10px;
    font-weight: normal;
}

.subitem :hover {
    justify-content: left !important;
    font-weight: bolder;
}
</style>