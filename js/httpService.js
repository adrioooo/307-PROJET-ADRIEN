class HttpService {
  static searchClansByName(clanName) {
    const url = 'https://api.clashroyale.com/v1/clans';
    const query = `name=${encodeURIComponent(clanName)}&limit=12`;
    const fullUrl = `${url}?${query}`;

    const settings = {
      url: fullUrl,
      method: 'GET',
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImYzNDk3NjBiLTU4OTYtNDM4MC04Y2JjLTlhOWFmNDU0ODc0NiIsImlhdCI6MTY4NDc0MDIyMywic3ViIjoiZGV2ZWxvcGVyLzI1OWE1MjQ4LTMzNWItOGQ3Ny03MGZjLTIwODVkZjUyODlhMSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNTYuMjUuNC45MSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.vKdnsjfr3ZLj7elDp60pO5MdgYQvdiqHLhrggx4I9iwgTip8mtaVf_pdAkdFsirCXWyCZueeXqL41tJk6sBniA',
      },
    };
    /*$.ajax(settings).done(function (response) {
      console.log(response);
    });*/
    return $.ajax(settings)
      .done(response => response)
      .fail((jqXHR, textStatus, errorThrown) => {
        console.error('Erreur lors de la recherche des clans :', errorThrown);
        throw new Error('Une erreur est survenue lors de la recherche des clans.');
      });
  }

   /*
  **  $.ajaxSetup permet de définir une fois un élément sans le refaire par la suite. Ici cela se fait l'error
  */
  centraliserErreurHttp(httpErrorCallbackFn) {
    $.ajaxSetup({
      error: function (xhr, exception) {
        let msg;
        if (xhr.status === 0) {
          msg = "Pas d'accès à la ressource serveur demandée !";
        } else if (xhr.status === 404) {
          msg = "Page demandée non trouvée [404] !";
        } else if (xhr.status === 500) {
          msg = "Erreur interne sur le serveur [500] !";
        } else if (exception === "parsererror") {
          msg = "Erreur de parcours dans le JSON !";
        } else if (exception === "timeout") {
          msg = "Erreur de délai dépassé [Time out] !";
        } else if (exception === "abort") {
          msg = "Requête Ajax stoppée !";
        } else {
          msg = "Erreur inconnue : \n" + xhr.responseText;
        }
        httpErrorCallbackFn(msg);
      },
    });
  }
}



