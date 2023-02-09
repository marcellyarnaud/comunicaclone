<template>
    <textarea id="editor" />
</template>

<script>
import { Jodit } from "jodit";
import { storesCommon } from "../mixins/storesCommon";

export default {
    name: "JoditHTML",
    props: {
        html: String,
        mode: {
            type: Number,
            default: 1
        },
        language: {
            type: String,
            default: 'pt_br'
        },
        inline: {
            type: Boolean,
            default: true
        }
    },
    mixins: [ storesCommon ],
    mounted() {
        this.editStore.editor = new Jodit("#editor", {
            "language": this.language,
            "allowResizeY": false,
            "toolbarButtonSize": "middle",
            "toolbarAdaptive": false,
            "defaultMode": this.mode,
            "saveHeightInStorage": true,
            "saveModeInStorage": true,
            "minWidth": null,
            "maxWidth": 1,
            "inline": this.inline,
            "toolbarInlineForSelection": true,
            "showPlaceholder": false
        }
        );
        this.editStore.editor.value = this.html;
    }
};
</script>

<style>
@import url('../../node_modules/jodit/build/jodit.min.css');

.jodit .jodit-workplace,
.jodit-container .jodit-workplace {
    overflow: auto;
    position: relative;
    height: 500px;
    border-style: groove;
}

.jodit-toolbar__box:not(:empty):not(:empty) {
    border-style: groove;
}
</style>
