<script src="./profesionales.js"></script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Listado Profesionales</h4>

            <div class="row mt-5">
              <div class="col-12">
                <button
                  type="button"
                  class="btn btn-success waves-effect waves-light float-end"
                  v-b-modal.crearprofesional
                  @click="modalNuevo"
                >
                  <i class="fas fa-plus-circle"></i>
                  Crear profesional
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-12">
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
                        v-b-modal.crearprofesional
                        data-toggle="modal"
                        data-target=".bs-example-crearprofesional"
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
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        v-on:click="config(data.item)"
                        v-b-modal.crearhorario
                        data-toggle="modal"
                        data-target=".bs-example-crearhorario"
                        class="px-2 text-info"
                        v-b-tooltip.hover
                        title="Agregar horario"
                      >
                        <i class="uil uil-cog font-size-18"></i>
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
        id="crearprofesional"
        size="lg"
        :title="titlemodal"
        title-class="font-18"
        hide-footer
        v-if="modal"
      >
        <form
          class="needs-validation"
          @submit.prevent="formSubmit"
          enctype="multipart/form-data"
        >
          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="mb-3">
                <label for="rut">Rut</label>
                <input
                  id="rut"
                  v-model="form.rut"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.rut.$error,
                  }"
                  @input="validarRut($event)"
                />

                <div
                  v-if="submitted && $v.form.rut.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.rut.required">El rut es requerido.</span>
                </div>

                <span class="text-danger" v-if="rutexist">Rut en uso.</span>
              </div>
            </div>
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
          </div>

          <div class="row">
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
                    >El apellidos es requerido.</span
                  >
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <div class="mb-3">
                <label for="profesion">Profesion</label>
                <input
                  id="profesion"
                  v-model="form.profesion"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.profesion.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.profesion.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.profesion.required"
                    >La profesion es requerida.</span
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
                    >El email requerido.</span
                  >
                </div>

                <span class="text-danger" v-if="emailexist"
                  >Email ya en uso.</span
                >
              </div>
            </div>
            <div class="col-12">
              <div class="mb-3">
                <label>Foto Perfil</label>

                <input
                  id="url_perfil"
                  type="file"
                  class="form-control"
                  @change="onFileChange($event)"
                />

                <!-- <vue-dropzone
                  id="dropzone"
                  ref="myVueDropzone"
                  :use-custom-slot="true"
                  :options="dropzoneOptions"
                  @vdropzone-success="uploadDropzoneFinish(event)"
                >
                  <div class="dropzone-custom-content">
                    <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                    <h4>Arrastra tu imagen o da click aquí.</h4>
                  </div>
                </vue-dropzone> -->
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

      <!-- modal -->

      <b-modal
        id="crearhorario"
        size="lg"
        title="Configuración Profesional"
        title-class="font-18"
        hide-footer
        v-if="modalhorario"
      >
        <form
          class="needs-validation"
          @submit.prevent="formSubmitSettings"
          enctype="multipart/form-data"
        >
          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="mb-3">
                <label>Horario</label>

                <div
                  v-for="(field, i) in fieldsH"
                  :key="field.id"
                  class="row mb-3"
                >
                  <div class="col-12">
                    <label for="dia">Día</label>
                    <multiselect
                      v-model="fieldsH[i].id_dia"
                      :options="optionsDias"
                      track-by="id_especialidad"
                      label="nombre"
                    ></multiselect>
                    <span
                      class="text-danger"
                      v-if="!fieldsH[i].id_dia && summitedH"
                      >Dia requerido.</span
                    >
                  </div>
                  <div class="col-12">
                    <div class="row">
                      <div class="col-6">
                        <label for="hora_inicio">Hora Inicio</label>
                        <input
                          id="hora_inicio"
                          v-model="fieldsH[i].hora_inicio"
                          type="time"
                          class="form-control"
                        />
                        <span
                          class="text-danger"
                          v-if="!fieldsH[i].hora_inicio && summitedH"
                          >Hora de inicio requerida.</span
                        >
                      </div>
                      <div class="col-6">
                        <label for="hora_fin">Hora Fin</label>
                        <input
                          id="hora_fin"
                          v-model="fieldsH[i].hora_fin"
                          type="time"
                          class="form-control"
                        />
                        <span
                          class="text-danger"
                          v-if="!fieldsH[i].hora_fin && summitedH"
                          >Hora fin requerida.</span
                        >
                      </div>
                      <div class="col-12 mt-3">
                        <div class="col-lg-2 align-self-center d-grid">
                          <input
                            type="button"
                            class="btn btn-primary btn-block"
                            value="Eliminar"
                            @click="deleteRow(i)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-success mt-3 mt-lg-0 float-end"
                  @click="AddformData"
                >
                  Agregar horario
                </button>
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <div class="mb-3">
                <label for="servicios">Servicios</label>
                <multiselect
                  v-model="formhorario.servicio_id_servicio"
                  :options="options"
                  track-by="id_servicio"
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
      <!-- modal horario y servicio -->
    </div>
  </Layout>
</template>
