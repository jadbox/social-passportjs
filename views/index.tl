<html>
    <body style="background-color: antiquewhite;">
        <div style="width:100%; text-align: center;">
        <div style="margin: 0 auto 0 auto;">
            <h3>Please login through one of the below options:</h3>
            Discord login:<br/><a href="/discord"><img width="150px" src="https://fincongames.com/wp-content/uploads/2019/06/Discord-btn-L.png"/></a><br/><br/>
            Telegram ${d.bot} login:<br/>

            <script async src="https://telegram.org/js/telegram-widget.js?2" 
            data-telegram-login="${d.bot}"
            data-size="medium" 
            
            data-auth-url="/tlogin"
            data-request-access="write"
            ></script>
        <script type="text/javascript">
            function onTelegramAuth(user) {
                // data-onauth="onTelegramAuth(user)"
                // Logged in as Jonathan Dunlap |Σ| (732221503, @jadbox)
                alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
            }
        </script>

    <br/><br/>
    <p>Logged in status: ${d.loggedIn}</p>

    </div></div>
    <br/>
    </body>

</html>