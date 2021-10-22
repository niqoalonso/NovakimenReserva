<script>
import Layout from "../../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import DonutChart from "./DonutChart";
import PolarChart from "./PolarChart";
import RadarChart from "./RadarChart";

/**
 * Chartjs-chart component
 */
export default {
  page: {
    title: "Chartjs Charts",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    BarChart,
    LineChart,
    PieChart,
    DonutChart,
    PolarChart,
    RadarChart,
    Layout,
    PageHeader,
  },
  data() {
    return {
      title: "Chartjs Chart",
      items: [
        {
          text: "Charts",
          href: "/",
        },
        {
          text: "Chartjs Chart",
          active: true,
        },
      ],
    };
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">Line Chart</h4>
            <!-- Line Chart -->
            <LineChart :height="300" />
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">Bar Chart</h4>
            <!-- Bar Chart -->
            <BarChart :height="300" />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">Pie Chart</h4>
            <!-- Pie Chart -->
            <PieChart :height="140" />
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">Donut Chart</h4>
            <!-- Donut Chart -->
            <DonutChart :height="140" />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">Polar area Chart</h4>
            <!-- Polar area Chart -->
            <PolarChart :height="160" />
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">Radar Chart</h4>
            <!-- Radar Chart -->
            <RadarChart :height="160" />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
