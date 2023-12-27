document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        height: 'auto',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'listMonth,listYear'
        },
        views: {
            listMonth: { buttonText: 'list month' },
            listYear: { buttonText: 'list year' }
        },
        initialView: 'listYear',
        initialDate: '2023-01-12',
        navLinks: true,
        editable: true,
        eventClick: function(info) {
            // Aqui você pode lidar com o evento clicado
            console.log('Evento clicado:', info.event);
        },
        events: function(fetchInfo, successCallback, failureCallback) {
            // Aqui, você pode fazer uma requisição AJAX para buscar os eventos atuais
            $.ajax({
                url: 'seus_eventos.php',
                type: 'GET',
                dataType: 'json',
                success: function(response) {
                    // Filtrar os eventos atuais com base na data atual
                    var eventosAtuais = response.filter(function(evento) {
                        // Supondo que seus eventos tenham campos 'start' e 'end'
                        return (evento.start >= fetchInfo.start && evento.end <= fetchInfo.end);
                    });
                    successCallback(eventosAtuais);
                },
                error: function() {
                    failureCallback();
                }
            });
        }
    });

    calendar.render();
});