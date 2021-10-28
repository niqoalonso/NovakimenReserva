<script src="./reservas.js"></script>

<template>
  <Layout>
    <!-- opciones del calendario -->

    <div class="row">
      <div class="col-12 col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label for="especialidad">Especialidad</label>
                  <multiselect
                    v-model="form.especialidad_id"
                    :options="options"
                    track-by="id_especialidad"
                    label="nombre"
                    @input="traerServicio()"
                  ></multiselect>
                </div>
              </div>
              <div class="col-12" v-if="form.especialidad_id">
                <div class="mb-3">
                  <label for="servicios">Servicios</label>
                  <multiselect
                    v-model="form.servicio_id_servicio"
                    :options="optionsServicio"
                    track-by="id_servicio"
                    label="nombre"
                    @input="traerProfesional()"
                  ></multiselect>
                </div>
              </div>
              <div class="col-12" v-if="form.servicio_id_servicio" >
                <div class="mb-3">
                  <label for="profesional">Profesional</label>
                  <multiselect
                    v-model="form.id_profesional"
                    :options="optionsProfesional"
                    :custom-label="customLabel"
                    @input="traerHoras()"
                  ></multiselect>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <div class="card">
          <div class="card-body">
            <div class="app-calendar">
              <FullCalendar
                ref="fullCalendar"
                :options="calendarOptions"
              ></FullCalendar>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- opciones del calendario -->

    <!-- modal crear evento -->

    <b-modal
      v-model="showModal"
      title="Add New Event"
      title-class="text-black font-18"
      body-class="p-3"
      hide-footer
    >
      <form @submit.prevent="handleSubmit">
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
                  <span v-if="!$v.form.rut.required"
                    >El rut es requerido.</span
                  >
                </div>

                <span class="text-danger" v-if="rutexist"
                  >Rut en uso.</span
                >
              </div>
            </div>
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
                />

                <div
                  v-if="submitted && $v.form.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.email.required"
                    >El Email es requerido.</span
                  >
                </div>
              </div>
            </div>
          </div>
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
                    >El Apellidos es requerido.</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="mb-3">
                <label for="celular">Celular</label>
                <input
                  id="celular"
                  v-model="form.celular"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.celular.$error,
                  }"
                />

                <div
                  v-if="submitted && $v.form.celular.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.celular.required"
                    >El Celular es requerido.</span
                  >
                </div>
                
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <div class="mb-3">
                <label for="direccion">Dirección</label>
                <input
                  id="direccion"
                  v-model="form.direccion"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.form.direccion.$error,
                  }"
                  
                />
                <div
                  v-if="submitted && $v.form.direccion.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.form.direccion.required"
                    >El dirección es requerido.</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            
            <div class="col-12 col-lg-6">
              <div class="mb-3">
                  <label>Previsión</label>
              <multiselect
                v-model="form.prevension_id"
                :options="optionsPrevension"
                track-by="id_prevension"
                label="nombre"
              ></multiselect>
              </div>
            </div>
          </div>

        <div class="text-end pt-5 mt-3">
          <b-button variant="light" @click="hideModal">Close</b-button>
          <b-button type="submit" variant="success" class="ms-1"
            >Create event</b-button
          >
        </div>
      </form>
    </b-modal>

    <!-- modal crear evento -->

    <!-- Edit Modal -->
    <b-modal
      v-model="eventModal"
      title="Edit Event"
      title-class="text-black font-18"
      hide-footer
      body-class="p-3"
    >
      <div slot="modal-title">Edit Event</div>
      <form @submit.prevent="editSubmit">
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label for="name" class="form-label">Event Name</label>
              <input
                id="name"
                v-model="editevent.editTitle"
                type="text"
                class="form-control"
                placeholder="Insert Event name"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label class="control-label form-label">Category</label>
              <select
                v-model="editevent.editcategory"
                class="form-control"
                name="category"
              >
                <option
                  v-for="option in categories"
                  :key="option.backgroundColor"
                  :value="`${option.value}`"
                >
                  {{ option.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="text-end p-3">
          <b-button variant="light" @click="closeModal">Close</b-button>
          <b-button class="ms-1" variant="danger" @click="confirm"
            >Delete</b-button
          >
          <b-button class="ms-1" variant="success" @click="editSubmit"
            >Save</b-button
          >
        </div>
      </form>
    </b-modal>

    <!-- Edit Modal -->
  </Layout>
</template>
