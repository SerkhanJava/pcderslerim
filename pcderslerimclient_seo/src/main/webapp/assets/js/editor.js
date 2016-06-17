function loadSanatorium() {
   var data = {};
    var sanatorium = {};
 
    document.getElementById("content-refresh").innerHTML = '';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var gui = getGUIforSanatorium(xhr.responseText);
            document.getElementById("content-refresh").innerHTML = gui;
        }
    }

    xhr.open("POST", "http://localhost:8080/rMsMaven/sanatorium", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}

function loadUser() {
   var data = {};
    var sanatorium = {};
 //    sanatorium["id"] = 1;
//    data["sanatorium"] = sanatorium;

    document.getElementById("content-refresh").innerHTML = '';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var gui = getGUIforUser(xhr.responseText);
            document.getElementById("content-refresh").innerHTML = gui;
        }
    }

    xhr.open("POST", "http://localhost:8080/rMsMaven/user", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}

function getGUIforActivateButton(onoff, id, onOffClick, onOnClick, onText, offText) {
    return  '<div class="switch has-switch">' +
            '<div class="' + onoff + ' switch-animate" >' +
            '<input type="checkbox"  data-toggle="switch">' +
            '<span class="switch-left"  onclick=' + onOnClick + '>' + onText + '</span>' +
            '<label>&nbsp;</label>' +
            '<span class="switch-right" onclick=' + onOffClick + '>' + offText + '</span>' +
            '</div>' +
            '</div>';
}


function getGUIforSanatorium(response) {
    var data = JSON.parse(response);
    
    var result='';
    result+= '<h4><i class="fa fa-angle-right"></i>Sanatoriums</h4>'+
            '<table class="table table-striped table-advance table-hover  table-bordered" >' +
            '<thead >' +
            '<tr>' +
                '<th>' + "Sanatoriums" + '</th>' +
                '<th>' + "Activation_date" + '</th>' +
                '<th>' + "Deactivation_date" + '</th>' +
                '<th colspan="2"></th>' +
               
            '</thead>';
   for (i = 0; i < data.length; i++) {
       var switchon = 'switch-on';
        if (!data[i].activationDate) {
            switchon = 'switch-off';
        }
        
        result += '<tr style="background-color:white" >' +
              '<td id="sanatorium_name" ><a href="http://localhost:8080/rMsMaven/sanatorium/'+data[i].id+'">' + data[i].name + '</a></td>'+
              '<td id="sanatorium_activation_date" >' + data[i].activationDate + '</td>'+
              '<td id="sanatorium_deactivation_date" >' + data[i].deactivationDate + '</td>'+
//              '<td style="width:1%" onclick="activateSanatorium('+data[i].id+')"><button>Active</button></td>'+
//              '<td style="width:1%" onclick="deactivateSanatorium('+data[i].id+')"><button>Deactive</button></td>'+
            '<td>' +
                getGUIforActivateButton(switchon, data[i].id, "activateSanatorium(" + data[i].id + ")",
                        "deactivateSanatorium(" + data[i].id + ")", "active", "not a") +
                '</td>' +
                '</tr>';
    }
    result += '</table>';
    document.getElementById("content-refresh").innerHTML = result;
    return result;

}

function getGUIforUser(response) {
    var data = JSON.parse(response);
    
    var result='';
    result+=  '<h4><i class="fa fa-angle-right"></i>Users</h4>'+
            '<table class="table table-striped table-advance table-hover  table-bordered" >' +
            '<thead>' +
            '<tr>' +
            '<th>' + "Authentication_code" + '</th>' +
            '<th >' + "Confirmed" + '</th>' +
            '<th >' + "Email" + '</th>' +
            '<th >' + "Role" + '</th>' +
            '<th >' + "Activation_date" + '</th>' +
            '<th >' + "Deactivation_date" + '</th>' +
            '<th >' + "Active" + '</th>' +
            '<th >' + "Deactive" + '</th>' +
            '</thead>';
   for (i = 0; i < data.length; i++) {
         var inputUser = '<td id="user_authentication_code">' + data[i].authenticationCode + '</td>';
         var tdConfirmed = '<td id="user_confirmed" >' + data[i].confirmed + '</td>';
         var tdEmail = '<td id="user_email" >' + data[i].email + '</td>';
         var tdRole = '<td id="user_role_name" >' + data[i].roleId.name + '</td>';
         var tdActivationDate = '<td id="user_activation_date" >' + data[i].activationDate + '</td>';
         var tdDeactivationDate = '<td id="user_deactivation_date" >' + data[i].deactivationDate + '</td>';
         
         var btnActive = '<td style="width:1%" onclick="activateUser('+data[i].id+')"><button>Active</button></td>';
         var btnDeactive = '<td style="width:1%" onclick="deactivateUser('+data[i].id+')"><button>Deactive</button></td>';
      
        result += '<tr style="background-color:white" >' +
              inputUser +tdConfirmed+tdEmail+tdRole+tdActivationDate +tdDeactivationDate+btnActive+btnDeactive+
                '</tr>';
    }
    result += '</table>';
    document.getElementById("content-refresh").innerHTML = result;
    return result;

}



function activateSanatorium(sanatorium_id) {
    var data = {};

    data["id"] = sanatorium_id;
    data['activate'] = '1';

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            loadSanatorium();
        }
    }

    xhr.open("POST", "http://localhost:8080/rMsMaven/sanatorium/activate", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.send(JSON.stringify(data));
}

function deactivateSanatorium(sanatorium_id) {
    var data = {};

    data["id"] = sanatorium_id;
    data['deactivate'] = '1';

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            loadSanatorium();
        }
    }

    xhr.open("POST", "http://localhost:8080/rMsMaven/sanatorium/activate", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.send(JSON.stringify(data));
}

function activateUser(user_id) {
    var data = {};

    data["id"] = user_id;
    data['activate'] = '1';

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            loadUser();
        }
    }

    xhr.open("POST", "http://localhost:8080/rMsMaven/user/activate", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.send(JSON.stringify(data));
}

function deactivateUser(user_id) {
    var data = {};

    data["id"] = user_id;
    data['deactivate'] = '1';

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            loadUser();
        }
    }

    xhr.open("POST", "http://localhost:8080/rMsMaven/user/activate", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.send(JSON.stringify(data));
}

