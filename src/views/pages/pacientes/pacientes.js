import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import Swal from "sweetalert2";
import { required } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";

export default {
  components: { Layout, PageHeader, Multiselect },

  page: {
    title: "Pacientes",
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
        nombres: "",
        apellidos: "",
        id_paciente: "",
        email: "",
        celular: "",
        direccion: "",
        rut: "",
        prevension_id:"",
      },
      submitted: false,
      typeform: "create",
      titlemodal: "Crear Paciente",
      modal: false,
      emailexist: false,
      rutexist: false,
      btnCreate: true,
      options: [],
      // tabla

      tableData: [],

      title: "Pacientes",
      items: [
        {
          text: "Tables",
        },
        {
          text: "Pacientes",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "nombres",
      sortDesc: false,
      fields: [
        {
          key: "nombres",
          sortable: true,
        },
        {
          key: "apellidos",
          sortable: true,
        },
        {
          key: "celular",
          sortable: true,
        },
        {
          key: "email",
          sortable: true,
        },
        {
            key: "prevision.nombre",
            label: 'previsión',
            sortable: true,
          },
        "action",
      ],
    };
  },
  validations: {
    form: {
      nombres: {
        required,
      },
      rut: {
        required,
      },
      apellidos: {
        required,
      },
      email: {
        required,
      },
      celular: {
        required,
      },
      direccion: {
        required,
      },
      prevension_id: {
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
    this.traerPrevision();
    this.traerPaciente();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    traerPrevision() {
        this.axios
          .get(`${this.urlbackend}/previsiones/obtenerprevision/`)
          .then((response) => {
            this.options = response.data;
          });
      },

    traerPaciente() {
      this.axios
        .get(`${this.urlbackend}/pacientes/obtenerpaciente/`)
        .then((response) => {
          console.log(response);
          this.tableData = response.data;
        });
    },

    eliminar(data) {
      console.log(data);

      if (data.deleted_at == null) {
        var estado = 2;
        var title = "Desactivar Paciente";
        var text = `¿Esta seguro de desativar paciente ${data.nombres} ${data.apellidos}?`;
      } else {
        estado = 1;
        title = "Activar paciente";
        text = `¿Esta seguro de activar paciente ${data.nombres} ${data.apellidos}?`;
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
              `${this.urlbackend}/pacientes/eliminarpaciente/${data.id_paciente}`
            )
            .then((res) => {
              console.log(res);
              if (res.data) {
                var message = "Paciente ha sido desactivada";
                var type = "success";
              } else {
                if (estado == 1) {
                  message = "Error al activar Paciente";
                } else {
                  message = "Error al desactivar Paciente";
                }
                type = "error";
              }

              this.successmsg(title, message, type);

              this.traerPrevision();
              this.traerPaciente();
            });
        }
      });
    },

    editar(data) {
        console.log(data)
      this.form.nombres = data.nombres;
      this.form.apellidos = data.apellidos;
      this.form.id_paciente = data.id_paciente;
      this.form.rut = data.rut;
      this.form.email = data.email;
      this.form.celular = data.celular;
      this.form.direccion = data.direccion;
      this.form.prevension_id = data.prevision;
      this.modal = true;
      this.btnCreate = false;
    },

    formSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (!this.$v.$invalid && !this.emailexist && !this.rutexist) {
        this.axios
          .post(`${this.urlbackend}/pacientes/crearpaciente`, this.form)
          .then((res) => {
            let title = "";
            let message = "";
            let type = "";
            if (res.data) {
              if (this.form.id_paciente == "") {
                title = "Crear pacientes";
                message = "pacientes creada con exito";
                type = "success";
              } else {
                title = "Editar pacientes";
                message = "pacientes editada con exito";
                type = "success";
              }
              this.modal = false;
              this.emailexist = false;
              this.rutxist = false;
              this.btnCreate = false;

              this.$v.form.$reset();
              this.traerPrevision();
              this.traerPaciente();
              this.successmsg(title, message, type);
            }
          })
          .catch((error) => {
            console.log("error", error);

            let title = "";
            let message = "";
            let type = "";

            if (this.form.id_paciente) {
              title = "Crear Paciente";
              message = "Paciente  creada con exito";
              type = "error";
            } else {
              title = "Editar Paciente";
              message = "Paciente editada con exito";
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
      this.titlemodal = "Crear Paciente";
      (this.typeform = "create"),
        (this.form = {
            nombres: "",
            apellidos: "",
            id_paciente: "",
            email: "",
            celular: "",
            direccion: "",
            rut: "",
            prevension_id: "",
        });
      this.btnCreate = true;
    },

    validarRut($event) {
      if ($event.target.value.length > 4) {
        this.axios
          .get(
            `${this.urlbackend}/pacientes/validarrut/${$event.target.value}`
          )
          .then((response) => {
            if (response.data != 0) {
              this.rutexist = true;
            } else {
              this.rutexist = false;
            }
          });
      }
    },

    validarEmail($event) {
        if ($event.target.value.length > 4) {
          this.axios
            .get(
              `${this.urlbackend}/pacientes/validaremail/${$event.target.value}`
            )
            .then((response) => {
              if (response.data == 1) {
                this.emailexist = true;
              } else {
                this.emailexist = false;
              }
            });
        }
      },

    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },
  },
};
