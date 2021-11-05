<script src="./secretarias.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body row">
            <div class="col-6">
              <h5>Gestión Secretarias</h5>
            </div>
            <div class="col-6">
              <button
                  type="button"
                  class="btn btn-success btn-sm waves-effect waves-light float-end"
                  v-b-modal.crearsecretaria
                  @click="modalNuevo"
                >
                  <i class="fas fa-plus-circle"></i>
                  Crear secretaria
                </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-8">
        <div class="card">
          <div class="card-body">
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Mostrar&nbsp;
                    <b-form-select
                      v-model="perPage"
                      size="sm"
                      :options="pageOptions"
                    ></b-form-select
                    >&nbsp;entradas
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div
                  id="tickets-table_filter"
                  class="dataTables_filter text-md-end"
                >
                  <label class="d-inline-flex align-items-center">
                    Buscar:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Buscar..."
                      class="form-control form-control-sm ms-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>

            <div class="table-responsive mb-0">
              <b-table
                :items="tableData"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template v-slot:cell(action)="data">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="editar(data.item)"
                        class="px-2 text-primary"
                        v-b-modal.crearsecretaria
                        data-toggle="modal"
                        data-target=".bs-example-crearsecretaria"
                        v-b-tooltip.hover
                        title="Editar"
                      >
                        <i class="uil uil-pen font-size-18"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="eliminar(data.item)"
                        class="px-2 text-danger"
                        v-b-tooltip.hover
                        title="Eliminar"
                      >
                        <i class="uil uil-power font-size-18"></i>
                      </a>
                    </li>
                  </ul>
                </template>
              </b-table>
            </div>
            <div class="row">
              <div class="col">
                <div
                  class="dataTables_paginate paging_simple_numbers float-end"
                >
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                    ></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- modal -->

      <b-modal
        id="crearsecretaria"
        size="lg"
        :title="titlemodal"
        title-class="font-18"
        hide-footer
        v-if="modal"
      >
        <form class="needs-validation" @submit.prevent="formSubmit">
          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="mb-3">
                <label for="nombres">Nombres</label>
                <input
                  id="nombres"
                  v-model="form.nombres"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.nombres.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.nombres.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.nombres.required"
                    >El nombre es requerido.</span
                  >
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <div class="mb-3">
                <label for="apellidos">Apellidos</label>
                <input
                  id="apellidos"
                  v-model="form.apellidos"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.apellidos.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.apellidos.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.apellidos.required"
                    >El apellidos es requeridos.</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="mb-3">
                <label for="email">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.email.$error,
                  }"
                  @input="validarEmail($event)"
                />

                <div
                  v-if="submitted && $v.form.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.email.required"
                    >El email es requerido.</span
                  >
                </div>

                <span class="text-danger" v-if="emailexist"
                  >Email ya en uso.</span
                >
              </div>
            </div>

            <div class="col-12 col-lg-6">
              <div class="mb-3">
                <label>Sucursal</label>
                <multiselect
                  v-model="form.sucursal_id"
                  :options="options"
                  track-by="id_sucursal"
                  :multiple="true"
                  label="nombre"
                ></multiselect>
              </div>
            </div>
          </div>

          <button
            v-if="btnCreate === true"
            class="btn btn-primary float-end"
            type="submit"
          >
            <i class="far fa-save"></i> Crear
          </button>
          <button v-else class="btn btn-primary float-end" type="submit">
            <i class="fas fa-sync"></i> Actualizar
          </button>
        </form>
      </b-modal>

      <!-- modal -->
    </div>
  </Layout>
</template>
