loadSeasonsMenu(1);

loadPacketsMenu(1);

var selectedSanatoriumId = 1;

var models;
var direct = 1;
var users = [];

var selectedTravelCategoryId;
var selectedRoomTypeId;
var selectedRoomId;
var selectedSanatoriumRoomRelId;

//update methods
function updateSanatorium() {
    var data = {};
    data["name"] = document.getElementById("sanatorium_name").value;
    data["about"] = document.getElementById("sanatorium_about").value;
    data["phoneNumber"] = document.getElementById("sanatorium_phone_number").value;
    data["id"] = document.getElementById("address_id").value;


    var e = document.getElementById("countrylist");
    var countryId = {};
    countryId["id"] = e.options[e.selectedIndex].value;
    data["countryId"] = countryId;

    var e2 = document.getElementById("citylist");
    var cityId = {};
    cityId["id"] = e2.options[e2.selectedIndex].value;
    data["cityId"] = cityId;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            alert(xhr.responseText);
        }
    }

    xhr.open("POST", "http://localhost:8080/SanatoriumAPI/sanatorium/update", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}

function updateKlunaria() {
    var data = {};
    data["about"] = document.getElementById("klunaria_about").value;
    data["breakfastIn"] = document.getElementById("klunaria_breakfast_in").value;
    data["breakfastOut"] = document.getElementById("klunaria_breakfast_out").value;
    data["lunchIn"] = document.getElementById("klunaria_lunch_in").value;
    data["lunchOut"] = document.getElementById("klunaria_lunch_out").value;
    data["dinnerIn"] = document.getElementById("klunaria_dinner_in").value;
    data["dinnerOut"] = document.getElementById("klunaria_dinner_out").value;
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            alert(xhr.responseText);
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("PUT", "http://localhost:8080/SanatoriumAPI/klunarias/1", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
}

function updateDocuments(typeId) {
    var data = {};

    data["name"] = document.getElementById("documents_name").value;

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            alert(xhr.responseText);
            if (typeId === 1) {
                loadDocumentsForTreatments();
            } else {
                loadDocuments(typeId);
            }
        }
    }

    var documentId = document.getElementById("documentId").value;
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("PUT", "http://localhost:8080/SanatoriumAPI/documents/" + documentId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
//    xhr.send();
    xhr.send(JSON.stringify(data));
}

function updateDoctor(id) {
    var data = {};
    data["id"] = document.getElementById("doctor_id").value;
    data["name"] = document.getElementById("doctor_name").value;
    data["surname"] = document.getElementById("doctor_surname").value;
    data["fathername"] = document.getElementById("doctor_fathername").value;
    data["image"] = document.getElementById("doctor_image").value;
    var e = document.getElementById("proflist");
    var professionalismId = {};
    professionalismId["id"] = e.options[e.selectedIndex].value;
    data["professionalismId"] = professionalismId;
    var e2 = document.getElementById("speclist");
    var specialityId = {};
    specialityId["id"] = e2.options[e.selectedIndex].value;
    data["specialtyId"] = specialityId;
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            loadDoctors();
            alert(xhr.responseText);
        }
    }

    xhr.open("PUT", "http://localhost:8080/SanatoriumAPI/doctors/"+id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(data));
}

function updateRoom(id) {
    var data = {};
    data["id"] = document.getElementById("sanatorium_room_rel_id").value;
    data["area"] = document.getElementById("area").value;
    data["general"] = document.getElementById("general_info").value;

    var e = document.getElementById("roomlist");
    var room = {};
    room["id"] = e.options[e.selectedIndex].value;
    data["roomId"] = room;


    var e1 = document.getElementById("bedtypes");
    var e5 = document.getElementById("bedCount");

    var bedTypeSanRoomRelList = [];

    var bedtype = {};
//    bedtype["bedTypeId"] ={"id": e1.options[e1.selectedIndex].value};
    bedtype["bedTypeId"] = {"id": e1.options[e1.selectedIndex].value, "count": e5.options[e5.selectedIndex].value};
//    bedtype["count"]=e5.options[e5.selectedIndex].value;

    bedTypeSanRoomRelList.push(bedtype);

    data["bedTypeSanRoomRelList"] = bedTypeSanRoomRelList;

//      var e1 = document.getElementById("bedtypes");
//      var bedtype={};
//      bedtype["id"]= e1.options[e1.selectedIndex].value;
//    data["bedtypes"] =bedtype;

    var e2 = document.getElementById("personCount");
    data["personCount"] = e2.options[e2.selectedIndex].value;

    var e3 = document.getElementById("additionalbedCount");
    data["additionalBedCount"] = e3.options[e3.selectedIndex].value;

    var e4 = document.getElementById("maxAgeInAdditionalBed");
    data["maxAgeInAdditionalBed"] = e4.options[e4.selectedIndex].value;

//    var e5 = document.getElementById("bedCount");
//    data["count"]=e5.options[e5.selectedIndex].value;

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            alert(xhr.responseText);
        }
    }

    xhr.open("POST", "http://localhost:8080/SanatoriumAPI/sanatoriumrooms/" + id + "/update", true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(data));

}



function activateReview(review_id) {
    var data = {};

    data["id"] = review_id;
    data['activate'] = '1';

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            loadReviews();
        }
    }

    xhr.open("POST", "http://localhost:8080/SanatoriumAPI/review/activate", true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(data));
}

function deactivateReview(review_id) {
    var data = {};

    data["id"] = review_id;
    data['deactivate'] = '1';

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            loadReviews();
        }
    }

    xhr.open("POST", "http://localhost:8080/SanatoriumAPI/review/activate", true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(data));
}


function deleteDoctor(doctorId) {//
    var data = {};
    data["id"] = doctorId;
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            loadDoctors();
            alert(xhr.responseText);
        }
    }

    xhr.open("DELETE", "http://localhost:8080/SanatoriumAPI/doctors/"+doctorId+"/delete", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON

    xhr.send(JSON.stringify(data));
}

function deleteRoom(id) {
    var data = {};
    data["id"] = id;

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            alert(xhr.responseText);
            loadRoomsOfSanatorium(1);
        }
    }

    xhr.open("DELETE", "http://localhost:8080/SanatoriumAPI/sanatoriumrooms/" + id + "/delete", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON

    xhr.send(JSON.stringify(data));
}



function addKlunaria() {
    var data = {};
    var sanatorium = {id: 1};
    data["sanatoriumId"] = sanatorium;
    data["about"] = document.getElementById("klunaria_about").value;
    data["breakfastIn"] = document.getElementById("klunaria_breakfast_in").value;
    data["breakfastOut"] = document.getElementById("klunaria_breakfast_out").value;
    data["lunchIn"] = document.getElementById("klunaria_lunch_in").value;
    data["lunchOut"] = document.getElementById("klunaria_lunch_out").value;
    data["dinnerIn"] = document.getElementById("klunaria_dinner_in").value;
    data["dinnerOut"] = document.getElementById("klunaria_dinner_out").value;
    // construct an HTTP request


    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            loadKlunaria();
//            alert(xhr.responseText);
        }
    }
//ashagidaki linke post methodu ile muraciet edir

    xhr.open("POST", "http://localhost:8080/SanatoriumAPI/klunarias", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
}

function addDoctor() {
    var data = {};
    data["name"] = document.getElementById("doctor_name").value;
    data["surname"] = document.getElementById("doctor_surname").value;
    data["fathername"] = document.getElementById("doctor_fathername").value;
    data["image"] = document.getElementById("doctor_image").value;
    var e = document.getElementById("proflist");
    var professionalismId = {};
    professionalismId["id"] = e.options[e.selectedIndex].value;
    data["professionalismId"] = professionalismId;
    var e2 = document.getElementById("speclist");
    var specialityId = {};
    specialityId["id"] = e2.options[e.selectedIndex].value;
    data["specialtyId"] = specialityId;

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            alert(xhr.responseText);
            loadDoctors();
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("POST", "http://localhost:8080/SanatoriumAPI/doctors", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
}

function addRoom() {
    var data = {};
    data["area"] = document.getElementById("area").value;
    data["general"] = document.getElementById("general_info").value;

    var sanatorium = {};
    sanatorium["id"] = "1";
    data["sanatoriumId"] = sanatorium;

    var e = document.getElementById("roomlist");
    var room = {};
    room["id"] = e.options[e.selectedIndex].value;
    data["roomId"] = room;

//    var e1 = document.getElementById("bedtypes");
//    var bedTypeList = [];
//    var bedtype = {};
//    bedtype["id"] = e1.options[e1.selectedIndex].value;
//    bedTypeList.push(bedtype);
//    data["bedTypeId"] = bedTypeList;

    var e2 = document.getElementById("personCount");
    var personCount = {};
    data["personCount"] = e2.options[e2.selectedIndex].value;

    var e3 = document.getElementById("additionalbedCount");
    var additionalbedCount = {};
    data["additionalBedCount"] = e3.options[e3.selectedIndex].value;

    var e4 = document.getElementById("maxAgeInAdditionalBed");
    var maxAgeInAdditionalBed = {};
    data["maxAgeInAdditionalBed"] = e4.options[e4.selectedIndex].value;
//    var roomtype = {};
//    roomtype["id"] = "1";//
//    data["roomTypeId"] = roomtype;
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            alert(xhr.responseText);

        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("POST", "http://localhost:8080/SanatoriumAPI/sanatoriumrooms/add", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
}

function addDocument(typeId) {
    var documentTypeId = {};
    documentTypeId["id"] = typeId; //secilen hansidirsa onu gonderecen burda

    var data = {};
    data["name"] = document.getElementById("documents_name").value;
    data["sanatorium"] = {id: 1};
    data["documentTypeId"] = documentTypeId;
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            alert(xhr.responseText);
            loadDocuments(typeId);
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("POST", "http://localhost:8080/SanatoriumAPI/documents", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
//    xhr.send();
}



//gui methods
function getGUIforGeneralInformationDocumentTypes() {
    var link2 = '<a href="#" onclick="loadDocuments(2)">Document 1</a>';
    var link3 = '<a href="#" onclick="loadDocuments(3)">Document 2</a>';
    var link4 = '<a href="#" onclick="loadDocuments(4)">Document 3</a>';
    //   var result = link2 + "<br>" + link3 + "<br>" + link4 + "<br>";
    var result = '<div role="tabpanel">' +
            '<ul class="nav nav-tabs" role="tablist" >' +
            '<li role="presentation" class="active">' + link2 + '</li>' +
            '<li role="presentation" >' + link3 + '</li>' +
            '<li role="presentation">' + link4 + '</li>' +
            '</ul>';
//var result='<div role="tabpanel">'+
//   '<ul class="nav nav-tabs" role="tablist" >'+
//        '<li role="presentation" class="active"><a href="#document1" aria-controls="document1" role="tab" data-toggle="tab" >Document 1</a></li>'+
//        '<li role="presentation" ><a href="#document2" aria-controls="document2" role="tab" data-toggle="tab">Document 2</a></li>'+
//        '<li role="presentation"><a href="#document3" aria-controls="document3" role="tab" data-toggle="tab">Document 3</a></li>'+
//   '</ul>'+
//     '<div class="tab-content" >'+
//         '<div   role="tabpanel"  class="tab-pane active" id="document1" >...</div>'+
//         '<div  role="tabpanel" class="tab-pane" id="document2" >........</div>'+
//         '<div  role="tabpanel"  class="tab-pane" id="document3>............</div>'+
//     '</div>';
//        
    result += '</div>';
    return result;
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

function getGUIReviews(response) {
// var xhr = new XMLHttpRequest();
    var data = JSON.parse(response);
    var result =
            '<div class="col-md-12">' +
            '<div class="content-panel" >' +
            '<h4><i class="fa fa-angle-right"></i>Reviews</h4>' +
            '<hr>' +
            '<table class="table table-striped table-condensed table-hover" id="review"> ' +
            '<thead >' +
            '<tr>' +
            '<th >' + "Email" + '</th>' +
            '<th >' + "Positive" + '</th>' +
            '<th >' + "Negative" + '</th>' +
            '<th >' + "Point" + '</th>' +
            '<th >' + "Write_date" + '</th>' +
//            '<th style="text-align:center">' + "Reply" + '</th>' +
//            '<th style="text-align:center">' + "Reply_date" + '</th>' +
            '<th >' + "Activation_date" + '</th>' +
            '<th style="text-align:center" colspan="2">' + '</th>' +
            '</tr>' +
            '</thead>';
    result += '<tbody>';
    for (i = 0; i < data.length; i++) {
        var replyText = '';
//        if (data[i].reply) {
//            replyText = data[i].reply;
//        }
        var switchon = 'switch-on';
        if (!data[i].activationDate) {
            switchon = 'switch-off';
        }
        result +=
                '<tr>' +
                '<td id="user_email" >' + data[i].userId.email + '</td>' +
                '<td id="review_positivereview" >' + data[i].positivereview + '</td>' +
                '<td id="review_negativereview"> ' + data[i].negativereview + '</td>' +
                '<td id="review_point"> ' + data[i].point + '</td>' +
                '<td id="review_write_date">' + data[i].writeDate + '</td>' +
//                '<td id="review_reply"> ' + replyText + '</td>' +
//                '<td id="review_reply_date" >' + data[i].replyDate + '</td>' +
                '<td id="review_activation_date" >' + data[i].activationDate + '</td>' +
                '<td>' +
                getGUIforActivateButton(switchon, data[i].id, "activateReview(" + data[i].id + ")",
                        "deactivateReview(" + data[i].id + ")", "active", "not a") +
                '</td>' +
//                '<td>' +
//                '<i class="fa fa-reply btn-primary btn-xs" onclick="loadReview(' + data[i].id + ')"></i>' +
//                '</td>' +
                '</tr>';
    }

    result += '</tbody></table>' +
            '</div>' +
            '</div>';
    return result;
}



function getGUISanatoriumMedia(response) {
// var xhr = new XMLHttpRequest();
    var data = JSON.parse(response);
    //var data = JSON.parse(xhr.responseText);
    var result = "";
    for (i = 0; i < data.length; i++) {
        //' <div class="col-sm-10"><input type="text" class="form-control" id="media_name" value="' + data[i].name + '"></div>'
        var inputName = '<input type="text" class="form-control" id="media_name" value="' + data[i].name + '">';
        result += inputName;
    }
    return result;
}

function getGUIforDoctors(response) {
// var xhr = new XMLHttpRequest();
    var data = JSON.parse(response);
    var button = '<button class="btn btn-round btn-success" style="margin-left:5px" onclick="getGUIforDoctorAdding()">Add new Doctor</button>';

    var result =
            '<div class="col-md-12">' +
            '<div class="content-panel">' +
            '<h4><i class="fa fa-angle-right"></i>Doctors</h4>' +
            button +
            '<hr>' +
            '<table class="table table-striped table-condensed table-hover" id="doctor"> ' +
            '<thead >' +
            '<tr>' +
            '<th >' + "Image" + '</th>' +
            '<th >' + "Name" + '</th>' +
            '<th >' + "Surname" + '</th>' +
            '<th >' + "Fathername" + '</th>' +
            '<th >' + "Specialty" + '</th>' +
            '<th >' + "Level" + '</th>' +
            '<th colspan="2"></th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
    for (i = 0; i < data.length; i++) {
        var inputName = '<td id="doctor_name">' + data[i].name + '</td>';
        var inputSurname = '<td id="doctor_surname">' + data[i].surname + '</td>';
        var inputFatherName = '<td id="doctor_fathername">' + data[i].fathername + '</td>';
        var inputImage = '<td id="doctor_image">' + data[i].image + '</td>';
        var inputSpecialtyName = '<td id="specialty_name" >' + data[i].specialtyId.name + '</td>';
        var inputLevel = '<td id="doctor_profesionalism_level_level" >' + data[i].professionalismId.level + '</td>';
        var btnUpdate = '<td style="width:1%"><button class="btn btn-primary btn-xs"  onclick="loadDoctor(' + data[i].id + ')"><i class="fa fa-pencil"></i></button></td>';
        var btnDelete = '<td style="width:1%"><button class="btn btn-danger btn-xs"  onclick="deleteDoctor(' + data[i].id + ')" ><i class="fa fa-trash-o "></i></button></td>';


        result +=
                '<tr style="background-color:white" >' +
                inputImage +
                inputName +
                inputFatherName +
                inputSurname +
                inputSpecialtyName +
                inputLevel +
                btnUpdate +
                btnDelete +
                '</tr>';
    }
    result +=
            '</tbody>' +
            '</table>' +
            '</div>' +
            '</div>';

    document.getElementById("content-refresh").innerHTML = result;
    return result;
}

function getGUIforDoctorUpdating(response) {

    if (typeof response === 'undefined') {
        return;
    }

    var data = JSON.parse(response);

    var linkBack = '<button type="button" class="badge bg-success" onclick="loadDoctors()" >Back</button>';

    var labelName = '<label class="col-sm-2 col-sm-2 control-label">Name:</label>';
    var labelSurname = '<label class="col-sm-2 col-sm-2 control-label">Surname:</label>';
    var labelFatherName = '<label class="col-sm-2 col-sm-2 control-label">Father name:</label>';
    var labelImage = '<label class="col-sm-2 col-sm-2 control-label">Image:</label>';
    var labelSpecialityName = '<label class="col-sm-2 col-sm-2 control-label">Specialty:</label>';
    var labelProf = '<label class="col-sm-2 col-sm-2 control-label">Professionalism:</label>';

    var inputName = '<input type="text" class="form-control" id="doctor_name" value="' + data[0].name + '">';
    var inputSurname = '<input type="text" class="form-control" id="doctor_surname" value="' + data[0].surname + '">';
    var inputFatherName = '<input type="text" class="form-control" id="doctor_fathername" value="' + data[0].fathername + '">';
    var inputImage = '<input type="text" class="form-control" id="doctor_image" value="' + data[0].image + '">';
    var inputSpecialtyName = '<span id="special"></span>';
    var inputProfessionalism = '<span id="prof"></span>';
    var inputId = '<input type="hidden" id="doctor_id" value="' + data[0].id + '">';
    var btnSave = '<button class="btn btn-info" onclick="updateDoctor('+data[0].id+')">Save</button>';
    var result = '';

    result += '<h4><i class="fa fa-angle-right"></i>Edit</h4>' +
            linkBack + "<br>" +
            inputId + "<br>" +
            '<div class="form-group">' + labelImage +
            '<div class="col-sm-10">' + inputImage + '</div>' + '</div>' + "<br>" +
            '<div class="form-group">' + labelName +
            '<div class="col-sm-10">' + inputName + '</div>' + '</div>' + "<br>" +
            '<div class="form-group">' + labelFatherName +
            '<div class="col-sm-10">' + inputFatherName + '</div>' + '</div>' + "<br>" +
            '<div class="form-group">' + labelSurname +
            '<div class="col-sm-10">' + inputSurname + '</div>' + '</div>' + "<br>" +
            '<div class="form-group">' + labelSpecialityName +
            '<div class="col-sm-10">' + inputSpecialtyName + '</div>' + '</div>' + "<br>" +
            '<div class="form-group">' + labelProf +
            '<div class="col-sm-10">' + inputProfessionalism + '</div>' + '</div>' + "<br>" +
            btnSave + "<br>";


    document.getElementById("content-refresh").innerHTML = result;
    loadProfessionalisms(data[0].professionalismId.id);
    loadSpecialty(data[0].specialtyId.id);
    return result;
}

function getGUIforDoctorAdding() {
    var linkBack = '<button type="button" class="badge bg-success" onclick="loadDoctors()" >Back</button>';

    var labelName = '<label class="col-sm-2 col-sm-2 control-label">Name:</label>';
    var inputName = '<input type="text" class="form-control" id="doctor_name" >';

    var labelSurname = '<label class="col-sm-2 col-sm-2 control-label">Surname:</label>';
    var inputSurname = '<input type="text" class="form-control" id="doctor_surname" >';

    var labelFatherName = '<label class="col-sm-2 col-sm-2 control-label">Father name:</label>';
    var inputFatherName = '<input type="text" class="form-control"  id="doctor_fathername" >';

    var labelImage = '<label class="col-sm-2 col-sm-2 control-label">Image:</label>';
    var inputImage = '<input type="text" class="form-control" id="doctor_image" >';

    var labelSpecialityName = '<label class="col-sm-2 col-sm-2 control-label">Speciality:</label>';
    var inputSpecialtyName = '<span id="special"></span>';

    var labelProf = '<label class="col-sm-2 col-sm-2 control-label">Professionalism:</label>';
    var inputProfessionalism = '<span id="prof"></span>';

    var inputId = '<input type="hidden" id="doctor_id" >';
    var btnSave = '<button  class="btn btn-info" onclick="addDoctor()" >Save</button>';

    var result = '';
    result +=
            inputId + "<br>" +
            linkBack + "<br>" +
            '<div class="form-group">' + labelImage +
            '<div class="col-sm-10">' + inputImage + '</div>' + '</div>' + "<br>" +
            '<div class="form-group">' + labelName +
            '<div class="col-sm-10">' + inputName + '</div>' + '</div>' + "<br>" +
            '<div class="form-group">' + labelFatherName +
            '<div class="col-sm-10">' + inputFatherName + '</div>' + '</div>' + "<br>" +
            '<div class="form-group">' + labelSurname +
            '<div class="col-sm-10">' + inputSurname + '</div>' + '</div>' + "<br>" +
            '<div class="form-group">' + labelSpecialityName +
            '<div class="col-sm-10">' + inputSpecialtyName + '</div>' + '</div>' + "<br>" +
            '<div class="form-group">' + labelProf +
            '<div class="col-sm-10">' + inputProfessionalism + '</div>' + '</div>' + "<br>" +
            btnSave + "<br>";

    document.getElementById("content-refresh").innerHTML = result;
    loadProfessionalisms(0);
    loadSpecialty(0);
    return result;
}



function getGUIforRoomsCombobox(response, id) {
    var data = JSON.parse(response);
    var result = '';

    for (i = 0; i < data.length; i++) {
        if (data[i].id === id)
        {
            result += ' <option  style="background-color:white;" selected value="' + data[i].id + '">';
        } else
        {
            result += ' <option value="' + data[i].id + '">';
        }
        result += data[i].name + '</option>';

        return result;
    }
}

function getGUIforBedTypesCombobox(response, id, count) {
    var data = JSON.parse(response);
    var result =
            '<div class="col-md-3">' +
            '<select class="btn btn-theme03" id="bedtypes"> ';

    for (i = 0; i < data.length; i++) {
        if (data[i].id === id)

        {
            result += ' <option  style="background-color:white;" selected value="' + data[i].id + '">';
        } else
        {
            result += ' <option value="' + data[i].id + '">';
        }
        result += data[i].name + "\/" + data[i].size + '</option>';
    }

    result += '</select>' +
            '</div>';

    result +=
            ' <div  class="col-md-2">' +
            '<select class="btn btn-theme03" id="bedCount">';

    for (i = 1; i < 6; i++) {
        if (i === count)
        {
            result += ' <option  style="background-color:white;" selected value="' + i + '">';
        } else {
            result += ' <option value="' + i + '">';
        }
        result += i + '</option>';
    }
    result += '</select>' + ' </div>';
    return result;
}

function getGUIforSanatoriumRoomRelCombobox(response, id) {
    var data = JSON.parse(response);
    var result = '';
    var inputId = '<input type="hidden" id="sanatorium_room_rel_id" value="' + data.id + '">';

    result += '<div class="form-group">' +
            ' <label class="col-sm-2 col-sm-2 control-label">How many people can  stay here?</label>' +
            '<div class="col-sm-10">' +
            ' <select class="btn btn-theme03" id="personCount">';

    for (i = 1; i < 6; i++) {
        if (i === data.personCount)
        {
            result += ' <option  style="background-color:white;" selected value="' + i + '">';
        } else {
            result += ' <option value="' + i + '">';
        }
        result += i + '</option>';
    }

    result +=
            ' </select>';
    result +=
            '</div>' +
            ' </div>';

    result +=
            '<div class="form-group">' +
            ' <label class="col-sm-2 col-sm-2 control-label">' +
            'Would you provide with  additional bed?' +
            ' </label>' +
            '<div class="col-sm-10">';
    var yesSelected = false;
    var noSelected = false;
    var bedVisible = '';
    if (data.additionalBedCount > 0) {
        yesSelected = "checked";
    } else {
        noSelected = "checked";
        bedVisible = ' style="display: none" ';
    }
    result +=
            ' <input  type="radio" name="radio" ' + yesSelected + ' value="1" onchange="refreshBedWindow(this.value)" /> Yes' +
            ' <input type="radio" name="radio" value="0"  ' + noSelected + ' onchange="refreshBedWindow(this.value)"/>No' +
            '</div>' +
            ' </div>' +
            '<div id="bed_window" ' + bedVisible + '>' +
            ' <div class="form-group" >' +
            '<label class="col-sm-2 col-sm-2 control-label">How many additional bed do you provide ?</label>' +
            ' <div class="col-sm-10">' +
            '<select class="btn btn-theme03" id="additionalbedCount"> ';
    for (i = 1; i < 6; i++) {
        if (i === data.additionalBedCount)
        {
            result += ' <option  style="background-color:white;" selected value="' + i + '">';
        } else {
            result += ' <option value="' + i + '">';
        }
        result += i + '</option>';
    }

    result += ' </select>';
    result +=
            '</div>' +
            ' </div>' +
            '<div class="form-group" >' +
            ' <label class="col-sm-2 col-sm-2 control-label">Which max age can be stay in these beds?</label>' +
            '<select class="btn btn-theme03" id="maxAgeInAdditionalBed"> ';
    for (i = 1; i < 100; i++) {
        if (i === data.maxAgeInAdditionalBed)

        {
            result += ' <option  style="background-color:white;" selected value="' + i + '">';
        } else {
            result += ' <option value="' + i + '">';
        }
        result += i + '</option>';
    }
    result +=
            '</select> ' +
            ' </div>' +
            '</div>';


    result += '<div class="form-group" >' +
            '<label class="col-sm-2 col-sm-2 control-label">General information</label>' +
            '<textarea id="general_info" >' + data.general + '</textarea>' +
            ' </div>' +
            '<div class="form-group" >' +
            '<label class="col-sm-2 col-sm-2 control-label">Size:</label>' +
            '<input type="text" id="area" value="' + data.area + '">' +
            ' </div>' + inputId +
            '<button class="btn btn-info" onclick="updateRoom(' + id + ')">Save</button>';

    document.getElementById("sanatoriumRoomRel").innerHTML = result;
    return result;
}


function getGUIforTreatmentProgram() {
    var link2 = '<a href="#" onclick="loadTreatmentProgram(1)" >Treatement Program 1</a>';
    var link3 = '<a href="#" onclick="loadTreatmentProgram(2)">Treatement Program 2</a>';
    var link4 = '<a href="#" onclick="loadTreatmentProgram(3)">Treatement Program 3</a>';
    var result = link2 + "<br>" + link3 + "<br>" + link4 + "<br>";
    return result;
}

function getGUIforProfessionalismCombobox(response, id) {
    var data = JSON.parse(response);
    var result = '';
    result += '<select class="btn btn-theme03" id="proflist" >';
    for (i = 0; i < data.length; i++) {
        if (data[i].id === id)
        {
            result += ' <option  style="background-color:white;" selected value="' + data[i].id + '">';
        } else {
            result += ' <option value="' + data[i].id + '">';
        }
        result += data[i].level + '</option>';
    }
    result += '</select>';
    return result;
}

function getGUIforSpecialtyCombobox(response, id) {
    var data = JSON.parse(response);
    var result = '';
    result += '<select id="speclist" class="btn btn-theme03">';
    for (i = 0; i < data.length; i++) {
        if (data[i].id === id)

        {
            result += ' <option selected value="' + data[i].id + '">'; //burda gorduyun value speclist=1 bu shekle dushur
        } else {
            result += ' <option value="' + data[i].id + '">';
        }
        result += data[i].name + '</option>';
    }
    result += '</select>';
    return result;
}

function refreshBedWindow(value) {
    if (value == 1) {
        document.getElementById("bed_window").style.display = '';
    } else if (value == 0) {
        document.getElementById("bed_window").style.display = 'none';
    }
}


function getGUIforRoomtypeCombobox(response, id) {
    var data = JSON.parse(response);
    var result = '<option selected value="0">Select room type</option>';
//    result += '<select class="btn btn-theme dropdown-toggle" id="typelist">';
    for (i = 0; i < data.length; i++) {
        if (data[i].id === id)
        {
            result += ' <option selected value="' + data[i].id + '">';
        } else {
            result += ' <option value="' + data[i].id + '">';
        }
        result += data[i].name + '</option>';
    }
//    result += '</select>';
    return result;
}

function getGUIforCityCombobox(response, id) {
    var data = JSON.parse(response);
    var result = '';
    result += '<select id="citylist" class="btn btn-theme03">';
    for (i = 0; i < data.length; i++) {
        if (data[i].id === id)

        {
            result += ' <option selected value="' + data[i].id + '">'; //burda gorduyun value speclist=1 bu shekle dushur
        } else {
            result += ' <option value="' + data[i].id + '">';
        }
        result += data[i].name + '</option>';
    }
    result += '</select>';
    return result;
}

function getGUIforCountryCombobox(response, id) {
    var data = JSON.parse(response);
    var result = '';
    result += '<select class="btn btn-theme03" id="countrylist" >';
    for (i = 0; i < data.length; i++) {
        if (data[i].id === id)
        {
            result += ' <option  style="background-color:white;" selected value="' + data[i].id + '">';
        } else {
            result += ' <option value="' + data[i].id + '">';
        }
        result += data[i].name + '</option>';
    }
    result += '</select>';
    return result;
}

function getGUIforPhoneIndexCombobox(response, id) {
    var data = JSON.parse(response);
    var result = '';
    result += '<select class="btn btn-theme03" id="phoneindexlist" >';
    for (i = 0; i < data.length; i++) {
        if (data[i].id === id)
        {
            result += ' <option  style="background-color:white;" selected value="' + data[i].id + '">';
        } else {
            result += ' <option value="' + data[i].id + '">';
        }
        result += data[i].phoneindex + '</option>';
    }
    result += '</select>';
    return result;
}



function getGUIforTravelCategorys(response) {
    var result = "";
    var button = '<button class="btn btn-round btn-success" onclick="addSanatoriumTravelCategoryRel()">Save checkbox</button>';

    var travelCategorys = JSON.parse(response);
    for (i = 0; i < travelCategorys.length; i++) {
        result += '<input type="checkbox" name="travelCategorys" value=' + travelCategorys [i].id + ' id=' + "travelCategory_" + travelCategorys [i].id + ' >' + travelCategorys [i].name + '</input><br/>';
    }
    result += button;
    return result;
}

function getGUIforIllnesses(response) {
    var data = JSON.parse(response);

    var result =
            '<h4><i class="fa fa-angle-right"></i>Illnesses</h4>' +
            '<hr>';
    var submit = '<button class="btn btn-round btn-success" onclick="addSanatoriumSubillnessRel()">Save</button>';
    result += '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
    for (i = 0; i < data.length; i++) {
//        var models = getGUIforModels(data[i].models, data[i].id);

        result +=
                '<div class="panel panel-default">' +
                '<div class="panel-heading" role="tab" id="heading' + i + '">' +
                '<h4 class="panel-title">' +
                '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '" class="collapsed">' +
                data[i].name +
                '</a>' +
                '</h4>' +
                '</div>' +
                '<div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '">' +
                '<div class="panel-body" data-spy="scroll">';
        for (j = 0; j < data[i].subillnessList.length; j++) {
            result += '<input type="checkbox" style="margin:0px 7px" id="subillness_' + data[i].subillnessList[j].id + '" name="subillness" value="' + data[i].subillnessList[j].id + '">' + data[i].subillnessList[j].name + '</input>';
        }
        result += '</div>' +
                '</div>' +
                '</div>';
    }
    result += submit + '</div>';

    return result;
}

function getGUIforTreatments(response) {

    var data = JSON.parse(response);

    var result =
            '<h4><i class="fa fa-angle-right"></i>Treatments</h4>' +
            '<hr>';
    var submit = '<button class="btn btn-round btn-success" onclick="addSanatoriumSubtreatmentRel()">Save</button>';

    result += '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
    for (i = 0; i < data.length; i++) {
        result +=
                '<div class="panel panel-default">' +
                '<div class="panel-heading" role="tab" id="heading' + i + '">' +
                '<h4 class="panel-title">' +
                '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '" class="collapsed">' +
                data[i].name +
                '</a>' +
                '</h4>' +
                '</div>' +
                '<div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '">' +
                '<div class="panel-body" data-spy="scroll">';
        for (j = 0; j < data[i].subtreatmentList.length; j++) {
            result += '<input type="checkbox" style="margin:0px 7px" id="subtreatment_'
                    + data[i].subtreatmentList[j].id + '" name="subtreatment" value="' + data[i].subtreatmentList[j].id + '">'
                    + data[i].subtreatmentList[j].name + '</input>';
        }
        result += '</div>' +
                '</div>' +
                '</div>';
    }
    result += submit + '</div>';

    return result;
}

function getGUIforAbout(response) {

    var data = JSON.parse(response);
    var result = '';
    var inputLabel = '<label class="col-sm-2 col-sm-2 control-label">Sanatorium name:</label>';
    var areaLabel = '<label class="col-sm-2 col-sm-2 control-label">About:</label>';

    var serviceLabel = '<label class="col-sm-2 col-sm-2 control-label">Which packet types does your sanatorium serve?</label>';
    var submit = '<button class="btn btn-round btn-success" onclick="updateSanatorium()">Save</button>';

    var sanatorium_name = '<input type="text" class="form-control" id="sanatorium_name" value="' + data[0].name + '">';
    var about = '<textarea rows="4" class="col-sm-2 form-control" cols="50" id="sanatorium_about">' + data[0].about + '</textarea>';
    var phone = '<input type="text" class="form-control" id="sanatorium_phone_number" value="' + data[0].phoneNumber + '">';

    //country and city

    var labelCountryName = '<label class="col-sm-2 col-sm-2 control-label">Country:</label>';
    var labelCityName = '<label class="col-sm-2 col-sm-2 control-label">City:</label>';
    var labelPhoneindex = '<label class="col-sm-2 col-sm-2 control-label">Phone:</label>';

    var inputCountryName = '<span id="country"></span>';
    var inputCityName = '<span id="city"></span>';
    var inputPhoneindex = '<span id="phoneindex"></span>';
    var inputId = '<input type="hidden" id="address_id" value="' + data[0].id + '">';

    result =
            '<div class="col-lg-12">' +
            '<div class="form-panel">' +
            '<h4><i class="fa fa-angle-right"></i>About</h4>' +
            '<div class="form-horizontal style-form">' +
            '<div class="form-group">' +
            inputLabel +
            '<div class="col-sm-10">' +
            sanatorium_name +
            '</div>' +
            '</div>' +
            '<div class="form-group">' +
            areaLabel +
            '<div class="col-sm-10">' +
            about +
            '</div>' +
            '</div>' +
            //country and city
            inputId + "<br>" +
            '<div class="form-group">' + labelCountryName +
            '<div class="col-sm-10">' + inputCountryName + '</div>' + '</div>' + "<br>" +
            '<div class="form-group">' + labelCityName +
            '<div class="col-sm-10">' + inputCityName + '</div>' + '</div>' + "<br>" +
            '<div class="form-group">' + labelPhoneindex +
            '<div class="col-sm-5">' + inputPhoneindex + phone + '</div>' + '</div>' + "<br>" +
            //packets
            '<div class="form-group">' +
            serviceLabel + "<br>" + "<br>" +
            '<div class="col-sm-10" id="travelCategorys">' +
            //packet types must be shown here
            '</div>' +
            '</div>' +
            
            '</div>' +
            submit +
            '</div>' +
            '</div>';

    loadCity(data[0].cityId.id);
    loadCountry(data[0].countryId.id);
    loadPhoneIndex(data[0].countryId.id);

    return result;

}

function getGUIforKlunaria(response) {
    var data = JSON.parse(response);

    var labelAbout = "About:";
    var labelBreakfast_in = '<label class="col-sm-2 col-sm-2 control-label">Breakfast in:</label>';
    var labelBreakfast_out = '<label class="col-sm-2 col-sm-2 control-label">Breakfast out:</label>';
    var labelLunch_in = '<label class="col-sm-2 col-sm-2 control-label">Lunch in:</label>';
    var labelLunch_out = '<label class="col-sm-2 col-sm-2 control-label">Lunch out:</label>';
    var labelSupper_in = '<label class="col-sm-2 col-sm-2 control-label">Dinner in:</label>';
    var labelSupper_out = '<label class="col-sm-2 col-sm-2 control-label">Dinner out:</label>';


    var textAreaAbout = '<textarea rows="4" cols="50" id="klunaria_about" >' + data.about + '</textarea>';
    var inputBreakfastIn = '<input type="text" class="form-control" id="klunaria_breakfast_in" value="' + data.breakfastIn + '">';
    var inputBreakfastOut = '<input type="text" class="form-control" id="klunaria_breakfast_out" value="' + data.breakfastOut + '">';
    var inputLunchIn = '<input type="text" class="form-control" id="klunaria_lunch_in" value="' + data.lunchIn + '">';
    var inputLunchOut = '<input type="text" class="form-control" id="klunaria_lunch_out" value="' + data.lunchOut + '">';
    var inputSupperIn = '<input type="text" class="form-control" id="klunaria_dinner_in" value="' + data.dinnerIn + '">';
    var inputSupperOut = '<input type="text" class="form-control" id="klunaria_dinner_out" value="' + data.dinnerOut + '">';

    var btnSubmit = '';
    if (data.id > 0)
    {
        btnSubmit = '<button class="btn btn-success" onclick="updateKlunaria()">Save</button>';
    } else {
        btnSubmit = '<button class="btn btn-success" onclick="addKlunaria()">Save</button>';
    }

    var result =
            '<div class="col-lg-12">' +
            '<div class="form-panel">' +
            '<h4><i class="fa fa-angle-right"></i>Klunaria</h4>' +
            '<div class="form-horizontal style-form">' +
            '<div class="form-group">' +
            labelBreakfast_in +
            '<div class="col-sm-10">' +
            inputBreakfastIn +
            '</div>' +
            '</div>' +
            '<div class="form-group">' +
            labelBreakfast_out +
            '<div class="col-sm-10">' +
            inputBreakfastOut +
            '</div>' +
            '</div>' +
            '<div class="form-group">' +
            labelLunch_in +
            '<div class="col-sm-10">' +
            inputLunchIn +
            '</div>' +
            '</div>' +
            '<div class="form-group">' +
            labelLunch_out +
            '<div class="col-sm-10">' +
            inputLunchOut +
            '</div>' +
            '</div>' +
            '<div class="form-group">' +
            labelSupper_in +
            '<div class="col-sm-10">' +
            inputSupperIn +
            '</div>' +
            '</div>' +
            '<div class="form-group">' +
            labelSupper_out +
            '<div class="col-sm-10">' +
            inputSupperOut +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="form-horizontal style-form">' +
            '<div class="form-group">' +
            '<label class="col-sm-2 col-sm-2 control-label">' + labelAbout + '</label>' +
            '<div class="col-sm-10">' +
            textAreaAbout +
            '</div>' +
            '</div>' +
            '</div>' +
            btnSubmit +
            '</div>' +
            '</div>';

    return result;

}

function getGUIforFuns(response) {
//content-refresh() -div-in id-sidir

    var data = JSON.parse(response);
    var submit = '<button class="btn btn-round btn-success" style="margin-top:5px" onclick="addSanatoriumSubfunRel()">Save</button>';
    var result =
            '<h4><i class="fa fa-angle-right"></i>Funs</h4>' +
            '<hr>';

    result += '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
    for (i = 0; i < data.length; i++) {
        result +=
                '<div class="panel panel-default">' +
                '<div class="panel-heading" role="tab" id="heading' + i + '">' +
                '<h4 class="panel-title">' +
                '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '" class="collapsed">' +
                data[i].name +
                '</a>' +
                '</h4>' +
                '</div>' +
                '<div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '">' +
                '<div class="panel-body" data-spy="scroll">';
        for (j = 0; j < data[i].subfunList.length; j++) {
            result += '<input type="checkbox" style="margin:0px 7px"  id="subfun_' + data[i].subfunList[j].id + '" name="subfun" value="' + data[i].subfunList[j].id + '">' + data[i].subfunList[j].name + '</input>';
        }
        result += '</div>' +
                '</div>' +
                '</div>';
    }

    result += submit + '</div>';

    return result;
}

function getGUIforDocument(response, typeId) {
    var data = JSON.parse(response);
    var documentText = "";
    if (data.name !== null) {
        documentText = data.name;
    }
    var documentId = '<input type="hidden" id="documentId" value=\"' + data.id + '\">';
    var labelDocument = '<h4><i class="fa fa-angle-right"></i>Document content</h4>';
    var inputName = '<textarea rows="4" cols="50" class="form-control" id="documents_name">' + documentText + '</textarea>';
    var btnSubmit = '';
    if (data.id > 0)
    {
        btnSubmit = '<button class="btn btn-success" onclick="updateDocuments(' + typeId + ')">Save</button>';
    } else {
        btnSubmit = '<button class="btn btn-success" onclick="addDocument(' + typeId + ')">Save</button>';
    }

    var result = documentId + labelDocument + "<br/>" + inputName + "<br>" + btnSubmit;
    return result;
}

function checkTravelCategorys(response) {
    var data = JSON.parse(response);
    for (i = 0; i < data.length; i++) {
        document.getElementById("travelCategory_" + data[i].travelCategoryId.id).setAttribute("checked", "true");
    }
}

function checkSubfuns(response) {
    var data = JSON.parse(response);
    for (i = 0; i < data.length; i++) {
        document.getElementById("subfun_" + data[i].subfun.id).setAttribute("checked", "true");
    }
}

function checkSubillnesss(response) {
    var data = JSON.parse(response);
    for (i = 0; i < data.length; i++) {
        document.getElementById("subillness_" + data[i].subillness.id).setAttribute("checked", "true");
    }
}

function checkSubtreatments(response) {
    var data = JSON.parse(response);
    //bu da id-si gelen neticenin idsi olan checkboxlari tapir ve checked edir
    //burda da hemin idli checkboxlar tapilir ve set checked olurnu
    for (i = 0; i < data.length; i++) {
        document.getElementById("subtreatment_" + data[i].subtreatment.id).setAttribute("checked", "true");
    }
}






//load methods

function loadSubillnesss() {
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            checkSubillnesss(xhr.responseText);
        }
    }
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatoriums/1/sanatoriumsubillnesses", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function loadTreatments() {
    document.getElementById("content-refresh").innerHTML = '';
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            //burda hemin muracietin neticesini alir ve gonderir loadTreatments funksiyasina
            //netice json array dir
            var gui = getGUIforTreatments(xhr.responseText);
            document.getElementById("content-refresh").innerHTML = gui;
            //indi ise hemin sanatoriyaya aid olan checkboxlar checked olmadlidir
            loadSubtreatments();
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/treatments", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function loadSubtreatments() { 
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        //status veziyyetdir ==4 tamamlanmaq demekdi ==1 olsa loading ve s. 
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            //neticeni gonderir bu funksiyaya
            checkSubtreatments(xhr.responseText);
        }
    }
//bu gedir sanatoriuma aid olan subtreatmentleri goturur
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatoriums/1/subtreatments", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function loadIllnesses() {
    document.getElementById("content-refresh").innerHTML = '';
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            document.getElementById("content-refresh").innerHTML = getGUIforIllnesses(xhr.responseText);
            loadSubillnesss();
        }
    }
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/illnesses", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function loadKlunaria() {

    document.getElementById("content-refresh").innerHTML = '';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var gui = getGUIforKlunaria(xhr.responseText);
            document.getElementById("content-refresh").innerHTML = gui;
        }
    }
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatorium/1/klunaria", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

function loadDocuments(typeId) {
//bu funksiya sadece service muraciet edir ve tip idye uygun neticeni goturur ve neticeni gonderiri
//getdui-ye o da hemin melumati emal edir ve geriye ekranda gorunmeli olan melumati return edir

    document.getElementById("content-refresh").innerHTML = '';
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var data = JSON.parse(xhr.responseText);
            //burda parse edir hemin arrayi
            var result = '';
            if (typeId > 1) {
                result += getGUIforGeneralInformationDocumentTypes();
            }
            result += getGUIforDocument(xhr.responseText, typeId);

            document.getElementById("content-refresh").setAttribute('display', 'none');
            document.getElementById("content-refresh").innerHTML = result;
            document.getElementById("content-refresh").setAttribute('display', 'inline');
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatoriums/1/documents?typeid=" + typeId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function loadDocTypesForGeneralInformation() {
//sadece 3 linki cixaracaq
    document.getElementById("content-refresh").innerHTML = '';
    document.getElementById("content-refresh").innerHTML = getGUIforGeneralInformationDocumentTypes();
}

function loadTreatmentProgram(typeId) {
    document.getElementById("content-refresh").innerHTML = '';
    var result = getGUIforTreatmentProgram();
    document.getElementById("content-refresh").innerHTML = result;
}

function loadDoctors() {
    document.getElementById("content-refresh").innerHTML = '';
    var xhr = new XMLHttpRequest();
    var data = {};
    var sanatorium = {};
    sanatorium["id"] = 1;
    data["sanatoriumId"] = sanatorium;
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var result = getGUIforDoctors(xhr.responseText);
            document.getElementById("content-refresh").setAttribute('display', 'none');
            document.getElementById("content-refresh").innerHTML = result;
            document.getElementById("content-refresh").setAttribute('display', 'inline');
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatorium/1/doctors", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
}

function loadDoctor(doctorId) {
    document.getElementById("content-refresh").innerHTML = '';
    var xhr = new XMLHttpRequest();
    var data = {};
    var sanatorium = {};
    sanatorium["id"] = 1;
    data["sanatoriumId"] = sanatorium;
    if (doctorId > 0) {
        data["id"] = doctorId;
    }

    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)

        {
            getGUIforDoctorUpdating(xhr.responseText);
            /* document.getElementById("content-refresh").setAttribute('display', 'none');
             document.getElementById("content-refresh").innerHTML = data;
             document.getElementById("content-refresh").setAttribute('display', 'inline');
             */
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatorium/1/doctors", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
}

function loadSanatoriumMedia(mediaTypeId, categoryId) {
    var data = {};
    var category = {};
    category["id"] = categoryId;
    var mediaType = {};
    mediaType["id"] = mediaTypeId;
    var sanatorium = {};
    sanatorium["id"] = "1";
    data["sanatoriumId"] = sanatorium;
    data["mediaTypeId"] = mediaType;
    data["categoryId"] = category;
    document.getElementById("content-refresh").innerHTML = '';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var result = getGUISanatoriumMedia(xhr.responseText);
            document.getElementById("content-refresh").setAttribute('display', 'none');
            document.getElementById("content-refresh").innerHTML = result;
            document.getElementById("content-refresh").setAttribute('display', 'inline');
        }
    }

    xhr.open("POST", "http://localhost:8080/SanatoriumAPI/media", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
}

function loadReviews() {
    var data = {};
    var sanatorium = {};
    sanatorium["id"] = 1;
    data["sanatoriumId"] = sanatorium;
    document.getElementById("content-refresh").innerHTML = '';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {

            var result = getGUIReviews(xhr.responseText);
            document.getElementById("content-refresh").setAttribute('display', 'none');
            document.getElementById("content-refresh").innerHTML = result;
            document.getElementById("content-refresh").setAttribute('display', 'inline');
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("POST", "http://localhost:8080/SanatoriumAPI/review", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON

    xhr.send(JSON.stringify(data));
}


function loadAbout() {
    document.getElementById("content-refresh").innerHTML = '';
    data = {"id": 1};
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()

    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var gui = getGUIforAbout(xhr.responseText);
            document.getElementById("content-refresh").innerHTML = gui;
            loadTravelCategorys();
            //  loadAddress();
        }
    }
    //ashagidaki linke post methodu ile muraciet edir
    xhr.open("POST", "http://localhost:8080/SanatoriumAPI/sanatorium", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

}



function loadTravelCategorys() {
    var data = {};
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()

    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var gui = getGUIforTravelCategorys(xhr.responseText);
            document.getElementById("travelCategorys").innerHTML = gui;
            loadTravelCategorysOfSanatorium(1);
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/travelcategories", true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
}

function loadTravelCategorysOfSanatorium(sanatoriumId) {
    var data = {};
    var sanatorium = {};
    sanatorium["id"] = sanatoriumId;
    data["sanatorium"] = sanatorium;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            checkTravelCategorys(xhr.responseText);
        }
    }
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatorium/" + sanatoriumId + "/sanatoriumtravelcategories", true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
}

function loadSeasonsMenu(sanatoriumId) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            fillSeasonsMenu(JSON.parse(xhr.responseText));
        }
    }
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatorium/" + sanatoriumId + "/sanatoriumtravelcategories", true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function fillSeasonsMenu(data) {
    var menu = document.getElementById("seasons_of_sanatorium");

    for (i = 0; i < data.length; i++) {
        menu.innerHTML +=
                '<li><a href="#" onclick="loadSeasons(' + data[i].id + ')">'
                + data[i].travelCategoryId.name +
                '</a></li>';
    }
}

function loadPacketsMenu(sanatoriumId) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            fillPacketsMenu(JSON.parse(xhr.responseText));
        }
    }
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatorium/" + sanatoriumId + "/sanatoriumtravelcategories", true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function fillPacketsMenu(data) {
    var menu = document.getElementById("packets_of_sanatorium");

    for (i = 0; i < data.length; i++) {
        menu.innerHTML +=
                '<li><a href="#" onclick="loadPackets(' + data[i].id + ')">'
                + data[i].travelCategoryId.name +
                '</a></li>';
    }
}

function loadFuns() {

    document.getElementById("content-refresh").innerHTML = '';
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var gui = getGUIforFuns(xhr.responseText);
            document.getElementById("content-refresh").innerHTML = gui;

            loadSubfunsOfSanatorium();
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/funs", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function loadSubfunsOfSanatorium() {

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        //status veziyyetdir ==4 tamamlanmaq demekdi ==1 olsa loading ve s. 
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            //neticeni gonderir bu funksiyaya
            checkSubfuns(xhr.responseText);
        }
    }
//bu gedir sanatoriuma aid olan subtreatmentleri goturur
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatoriums/1/sanatoriumsubfuns", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function loadCountry(id) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)

        {    //bu resulti goturub hemin profa menimset
            var result = getGUIforCountryCombobox(xhr.responseText, id);
            document.getElementById("country").innerHTML = result;
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatorium/countries", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function loadCity(id) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)

        {    //bu resulti goturub hemin profa menimset
            var result = getGUIforCityCombobox(xhr.responseText, id);
            document.getElementById("city").innerHTML = result;
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatorium/cities", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function loadPhoneIndex(id) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)

        {    //bu resulti goturub hemin profa menimset
            var result = getGUIforPhoneIndexCombobox(xhr.responseText, id);
            document.getElementById("phoneindex").innerHTML = result;
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatorium/countries", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}





function getGUIforRoomAdding() {
    var buttonAdd = '<button class="btn btn-info" onclick="addRoom()">Add</button>';
    var linkBack = '<button type="button" class="badge bg-success" onclick="loadRoomsOfSanatorium(1)" >Back</button>';
    return  '<h4><i class="fa fa-angle-right"></i>Add</h4>' +
            linkBack + "<br>" +
            '<div class="form-horizontal style-form" > <div class="form-group">' +
            '<label class="col-sm-2 col-sm-2 control-label">Roomtype:</label>' +
            ' <div class="col-sm-10">' +
            '<select class="btn btn-theme03" id="roomtypelist" onchange="loadRooms(this.value)"> ' +
            ' </select>' +
            '</div>' +
            ' </div>' +
            '<div class="form-group">' +
            ' <label class="col-sm-2 col-sm-2 control-label">' +
            'Rooms:' +
            ' </label>' +
            '<div class="col-sm-10" id="roomlist_inner">' +
            ' <select class="btn btn-theme03" id="roomlist"> ' +
            ' </select>' +
            '</div>' +
            ' </div> ' +
            '<div class="form-group">' +
            ' <label class="col-md-2 control-label">What kind of beds are available in this room?</label>' +
            '<div class="col-md-8">' +
            '<span id="bed_content">' +
            '</span>' +
            '</div>' +
            ' </div>' +
            '<div class="form-group">' +
            ' <label class="col-sm-2 col-sm-2 control-label">How many people can  stay here?</label>' +
            '<div class="col-sm-10">' +
            ' <select class="btn btn-theme03" id="personCount">' +
            '<option value="1">1</option><option value="2">2</option>' +
            ' <option value="3">3</option><option value="4">4</option>' +
            '<option value="5">5</option>' +
            ' </select>' +
            '</div>' +
            ' </div>' +
            '<div class="form-group">' +
            ' <label class="col-sm-2 col-sm-2 control-label">' +
            'Would you provide with  additional bed?' +
            ' </label>' +
            '<div class="col-sm-10">' +
            ' <input  type="radio" name="radio" value="1" onchange="refreshBedWindow(this.value)" /> Yes' +
            ' <input type="radio" name="radio" value="0" onchange="refreshBedWindow(this.value)"/>No' +
            '</div>' +
            ' </div>' +
            '<div id="bed_window" style="display: none">' +
            ' <div class="form-group" >' +
            '<label class="col-sm-2 col-sm-2 control-label">How many additional bed do you provide ?</label>' +
            ' <div class="col-sm-10">' +
            '<select class="btn btn-theme03" id="additionalbedCount"> ' +
            ' <option value="1">1</option><option value="2">2</option>' +
            '<option value="3">3</option>' +
            ' </select>' +
            '</div>' +
            ' </div>' +
            '<div class="form-group" >' +
            ' <label class="col-sm-2 col-sm-2 control-label">Which max age can be stay in these beds?</label>' +
            '<select class="btn btn-theme03" id="maxAgeInAdditionalBed"> ' +
            ' <option value="1">1</option>' +
            '<option value="2">2</option>' +
            ' <option value="3">3</option>' +
            '</select> ' +
            ' </div>' +
            '</div>' +
//           '<div id="sanatoriumRoomRel"></div>'+
            '<div class="form-group" >' +
            '<label class="col-sm-2 col-sm-2 control-label">General information</label>' +
            '<textarea id="general_info"></textarea>' +
            ' </div>' +
            '<div class="form-group" >' +
            '<label class="col-sm-2 col-sm-2 control-label">Size:</label>' +
            '<input type="text" id="area"/>' +
            ' </div>' +
            buttonAdd +
            ' </div>';
}

function getGUIforRoomUpdating(id) {

    var buttonSave = '<button class="btn btn-info" onclick="updateRoom(' + id + ')">Save</button>';
    var linkBack = '<button type="button" class="badge bg-success" onclick="loadRoomsOfSanatorium(1)" >Back</button>';

    return  '<h4><i class="fa fa-angle-right"></i>Edit</h4>' +
            linkBack + "<br>" +
            '<div class="form-horizontal style-form" > <div class="form-group">' +
            '<label class="col-sm-2 col-sm-2 control-label">Roomtype:</label>' +
            ' <div class="col-sm-10">' +
            '<select class="btn btn-theme03" id="roomtypelist" onchange="loadRooms(this.value)"> ' +
            ' </select>' +
            '</div>' +
            ' </div>' +
            '<div class="form-group">' +
            ' <label class="col-sm-2 col-sm-2 control-label">' +
            'Rooms:' +
            ' </label>' +
            '<div class="col-sm-10">' +
            ' <select class="btn btn-theme03" id="roomlist"> ' +
            ' </select>' +
            '</div>' +
            ' </div> ' +
            '<div class="form-group">' +
            ' <label class="col-md-2 control-label">What kind of beds are available in this room?</label>' +
            '<div class="col-md-8">' +
            '<span id="bed_content">' +
            '</span>' +
            '</div>' +
            ' </div>' +
            '<span id="sanatoriumRoomRel"></span>' +
//            buttonSave +
            ' </div>';
}

function loadRoomWindowForAdding() {
    var gui = getGUIforRoomAdding();
    document.getElementById("content-refresh").innerHTML = gui;
    loadRoomtypes(0);
    loadRooms(0, 0);
    loadBedtypes(0, 0);
//    loadSanatoriumRoomRel(0);

//  

}

function loadRoomWindowForUpdating(sanatoriumRoomRelId, roomTypeId, roomId) {
    selectedSanatoriumRoomRelId = sanatoriumRoomRelId;
    selectedRoomId = roomId;
    var gui = getGUIforRoomUpdating(sanatoriumRoomRelId);
    document.getElementById("content-refresh").innerHTML = gui;

    loadRoomtypes(roomTypeId);
    loadRooms(roomTypeId, selectedRoomId);
    loadBedTypesOfSanatorium(1);

    loadSanatoriumRoomRelforRooms(sanatoriumRoomRelId);
}


function loadBedTypesOfSanatorium(sanatoriumId) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var data = JSON.parse(xhr.responseText);
            for (i = 0; i < data.length; i++) {
                loadBedtypes(data[i].bedTypeId.id, data[i].count);
            }
        }
    }

//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatoriumrooms/" + sanatoriumId + "/bedtypes", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function loadRooms(roomTypeId, selectedRoomId) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var result = getGUIforRoomsCombobox(xhr.responseText, selectedRoomId);
            document.getElementById("roomlist").innerHTML = result;
        }
    }

//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/roomtypes/" + roomTypeId + "/rooms", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function loadRoomsOfSanatorium(sanatoriumId) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)

        {    //bu resulti goturub hemin profa menimset
            var result = getGUIforRooms(xhr.responseText);
            document.getElementById("content-refresh").innerHTML = result;
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatoriums/" + sanatoriumId + "/sanatoriumrooms", true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function getGUIforRooms(response) {
    var data = JSON.parse(response);
//    var btnAdd = '<td><button class="btn btn-primary btn-xs"  onclick="loadRoomWindowForAdding()"><i class="fa fa-pencil"></i>Add</button></td>';
    var btnAdd = '<td><button class="btn btn-primary btn-xs"  id="addButton"><i class="fa fa-pencil"></i>Add</button></td>';
     
    var result;
    result += btnAdd;
    result +=
            '<table class="table table-striped table-condensed table-hover">' +
            '<thead >' +
            '<tr>' +
            '<th >' + "Room type" + '</th>' +
            '<th >' + "Room name" + '</th>' +
            '<th >' + "Area" + '</th>' +
            '<th >' + "General" + '</th>' +
            '<th >' + "Person Count" + '</th>' +
            '<th >' + "Additional bed count" + '</th>' +
            '<th >' + "Max age in additional bed" + '</th>' +
            '<th colspan="2"></th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

    for (i = 0; i < data.length; i++) {

        result += '<tr>' +
                '<td>' + data[i].room.roomType.name + '</td>' +
                '<td>' + data[i].room.name + '</td>' +
                '<td>' + data[i].area + '</td>' +
                '<td>' + data[i].general + '</td>' +
                '<td>' + data[i].personCount + '</td>' +
                '<td>' + data[i].additionalBedCount + '</td>' +
                '<td>' + data[i].maxAgeInAdditionalBed + '</td>' +
                '<td><button class="btn btn-primary btn-xs" onclick="loadRoomWindowForUpdating(' + data[i].id + ',' + 0 + ',' + data[i].room.id + ')"><i class="fa fa-pencil"></i></button></td>' +
                '<td><button class="btn btn-danger btn-xs"  onclick="deleteRoom(' + data[i].id + ')" ><i class="fa fa-trash-o "></i></button></td>' +
                '</tr>';
    }
    result += '</tbody>' +
            '</table>';
  
    return result;
  document.getElementById("addButton").onclick = function () {
        location.href = "www.yoursite.com";
    };
}


function loadRoomtypes(id) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)

        {
            var result = getGUIforRoomtypeCombobox(xhr.responseText, id);
            document.getElementById("roomtypelist").innerHTML = result;

        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/roomtypes", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function loadBedtypes(id, count) {
    var xhr = new XMLHttpRequest();
    var data = {};

    xhr.onreadystatechange = function ()

    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var result = getGUIforBedTypesCombobox(xhr.responseText, id, count);
            document.getElementById("bed_content").innerHTML += "<br/>" + "<br/>" + result;
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/bedtypes", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
}

function loadSanatoriumRoomRelforRooms(id) {
    var xhr = new XMLHttpRequest();
    var data = {};

    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {

            var result = getGUIforSanatoriumRoomRelCombobox(xhr.responseText, id);
            document.getElementById("sanatoriumRoomRel").innerHTML = result;

        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatoriumrooms/" + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();

}

function loadSanatoriumRoomRel(id, amenity) {
    var xhr = new XMLHttpRequest();
    var data = {};

    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            if (!amenity) {
                var result = getGUIforSanatoriumRoomRelCombobox(xhr.responseText, id);
                document.getElementById("sanatoriumRoomRel").innerHTML = result;
            }
            if (amenity) {
                loadAmenityWindow(xhr.responseText);
            }
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatoriumrooms/" + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}


function loadSanatoriumRoomRelByAmenityId(id, amenityId) {
    var xhr = new XMLHttpRequest();
    var data = {};

    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var result = getGUIforSanatoriumRoomRelCombobox(xhr.responseText, id);
            document.getElementById("sanatoriumRoomRel").innerHTML = result;

        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatoriumrooms/" + id + "?amenityid=" + amenityId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}



function loadProfessionalisms(id) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)

        {    //bu resulti goturub hemin profa menimset
            var result = getGUIforProfessionalismCombobox(xhr.responseText, id);
            document.getElementById("prof").innerHTML = result;
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/doctors/professionalisms", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function loadSpecialty(id) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)

        {    //bu resulti goturub hemin profa menimset
            var result = getGUIforSpecialtyCombobox(xhr.responseText, id);
            document.getElementById("special").innerHTML = result;
        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/doctors/specialties", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}


function addSanatoriumSubtreatmentRel() {
 
    var subtreatments = [];
    var allSubtretments = $("input[name='subtreatment']");
    for (i = 0; i < allSubtretments.length; i++) {

        if (allSubtretments[i].checked) {
            subtreatments.push({
                subtreatment:{
                    id:allSubtretments[i].value
                }
            });//value yeni id bunu ozumuz yazdiq bayaq
        }
    } 
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            loadTreatments();
            alert(xhr.responseText);
        }
    }
    
    xhr.open("PUT", "http://localhost:8080/SanatoriumAPI/sanatoriums/1/subtreatments", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
//    alert(JSON.stringify(data));
    xhr.send(JSON.stringify(subtreatments));
}

function addSanatoriumSubillnessRel() {

    var subillnesses = [];
    var allSubillnesses = $("input[name='subillness']");
    for (i = 0; i < allSubillnesses.length; i++) {

        if (allSubillnesses[i].checked) {
            subillnesses.push(
                    {
                        subillness: {
                            id: allSubillnesses[i].value
                        }
                    });//value yeni id bunu ozumuz yazdiq bayaq
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            loadIllnesses();
            alert(xhr.responseText);
        }
    }
    console.log(JSON.stringify(subillnesses));
    xhr.open("PUT", "http://localhost:8080/SanatoriumAPI/sanatoriums/1/sanatoriumsubillnesses", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.send(JSON.stringify(subillnesses));
}

function addSanatoriumSubfunRel() {
 
    var subfuns = [];
    var allSubfuns = $("input[name='subfun']");
    for (i = 0; i < allSubfuns.length; i++) {

        if (allSubfuns[i].checked) {
            subfuns.push({
                subfun:{
                    id:allSubfuns[i].value
                }
            });//value yeni id bunu ozumuz yazdiq bayaq
        }
    } 

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            loadFuns();
            alert(xhr.responseText);
        }
    }
    console.log(JSON.stringify(subfuns));
    xhr.open("PUT", "http://localhost:8080/SanatoriumAPI/sanatoriums/1/sanatoriumsubfuns", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
//    alert(JSON.stringify(data));
    xhr.send(JSON.stringify(subfuns));
}

function addSanatoriumTravelCategoryRel() {
    var data = {};
    data["sanatoriumId"] = selectedSanatoriumId;

    var travelCategorys = [];
    var allTravelCategorys = $("input[name='travelCategorys']");
    for (i = 0; i < allTravelCategorys.length; i++) {

        if (allTravelCategorys[i].checked) {
            travelCategorys.push(allTravelCategorys[i].value);
        }
    }
    data["travelCategorys"] = travelCategorys;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            loadAbout();
            alert(xhr.responseText);
        }
    }
    console.log(JSON.stringify(data));
    xhr.open("POST", "http://localhost:8080/SanatoriumAPI/sanatoriumtravelcategories/refresh", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
//    alert(JSON.stringify(data));
    xhr.send(JSON.stringify(data));
}


//seasons
function loadSeasons(travelCategoryId) {
    selectedTravelCategoryId = travelCategoryId;
    document.getElementById("content-refresh").innerHTML = '';

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var gui = getGUIforSeason(xhr.responseText);
            document.getElementById("content-refresh").innerHTML = gui;

        }
    }

    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatoriumtravelcategories/" + travelCategoryId + "/seasons", true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
}

function loadSeasonUpdate(seasonId) {
    document.getElementById("content-refresh").innerHTML = '';
    var xhr = new XMLHttpRequest();


    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)

        {
            getGUIforSeasonUpdating(xhr.responseText);
        }
    }
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/seasons/" + seasonId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
}

function getGUIforSeasonUpdating(response) {

    if (typeof response === 'undefined') {
        return;
    }

    var data = JSON.parse(response);

    var linkBack = '<button type="button" class="badge bg-success" onclick="loadSeasons(' +
            selectedTravelCategoryId
            + ' )" >Back</button>';

    var labelBegin = '<label class="col-sm-2 col-sm-2 control-label">Begin time:</label>';
    var labelEnd = '<label class="col-sm-2 col-sm-2 control-label">End time:</label>';


    var inputBegin = '<input type="text" class="form-control" id ="season_begin_date"" value="' + data.beginDate + '">';
    var inputEnd = '<input type="text" class="form-control" id ="season_end_date" value="' + data.endDate + '">';

    var inputId = '<input type="hidden" id="season_id" value="' + data.id + '">';
    var btnSave = '<button class="btn btn-info" onclick="updateSeason()">Save</button>';
    var result = '';

    result += '<h4><i class="fa fa-angle-right"></i>Edit</h4>' +
            linkBack + "<br>" +
            inputId + "<br>" +
            '<div class="form-group">' + labelBegin +
            '<div class="col-sm-10">' + inputBegin + '</div>' + '</div>' + "<br>" +
            '<div class="form-group">' + labelEnd +
            '<div class="col-sm-10">' + inputEnd + '</div>' + '</div>' + "<br>" +
            btnSave + "<br>";


    document.getElementById("content-refresh").innerHTML = result;

    return result;
}

function getGUIforSeason(response) {
    var data = JSON.parse(response);
    var result = '';
    var labelBegin = '<label class="col-sm-2 col-sm-2 control-label">Begin time:</label>';
    var labelEnd = '<label class="col-sm-2 col-sm-2 control-label">End time:</label>';
    var button = '<button class="btn btn-info" onclick="addSeason(' + data.id + ')">Add</button>';

    var inputBeginDate = '<input type="text" class="form-control" id ="season_begin_date"/>';
    var inputEndDate = '<input type="text" class="form-control" id ="season_end_date" />';

    result += '<div class="form-horizontal style-form">' +
            '<div class="form-group">' +
            labelBegin +
            '<div class="col-sm-10">' +
            inputBeginDate +
            '</div>' +
            '</div>' +
            '<div class="form-horizontal style-form">' +
            '<div class="form-group">' +
            labelEnd +
            '<div class="col-sm-10">' +
            inputEndDate + button +
            '</div>' +
            '</div>' +
            '<table class="table table-striped table-condensed table-hover">' +
            '<thead >' +
            '<tr>' +
            '<th >' + "BeginDate" + '</th>' +
            '<th >' + "EndDate" + '</th>' +
            '<th colspan="2"></th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

    for (i = 0; i < data.length; i++) {
        result += '<tr>' +
                '<td>' + data[i].beginDate + '</td>' +
                '<td>' + data[i].endDate + '</td>' +
                '<td><button class="btn btn-primary btn-xs"  onclick="loadSeasonUpdate(' + data[i].id + ')"><i class="fa fa-pencil"></i></button></td>' +
                '<td><button class="btn btn-danger btn-xs"  onclick="deleteSeason(' + data[i].id + ')" ><i class="fa fa-trash-o "></i></button></td>' +
                '</tr>';
    }
    result += '</tbody>' +
            '</table>';

    return result;
}

function updateSeason() {
    var data = {};
    var seasonId = document.getElementById("season_id").value;
    data["beginDate"] = document.getElementById("season_begin_date").value;
    data["endDate"] = document.getElementById("season_end_date").value;


    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            alert(xhr.responseText);
            loadSeasons(selectedTravelCategoryId);
        }
    }
    xhr.open("PUT", "http://localhost:8080/SanatoriumAPI/seasons/" + seasonId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(data));
}

function addSeason() {

    var data = {};

    data["sanatoriumTravelCategoryRelId"] = {"id": selectedTravelCategoryId};//burasi aydin dir yeqin ki  yox
    data["beginDate"] = document.getElementById("season_begin_date").value;
    data["endDate"] = document.getElementById("season_end_date").value;

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()

    {
        if (xhr.readyState == 4 && xhr.status == 200)

        {
            alert(xhr.responseText);
            loadSeasons(selectedTravelCategoryId);
        }
    }

    xhr.open("POST", "http://localhost:8080/SanatoriumAPI/seasons", true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(data));
}

function deleteSeason(seasonId) {

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {

            alert(xhr.responseText);
            loadSeasons(selectedTravelCategoryId);

        }
    }

    xhr.open("DELETE", "http://localhost:8080/SanatoriumAPI/seasons/" + seasonId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
}


//packets

function loadPackets(travelCategoryId) {
    selectedTravelCategoryId = travelCategoryId;
    document.getElementById("content-refresh").innerHTML = '';

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()

    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            var gui = getGUIforPacket(xhr.responseText);
            document.getElementById("content-refresh").innerHTML = gui;

        }
    }

    //ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatoriumtravelcategories/" + travelCategoryId + "/packets", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function loadPacketUpdate(packetId) {
    document.getElementById("content-refresh").innerHTML = '';
    var xhr = new XMLHttpRequest();


    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)

        {
            var gui = getGUIforPacketUpdating(xhr.responseText);
            document.getElementById("content-refresh").innerHTML = gui;

        }
    }
//ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/packets/" + packetId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function getGUIforPacketUpdating(response) {

    if (typeof response === 'undefined') {
        return;
    }

    var data = JSON.parse(response);

    var linkBack = '<button type="button" class="badge bg-success" onclick="loadPackets(' + selectedTravelCategoryId + ' )" >Back</button>';
    var labelDayCount = '<label class="col-sm-2 col-sm-2 control-label">Day count:</label>';
    var inputDayCount = '<input type="text" class="form-control" id ="packet_day_count"" value="' + data.dayCount + '">';


    var inputId = '<input type="hidden" id="packet_id" value="' + data.id + '">';
    var btnSave = '<button class="btn btn-info" onclick="updatePacket()">Save</button>';
    var result = '';

    result += '<h4><i class="fa fa-angle-right"></i>Edit</h4>' +
            linkBack + "<br>" +
            inputId + "<br>" +
            '<div class="form-group">' + labelDayCount +
            '<div class="col-sm-10">' + inputDayCount + '</div>' + '</div>' + "<br>" +
            btnSave + "<br>";



    return result;
}

function getGUIforPacket(response) {
    var data = JSON.parse(response);
    var result = '';
    var labelDay = '<label class="col-sm-2 col-sm-2 control-label">Enter a day:</label>';
    var button = '<button class="btn btn-info" onclick="addPacket(' + data.id + ')">Ok</button>';
    var inputDay = '<input type="text" class="form-control" id ="packet_day_count"/>';

    result += '<div class="form-horizontal style-form">' +
            '<div class="form-group">' +
            labelDay +
            '<div class="col-sm-10">' +
            inputDay + button +
            '</div>' +
            '</div>' +
            '<table class="table table-striped table-condensed table-hover">' +
            '<thead >' +
            '<tr>' +
            '<th >' + "Day Count" + '</th>' +
            '<th colspan="2"></th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

    for (var i = 0; i < data.length; i++) {
        result += '<tr>' +
                '<td>' + data[i].dayCount + '</td>' +
                '<td><button class="btn btn-primary btn-xs"  onclick="loadPacketUpdate(' + data[i].id + ')"><i class="fa fa-pencil"></i></button></td>' +
                '<td><button class="btn btn-danger btn-xs"  onclick="deletePacket(' + data[i].id + ')" ><i class="fa fa-trash-o "></i></button></td>' +
                '</tr>';
    }
    result += '</tbody>' +
            '</table>';

    return result;
}

function updatePacket() {
    var data = {};
    var packetId = document.getElementById("packet_id").value;
    data["dayCount"] = document.getElementById("packet_day_count").value;


    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            alert(xhr.responseText);
            loadPackets(selectedTravelCategoryId);
        }
    }
    xhr.open("PUT", "http://localhost:8080/SanatoriumAPI/packets/" + packetId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(data));
}

function addPacket() {
    var data = {};

    data["sanatoriumTravelCategoryRelId"] = {"id": selectedTravelCategoryId};//burasi aydin dir yeqin ki  yox
    data["dayCount"] = document.getElementById("packet_day_count").value;

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()

    {
        if (xhr.readyState == 4 && xhr.status == 200)

        {
            alert(xhr.responseText);
            loadPackets(selectedTravelCategoryId);
        }
    }

    xhr.open("POST", "http://localhost:8080/SanatoriumAPI/packets", true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(data));
}

function deletePacket(packetId) {

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {

            alert(xhr.responseText);
            loadPackets(selectedTravelCategoryId);

        }
    }

    xhr.open("DELETE", "http://localhost:8080/SanatoriumAPI/packets/" + packetId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
}



//amenity

function loadAmenityWindow(roomsResp) {
    alert(roomsResp);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()

    {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            var gui = getGUIforAmenities(xhr.responseText, roomsResp);
            document.getElementById("content-refresh").innerHTML = gui;

        }
    }

    //ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/amenitytypes", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function loadAmenitySanRoomRel(id) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()

    {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            var gui = getGUIforAmenities(xhr.responseText);
            document.getElementById("content-refresh").innerHTML = gui;
//            loadRoomtypes(1);
        }
    }

    //ashagidaki linke post methodu ile muraciet edir
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatoriumrooms/" + id + "/amenities", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send();
}

function getGUIforAmenities(response, roomsResp) {

    var data = JSON.parse(response);
    var roomWdgt = '';
    var roomsData = JSON.parse(roomsResp);

    for (k = 0; k < roomsData.length; k++) {
        alert(roomsData[k].roomId.name);
        roomWdgt += '<input type="checkbox"/>' + roomsData[k].roomId.name;
    }

    var result = '<h4><i class="fa fa-angle-right"></i>Facilities of rooms</h4><hr>';
    result += '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';

    for (i = 0; i < data.length; i++) {

        result += '<div class="panel panel-default">' +
                '<div class="panel-heading" role="tab" id="heading' + i + '">' +
                '<h4 class="panel-title">' +
                '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '" class="collapsed">' +
                data[i].name +
                '</a>' +
                '</h4>' +
                '</div>' +
                '<div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '">' +
                '<div class="panel-body" data-spy="scroll">';
        for (j = 0; j < data[i].amenities.length; j++) {
            result += '<div class="form-group">' +
                    ' <label class="col-sm-2 col-sm-2 control-label">' +
                    data[i].amenities[j].name +
                    ' </label>' +
                    '<div class="col-sm-10">' +
                    ' <input type="radio" name="radio" value="0" onchange="refreshRoomWindow(this.value)" /> All room' +
                    ' <input type="radio" name="radio" value="1" onchange="refreshRoomWindow(' + data[i].amenities[j].id + ')"/>Some rooms' +
                    '</div>' +
                    '</div> ' +
                    '<div id="room_window" style="display: none">' +
                    '<div id="roomtypes">' + roomWdgt + '</div>' +
                    '</div>';
        }
        result += '</div>' +
                '</div>' +
                '</div>';
    }
    result += '</div>';

    return result;
}

function refreshRoomWindow(value) {
    if (value == 1)
    {
        document.getElementById("room_window").style.display = '';
    } else if (value == 0)

    {
        document.getElementById("room_window").style.display = 'none';
    }
}

function checkRoomtypes(response) {
    var data = JSON.parse(response);
    for (i = 0; i < data.length; i++) {
        document.getElementById("roomtypes_" + data[i].roomTypeId.id).setAttribute("checked", "true");
    }
}

function getGUIforRoomtypes(response) {
    var result = "";
    var button = '<button class="btn btn-round btn-success" onclick="addSanatoriumAmenityRel()">Save checkbox</button>';

    var roomtypes = JSON.parse(response);
    for (i = 0; i < roomtypes.length; i++) {
        result += '<input type="checkbox" name="roomtypes" value=' + roomtypes[i].roomId.roomTypeId.id + ' id=' + "roomtypes_" + roomtypes [i].roomId.roomTypeId.id + ' >' + roomtypes [i].roomId.roomTypeId.name + '</input><br/>';
    }
    result += button;
    return result;
}

function addSanatoriumAmenityRel() {
    var data = {};
    data["sanatoriumId"] = selectedSanatoriumId;

    var roomtypes = [];
    var allRoomtypes = $("input[name='roomtypes']");
    for (i = 0; i < allRoomtypes.length; i++) {

        if (allRoomtypes[i].checked) {
            roomtypes.push(allRoomtypes[i].value);
        }
    }
    data["roomtypes"] = roomtypes;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {

            alert(xhr.responseText);
        }
    }
    console.log(JSON.stringify(data));
    xhr.open("POST", "http://localhost:8080/SanatoriumAPI/sanatoriumamenityrels/refresh", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
//    alert(JSON.stringify(data));
    xhr.send(JSON.stringify(data));
}

function loadRoomTypesOfSanatorium(sanatoriumId) {
    var data = {};
    var sanatorium = {};
    sanatorium["id"] = sanatoriumId;
    data["sanatorium"] = sanatorium;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            checkRoomtypes(xhr.responseText);
        }
    }
    xhr.open("GET", "http://localhost:8080/SanatoriumAPI/sanatorium/" + sanatoriumId + "/sanatoriumamenityrels", true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
}



