import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import Swal from "sweetalert2";
import { required } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";

export default {
  components: { Layout, PageHeader, Multiselect },

  page: {
    title: "Secretaria",
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
        email: "",
        id_secretaria: "",
        password: "",
        id_user: "",
        sucursal_id: "",
      },
      submitted: false,
      typeform: "create",
      titlemodal: "Crear Secretaria",
      modal: false,
      emailexist: false,
      btnCreate: true,
      options: [],
      // tabla

      tableData: [],

      title: "Sucursal",
      items: [
        {
          text: "Tables",
        },
        {
          text: "Sucursal",
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
          key: "user.email",
          label: "email",
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
      apellidos: {
        required,
      },
      email: {
        required,
      },
      sucursal_id: {
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
    this.traerSecretarias();
    this.traerSurcusal();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    traerSecretarias() {
      this.axios
        .get(`${this.urlbackend}/secretarias/obtenersecretaria/`)
        .then((response) => {
          console.log(response);
          this.tableData = response.data;
        });
    },

    traerSurcusal() {
      this.axios
        .get(`${this.urlbackend}/sucursales/obtenersucursal/`)
        .then((response) => {
          this.options = response.data;
        });
    },

    eliminar(data) {
      console.log(data);

      if (data.deleted_at == null) {
        var estado = 2;
        var title = "Desactivar Secretaria";
        var text = `¿Esta seguro de desativar secretarias ${data.nombres} ${data.apellidos}?`;
      } else {
        estado = 1;
        title = "Activar Secretaria";
        text = `¿Esta seguro de activar secretarias ${data.nombres} ${data.apellidos}?`;
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
              `${this.urlbackend}/secretarias/eliminarsecretaria/${data.id_secretaria}`
            )
            .then((res) => {
              console.log(res);
              if (res.data) {
                var message = "Secretarias ha sido desactivada";
                var type = "success";
              } else {
                if (estado == 1) {
                  message = "Error al activar secretaria";
                } else {
                  message = "Error al desactivar secretaria";
                }
                type = "error";
              }

              this.successmsg(title, message, type);

              this.traerSecretarias();
              this.traerSurcusal();
            });
        }
      });
    },

    editar(data) {
      this.form.nombres = data.nombres;
      this.form.apellidos = data.apellidos;
      this.form.id_sucursal = data.id_sucursal;
      this.form.id_secretaria = data.id_secretaria;
      this.form.email = data.user.email;
      this.form.id_user = data.user.id;
      this.form.password = data.user.password;
      this.form.sucursal_id = data.secretariasucursal;
      this.modal = true;
      this.btnCreate = false;
    },

    formSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (!this.$v.$invalid && !this.emailexist) {
        this.axios
          .post(`${this.urlbackend}/secretarias/crearsecretaria`, this.form)
          .then((res) => {
            let title = "";
            let message = "";
            let type = "";
            if (res.data) {
              if (this.form.id_secretaria == "") {
                title = "Crear secretaria";
                message = "secretaria creada con exito";
                type = "success";
              } else {
                title = "Editar secretaria";
                message = "secretaria editada con exito";
                type = "success";
              }
              this.modal = false;
              this.emailexist = false;
              this.btnCreate = false;

              this.$v.form.$reset();
              this.traerSurcusal();
              this.traerSecretarias();
              this.successmsg(title, message, type);
            }
          })
          .catch((error) => {
            console.log("error", error);

            let title = "";
            let message = "";
            let type = "";

            if (this.form.id_secretaria) {
              title = "Crear secretaria";
              message = "Secretaria  creada con exito";
              type = "error";
            } else {
              title = "Editar Secretaria";
              message = "Secretaria editada con exito";
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
      this.titlemodal = "Crear Secretaria";
      (this.typeform = "create"),
        (this.form = {
          nombres: "",
          apellidos: "",
          email: "",
          id_secretaria: "",
          password: "",
          id_user: "",
          sucursal_id: "",
        });
      this.btnCreate = true;
    },

    validarEmail($event) {
      if ($event.target.value.length > 4) {
        this.axios
          .get(
            `${this.urlbackend}/secretarias/validaremail/${$event.target.value}`
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
