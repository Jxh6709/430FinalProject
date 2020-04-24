const redirect = (response) => {
    window.location = response.redirect;
};

export const sendAjax = (type, action, data, success) => {
  console.log (`${type} ${action} ${data} `);
    $.ajax({
      cache: false,
      type: type,
      url: action,
      data: data,
      dataType: "json",
      success: success,
      error: (xhr, status, error) => {
        try {
          const messageObj = JSON.parse(xhr.responseText);
          booToast(messageObj.error);
        }
        catch (e) {
            //pass
        }
      }
    });        
}