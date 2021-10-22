<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Starter page
 */
export default {
  components: { Layout, PageHeader },
  page: {
    title: "Starter Page",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Starter Page",
      items: [
        {
          text: "Utility",
          href: "/",
        },
        {
          text: "Starter Page",
          active: true,
        },
      ],
    };
  },
  middleware: "authentication",
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
  </Layout>
</template>
