import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import listPlugin from "@fullcalendar/list";
import Multiselect from "vue-multiselect";


import { required } from "vuelidate/lib/validators";
import Swal from "sweetalert2";

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import { calendarEvents, categories } from "./data-calendar";

/**
 * Calendar component
 */
export default {
  page: {
    title: "Reserva",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { FullCalendar, Layout, PageHeader, Multiselect },
  data() {
    return {
      title: "Reserva",
      items: [
        {
          text: "Minible",
        },
        {
          text: "Reserva",
          active: true,
        },
      ],
       calendarEvents: calendarEvents,
      calendarOptions: {
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          bootstrapPlugin,
          listPlugin,
        ],
        initialView: "timeGridDay",
        slotDuration: '00:15:00',
        slotMinTime: '12:00:00',
        slotMaxTime: '19:00:00',
        slotLabelInterval: '00:15:00',
        themeSystem: "bootstrap",
        disableResizing:true,
        initialEvents: calendarEvents,
        editable: false,
        droppable: false,
        eventResizableFromStart: false,
        dateClick: false,
        eventClick: this.editEvent,
        eventsSet: this.handleEvents,
        weekends: true,
        selectable: true,
        selectMirror: false,
        dayMaxEvents: true,
      },
      urlbackend: this.$urlBackend,
      form:{

        id_reserva: '',
        especialidad_id: '',
        servicio_id_servicio: '',
        id_profesional:''

      },
      options: [],
      optionsServicio: [],
      optionsProfesional: [],
      currentEvents: [],
      showModal: false,
      eventModal: false,
      categories: categories,
      submitted: false,
      submit: false,
      newEventData: {},
      edit: {},
      deleteId: {},
      event: {
        title: "",
        category: "",
      },
      editevent: {
        editTitle: "",
        editcategory: "",
      },
    };
  },
  validations: {
    event: {
      title: { required },
      category: { required },
    },
  },
  mounted() {
      this.traerEspecialidad()
  },
    methods: {
        // label optionsProfesional
        customLabel({ profesional }) {
            return `${profesional.nombres} ${profesional.apellidos} `;
          },
    /**
     * Modal form submit
     */
    // eslint-disable-next-line no-unused-vars
    handleSubmit(e) {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        const title = this.event.title;
        const category = this.event.category;
        let calendarApi = this.newEventData.view.calendar;

        this.currentEvents = calendarApi.addEvent({
          id: this.newEventData.length + 1,
          title,
          start: this.newEventData.date,
          end: this.newEventData.date,
          classNames: [category],
        });
        this.successmsg();
        this.showModal = false;
        this.newEventData = {};
      }
      this.submitted = false;
      this.event = {};
    },
    // eslint-disable-next-line no-unused-vars
    hideModal(e) {
      this.submitted = false;
      this.showModal = false;
      this.event = {};
    },
    /**
     * Edit event modal submit
     */
    // eslint-disable-next-line no-unused-vars
    editSubmit(e) {
      this.submit = true;
      const editTitle = this.editevent.editTitle;
      const editcategory = this.editevent.editcategory;

      this.edit.setProp("title", editTitle);
      this.edit.setProp("classNames", editcategory);
      this.successmsg();
      this.eventModal = false;
    },

    /**
     * Delete event
     */
    deleteEvent() {
      this.edit.remove();
      this.eventModal = false;
    },
    /**
     * Modal open for add event
     */
    dateClicked(info) {
      this.newEventData = info;
      this.showModal = true;
    },
    /**
     * Modal open for edit event
     */
    editEvent(info) {
      this.edit = info.event;
      this.editevent.editTitle = this.edit.title;
      this.editevent.editcategory = this.edit.classNames[0];
      this.eventModal = true;
    },

    closeModal() {
      this.eventModal = false;
    },

    confirm() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.deleteEvent();
          Swal.fire("Deleted!", "Event has been deleted.", "success");
        }
      });
    },

    /**
     * Show list of events
     */
    handleEvents(events) {
      this.currentEvents = events;
    },

    /**
     * Show successfull Save Dialog
     */
    successmsg() {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Event has been saved",
        showConfirmButton: false,
        timer: 1000,
      });
    },
    // traer especialidad
    traerEspecialidad() {

        
        this.axios
          .get(`${this.urlbackend}/especialidades/obtenerespecialidad/`)
          .then((response) => {
            this.options = response.data;
          });
      },
  
    // traer servicios
    traerServicio() {
        var id_especialidad = this.form.especialidad_id.id_especialidad
        this.axios
          .get(`${this.urlbackend}/especialidades/obtenerservicios/${id_especialidad}`)
          .then((response) => {
            this.optionsServicio = response.data;
          });
      },

      traerProfesional(){
          var id_servicio = this.form.servicio_id_servicio.id_servicio

        this.axios
        .get(`${this.urlbackend}/profesionales/obtenerprofesional/${id_servicio}`)
        .then((response) => {
          console.log(response);
          this.optionsProfesional= response.data;
        });


      },

      traerHoras(){

       

        var date = new Date();

        
        console.log(date )
        // obtemos el dia de la semana 

        var diasemana = date.getDay();

        var form = {
            diasemana : diasemana,
            id_profesional : this.form.id_profesional.profesional.id_profesional
        }

        console.log(form)

        this.axios
        .post(`${this.urlbackend}/profesionales/traerhorario`, form)
        .then((res) => {

            if (res.data) {
                this.calendarOptions.slotMinTime = res.data.hora_inicio;
                this.calendarOptions.slotMaxTime = res.data.hora_fin;
                this.calendarOptions.dateClick = this.dateClicked;
              }else{
    
                this.calendarOptions.slotMinTime = '00:00:00';
                this.calendarOptions.slotMaxTime = '00:00:00';
                this.calendarOptions.dateClick = false;
    
              }
        }).catch((error) => {
            console.log("error", error);
        })


      }

    
  },
};