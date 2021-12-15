var myModal = new bootstrap.Modal(document.getElementById("myModal"));
var frm = document.getElementById("formulario");
var eliminar = document.getElementById("btnEliminar");

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "es",
    headerToolbar: {
      left: "prev next today",
      center: "title",
      right: "dayGridMonth timeGridWeek listWeek",
    },
    editable: true,
    events: base_url + "Home/listar",
    dateClick: function (info) {
      // console.log(info);
      frm.reset();
      document.getElementById("id").value = "";
      eliminar.classList.add("d-none");
      document.getElementById("start").value = info.dateStr;
      document.getElementById("btnAccion").textContent = "Guardar";
      document.getElementById("titulo").textContent = "Registro de envento";
      myModal.show();
    },
    eventClick: function (info) {
      console.log(info);
      document.getElementById("titulo").textContent = "Modificar evento";
      document.getElementById("btnAccion").textContent = "Modificar";
      eliminar.classList.remove("d-none");
      document.getElementById("id").value = info.event.id;
      document.getElementById("title").value = info.event.title;
      document.getElementById("start").value = info.event.startStr;
      document.getElementById("color").value = info.event.backgroundColor;
      myModal.show();
    },
    eventDrop: function (info) {
      var id = info.event.id;
      var fecha = info.event.startStr;
      var url = base_url + "Home/drop";
      var http = new XMLHttpRequest();
      var data = new FormData();
      data.append('id', id);
      data.append('fecha', fecha);
      http.open("POST", url, true);
      http.send(data);
      // console.log(form);
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var resp = JSON.parse(this.responseText);
          console.log(resp);
          if (resp.estado) {
            calendar.refetchEvents();
            Swal.fire("Aviso", resp.msg, resp.tipo);
          }
        }
      };
    },
  });
  calendar.render();
  frm.addEventListener("submit", function (e) {
    e.preventDefault();
    var title = document.getElementById("title").value;
    var fecha = document.getElementById("start").value;
    var color = document.getElementById("color").value;
    if (title === "" || fecha == "" || color == "") {
      Swal.fire("Aviso", "Todos los campos son requeridos", "warning");
    } else {
      var url = base_url + "Home/registrar";
      var http = new XMLHttpRequest();
      http.open("POST", url, true);
      http.send(new FormData(frm));
      // console.log(form);
      http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // console.log(this.resposeText);
          var resp = JSON.parse(this.responseText);
          console.log(resp);
          if (resp.estado) {
            calendar.refetchEvents();
            Swal.fire("Aviso", resp.msg, resp.tipo);
          } else {
          }
          myModal.hide();
        }
      };
    }
  });
  eliminar.addEventListener("click", function () {
    myModal.hide();
    Swal.fire({
      title: "Adevertencia!!",
      text: "Estás por eliminar el evento!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminalo!",
      cancelButtonText: "Cancelar",
    }).then(function (result) {
      if (result.isConfirmed) {
        var id = document.getElementById("id").value;
        var url = base_url + "Home/eliminar/" + id;
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.send();
        // console.log(form);
        http.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.responseText);
            console.log(resp);
            if (resp.estado) {
              calendar.refetchEvents();
              Swal.fire("Aviso", resp.msg, resp.tipo);
            }
          }
        };
      }
    });
  });
});
