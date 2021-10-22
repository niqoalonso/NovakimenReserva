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
                  <label for="servicios">Servicios</label>
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
                    track-by="id_profesional"
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
          <div class="col-12">
            <div class="mb-3">
              <label for="name" class="form-label">Event Name</label>
              <input
                id="name"
                v-model="event.title"
                type="text"
                class="form-control"
                placeholder="Insert Event name"
                :class="{ 'is-invalid': submitted && $v.event.title.$error }"
              />
              <div
                v-if="submitted && !$v.event.title.required"
                class="invalid-feedback"
              >
                This value is required.
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label class="control-label form-label">Category</label>
              <select
                v-model="event.category"
                class="form-control"
                name="category"
                :class="{ 'is-invalid': submitted && $v.event.category.errors }"
              >
                <option
                  v-for="option in categories"
                  :key="option.backgroundColor"
                  :value="`${option.value}`"
                >
                  {{ option.name }}
                </option>
              </select>
              <div
                v-if="submitted && !$v.event.category.required"
                class="invalid-feedback"
              >
                This value is required.
              </div>
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
