<!DOCTYPE html>
<html>

<head>
    <title>Reservation Page</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>
    <div id="content"></div>
    <script>
        $(document).ready(function() {
            $.ajax({
                url: "https://33e6-103-17-244-55.ngrok-free.app/server/data.json", // Ganti dengan URL JSON yang bisa diakses
                dataType: "json",
                success: function(data) {
                    var content = '<ul>';
                    data.roomTypes.forEach(function(roomTypes) {
                        content += '<li>' + roomTypes + '</li>';
                    });
                    content += '</ul>';

                    content += '<ul>';
                    data.rates.forEach(function(rates) {
                        content += '<li>' + rates + '</li>';
                    });
                    content += '</ul>';

                    $('#content').html(content);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log("Error: " + textStatus + " - " + errorThrown);
                }
            });
        });
    </script>
</body>

</html>