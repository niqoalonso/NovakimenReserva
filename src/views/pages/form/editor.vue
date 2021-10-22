<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Editor component
 */
export default {
  components: {
    ckeditor: CKEditor.component,
    Layout,
    PageHeader,
  },
  page: {
    title: "Form Editor",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Form Editor",
      items: [
        {
          text: "Forms",
          href: "/",
        },
        {
          text: "Form Editor",
          active: true,
        },
      ],
      editor: ClassicEditor,
      editorData:
        "<h3>Hello World!</h3><h5><b>This is an simple editable area.</b></h5>",
    };
  },
  middleware: "authentication",
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">CK Editor</h4>
            <p class="card-title-desc">
              Super simple wysiwyg editor on Bootstrap
            </p>
            <!-- Editor -->
            <ckeditor v-model="editorData" :editor="editor"></ckeditor>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
