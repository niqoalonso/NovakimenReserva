import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import Swal from "sweetalert2";
import { required } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";

export default {
  components: { Layout, PageHeader, Multiselect },

  page: {
    title: "Servicios",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },

  data() {
    return {
      urlbackend: this.$urlBackend,
      form: {
        nombre: "",
        id_servicio: "",
        intervalo: "",
        precio_particular: "",
        precio_fonasa: "",
        precio_isapre: "",
        especialidad_id: "",
      },
      submitted: false,
      typeform: "create",
      titlemodal: "Crear Servicio",
      modal: false,
      servicioexist: false,
      btnCreate: true,
      options: [],
      // tabla

      tableData: [],

      title: "Servicios",
      items: [
        {
          text: "Tables",
        },
        {
          text: "Servicios",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "nombre",
      sortDesc: false,
      fields: [
        {
          key: "nombre",
          sortable: true,
        },
        {
          key: "intervalo",
          sortable: true,
        },
        {
          key: "precio_particular",
          sortable: true,
        },
        {
          key: "precio_fonasa",
          sortable: true,
        },
        {
            key: "especialidad.nombre",
            label: 'Especialidad',
            sortable: true,
          },
        "action",
      ],
    };
  },
  validations: {
    form: {
      nombre: {
        required,
      },
      intervalo: {
        required,
      },
      precio_particular: {
        required,
      },
      especialidad_id: {
        required,
      },
    },
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.tableData.length;
    },
  },
  mounted() {
    this.totalRows = this.items.length;
    this.traerEspecialidad();
    this.traerServicio();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    traerEspecialidad() {
      this.axios
        .get(`${this.urlbackend}/especialidades/obtenerespecialidad/`)
        .then((response) => {
          this.options = response.data;
        });
    },

    traerServicio() {
      this.axios
        .get(`${this.urlbackend}/especialidades/obtenerservicios/`)
        .then((response) => {
          console.log(response);
          this.tableData = response.data;
        });
    },

    eliminar(data) {
      console.log(data);

      if (data.deleted_at == null) {
        var estado = 2;
        var title = "Desactivar Servicio";
        var text = `¿Esta seguro de desativar servicio ${data.nombre}?`;
      } else {
        estado = 1;
        title = "Activar Servicio";
        text = `¿Esta seguro de activar servicio ${data.nombre}?`;
      }

      Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Si",
      }).then((result) => {
        if (result.value) {
          this.axios
            .delete(
              `${this.urlbackend}/especialidades/eliminarservicio/${data.id_servicio}`
            )
            .then((res) => {
              console.log(res);
              if (res.data) {
                var message = "Servicio ha sido desactivada";
                var type = "success";
              } else {
                if (estado == 1) {
                  message = "Error al activar Servicio";
                } else {
                  message = "Error al desactivar Servicio";
                }
                type = "error";
              }

              this.successmsg(title, message, type);

              this.traerEspecialidad();
              this.traerServicio();
            });
        }
      });
    },

    editar(data) {
        console.log(data)
      this.form.nombre = data.nombre;
      this.form.id_servicio = data.id_servicio;
      this.form.intervalo = data.intervalo;
      this.form.precio_fonasa = data.precio_fonasa;
      this.form.precio_isapre = data.precio_isapre;
      this.form.precio_particular = data.precio_particular;
      this.form.especialidad_id = data.especialidad;
      this.modal = true;
      this.btnCreate = false;
    },

    formSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (!this.$v.$invalid && !this.servicioexist) {
        this.axios
          .post(`${this.urlbackend}/especialidades/crearservicio`, this.form)
          .then((res) => {
            let title = "";
            let message = "";
            let type = "";
            if (res.data) {
              if (this.form.id_servicio == "") {
                title = "Crear servicio";
                message = "servicio creada con exito";
                type = "success";
              } else {
                title = "Editar servicio";
                message = "servicio editada con exito";
                type = "success";
              }
              this.modal = false;
              this.servicioexist = false;
              this.btnCreate = false;

              this.$v.form.$reset();
              this.traerEspecialidad();
              this.traerServicio();
              this.successmsg(title, message, type);
            }
          })
          .catch((error) => {
            console.log("error", error);

            let title = "";
            let message = "";
            let type = "";

            if (this.form.id_servicio) {
              title = "Crear Servicio";
              message = "Servicio  creada con exito";
              type = "error";
            } else {
              title = "Editar Servicio";
              message = "Servicio editada con exito";
              type = "error";
            }

            this.modal = false;
            this.btnCreate = false;
            this.$v.form.$reset();

            this.successmsg(title, message, type);
          });
      }
    },

    modalNuevo() {
      this.modal = true;
      this.titlemodal = "Crear Servicio";
      (this.typeform = "create"),
        (this.form = {
          nombre: "",
          id_servicio: "",
          intervalo: "",
          precio_particular: "",
          precio_fonasa: "",
          precio_isapre: "",
          especialidad_id: "",
        });
      this.btnCreate = true;
    },

    validarNombre($event) {
      if ($event.target.value.length > 4) {
        this.axios
          .get(
            `${this.urlbackend}/especialidades/validarnombreservicio/${$event.target.value}`
          )
          .then((response) => {
            if (response.data == 1) {
              this.servicioexist = true;
            } else {
              this.servicioexist = false;
            }
          });
      }
    },

    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },
  },
};
