import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import Swal from "sweetalert2";
import { required } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";

export default {
  components: { Layout, PageHeader, Multiselect },

  page: {
    title: "Horas Bloqueadas",
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
        id_bloqueohora: "",
        dia: "",
        hora_inicio: "",
        hora_fin: "",
        profesional_id_profesional:""
        
      },
      submitted: false,
      typeform: "create",
      titlemodal: "Bloquear Hora",
      modal: false,
      horaexist: false,
      btnCreate: true,
      options: [],
      // tabla

      tableData: [],

      title: "Bloqueo Horas",
      items: [
        {
          text: "Tables",
        },
        {
          text: "Bloqueo Horas",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "dia",
      sortDesc: false,
      fields: [
        {
          key: "dia",
          sortable: true,
        },
        {
          key: "hora_inicio",
          sortable: true,
        },
        {
          key: "hora_fin",
          sortable: true,
        },
        "action",
      ],
    };
  },
  validations: {
    form: {
      dia: {
        required,
      },
      hora_inicio: {
        required,
      },
      hora_fin: {
        required,
      },
      profesional_id_profesional: {
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
    this.traerBloqueo();
    this.traerProfesional();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    customLabel({ nombres, apellidos }) {
      return `${nombres} ${apellidos} `;
    },

    traerProfesional() {
      this.axios
        .get(`${this.urlbackend}/profesionales/obtenerprofesional/`)
        .then((response) => {
          console.log(response);
          this.options = response.data;
        });
    },

    traerBloqueo() {
      this.axios
        .get(`${this.urlbackend}/bloqueohora/obtenerbloqueohora/`)
        .then((response) => {
          console.log(response);
          this.tableData = response.data;
        });
    },

    eliminar(data) {
      console.log(data);

      if (data.deleted_at == null) {
        var estado = 2;
        var title = "Desactivar Hora";
        var text = `¿Esta seguro de desativar Hora ${data.nombre}?`;
      } else {
        estado = 1;
        title = "Activar Hora";
        text = `¿Esta seguro de activar Hora ${data.nombre}?`;
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
              `${this.urlbackend}/bloqueohora/eliminarbloqueohora/${data.id_bloqueohora}`
            )
            .then((res) => {
              console.log(res);
              if (res.data) {
                var message = "Hora ha sido desactivada";
                var type = "success";
              } else {
                if (estado == 1) {
                  message = "Error al activar Hora";
                } else {
                  message = "Error al desactivar Hora";
                }
                type = "error";
              }

              this.successmsg(title, message, type);

              this.traerBloqueo();
            });
        }
      });
    },

    editar(data) {
      console.log(data);

      this.form.id_bloqueohora = data.id_bloqueohora;
      this.form.hora_inicio = data.hora_inicio;
      this.form.hora_fin = data.hora_fin;
      this.form.dia = data.dia;
      this.form.profesional_id_profesional = data.profesional
      this.modal = true;
      this.btnCreate = false;
    },

    formSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (!this.$v.$invalid && !this.horaexist) {
        this.axios
          .post(`${this.urlbackend}/bloqueohora/crearbloqueohora`, this.form)
          .then((res) => {
            let title = "";
            let message = "";
            let type = "";
            if (res.data) {
              if (this.form.id_bloqueohora == "") {
                title = "Crear hora";
                message = "hora creada con exito";
                type = "success";
              } else {
                title = "Editar hora";
                message = "hora editada con exito";
                type = "success";
              }
              this.modal = false;
              this.horaexist = false;
              this.btnCreate = false;

              this.$v.form.$reset();
              this.traerBloqueo();
              this.successmsg(title, message, type);
            }
          })
          .catch((error) => {
            console.log("error", error);

            let title = "";
            let message = "";
            let type = "";

            if (this.form.id_bloqueohora) {
              title = "Crear Hora";
              message = "Hora  creada con exito";
              type = "error";
            } else {
              title = "Editar Hora";
              message = "Hora editada con exito";
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
      this.titlemodal = "Crear Hora";
      (this.typeform = "create"),
        (this.form = {
            id_bloqueohora: "",
            dia: "",
            hora_inicio: "",
            hora_fin: "",
            profesional_id_profesional:""
        });
      this.btnCreate = true;
    },

    validarDia($event) {
      if ($event.target.value.length > 4) {
        this.axios
          .get(
            `${this.urlbackend}/bloqueohora/validardia/${$event.target.value}`
          )
          .then((response) => {
            if (response.data == 1) {
              this.horaexist = true;
            } else {
              this.horaexist = false;
            }
          });
      }
    },

    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },
  },
};
