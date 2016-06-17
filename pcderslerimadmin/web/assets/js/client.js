////gui methods
//function getGUIforGeneralInformationDocumentTypes() {
//    var link2 = '<a href="#" onclick="loadDocuments(2)">Document 1</a>';
//    var link3 = '<a href="#" onclick="loadDocuments(3)">Document 2</a>';
//    var link4 = '<a href="#" onclick="loadDocuments(4)">Document 3</a>';
//    var result = link2 + "<br>" + link3 + "<br>" + link4 + "<br>";
//    return result;
//}
//
//function getGUIReviews(response) {
//// var xhr = new XMLHttpRequest();
//    var data = JSON.parse(response);
//    var result = 
//               '<div class="col-md-12">' +
//                    '<div class="content-panel" >' +
//                        '<h4><i class="fa fa-angle-right"></i>Reviews</h4>' +
//                        '<hr>'+
//                        '<table id="review"> ' +
//                            '<thead >' +
//                                '<tr>' +
//                                    '<th  style="text-align:center">' + "Email" + '</th>' +
//                                    '<th style="text-align:center">' + "Positive" + '</th>' +
//                                    '<th style="text-align:center">' + "Negative" + '</th>' +
//                                    '<th style="text-align:center">' + "Point" + '</th>' +
//                                    '<th style="text-align:center">' + "Write_date" + '</th>' +
//                                    '<th style="text-align:center">' + "Reply" + '</th>' +
//                                    '<th style="text-align:center">' + "Reply_date" + '</th>' +
//                                    '<th style="text-align:center">' + "Activation_date" + '</th>' +
//                                    
//                                '</tr>' +
//                            '</thead>';
//                            result +='<tbody>';
//                            for (i = 0; i < data.length; i++) {
//                                var replyText = '';
//                                if (data[i].reply) {
//                                    replyText = data[i].reply;
//                                }
//
//                            result +=
//                            '<tr>'+
//                                '<td id="user_email" >' + data[i].userId.email + '</td>' +
//                                '<td id="review_positivereview" >' + data[i].positivereview + '</td>' +
//                                '<td id="review_negativereview"> ' + data[i].negativereview + '</td>' +
//                                '<td id="review_point"> ' + data[i].point + '</td>' +
//                                '<td id="review_write_date">' + data[i].writeDate + '</td>' +
//                                '<td id="review_reply"> ' + replyText + '</td>' +
//                                '<td id="review_reply_date" >' + data[i].replyDate + '</td>' +
//                                '<td id="review_activation_date" >' + data[i].activationDate + '</td>' +
//                                
//                            '</tr>';
//                            }
//                            
//        result += '</tbody></table>' +
//                '</div>'+
//            '</div>';
//    return result;
//}
//
//function getGUISanatoriumMedia(response) {
//// var xhr = new XMLHttpRequest();
//    var data = JSON.parse(response);
//    //var data = JSON.parse(xhr.responseText);
//    var result = "";
//    for (i = 0; i < data.length; i++) {
//        //' <div class="col-sm-10"><input type="text" class="form-control" id="media_name" value="' + data[i].name + '"></div>'
//        var inputName = '<div id="media_name">' + data[i].name + '</div>';
//        result += inputName;
//    }
//    return result;
//}
//
//function getGUIforDoctors(response) {
//// var xhr = new XMLHttpRequest();
//    var data = JSON.parse(response);
//   
//
//    var result =
//            '<div class="col-md-12">'+
//            '<div class="content-panel">'+
//            '<h4><i class="fa fa-angle-right"></i>Doctors</h4>' +
//          
//            '<hr>'+
//            '<table class="table table-striped table-condensed table-hover" id="doctor"> ' +
//            '<thead >' +
//            '<tr>' +
//            '<th >' + "Image" + '</th>' +
//            '<th >' + "Name" + '</th>' +
//            '<th >' + "Surname" + '</th>' +
//            '<th >' + "Fathername" + '</th>' +
//            '<th >' + "Specialty" + '</th>' +
//            '<th >' + "Level" + '</th>' +
//            
//            '</tr>' +
//            '</thead>'+
//            '<tbody>';
//            for (i = 0; i < data.length; i++) {
//                var inputName = '<td id="doctor_name">' + data[i].name + '</td>';
//                var inputSurname = '<td id="doctor_surname">' + data[i].surname + '</td>';
//                var inputFatherName = '<td id="doctor_fathername">' + data[i].fathername + '</td>';
//                var inputImage = '<td id="doctor_image">' + data[i].image + '</td>';
//                var inputSpecialtyName = '<td id="specialty_name" >' + data[i].specialtyId.name + '</td>';
//                var inputLevel = '<td id="doctor_profesionalism_level_level" >' + data[i].professionalismId.level + '</td>';
//                
//
//                result += 
//                        '<tr style="background-color:white" >' +
//                            inputImage + 
//                            inputName + 
//                            inputFatherName + 
//                            inputSurname + 
//                            inputSpecialtyName +
//                            inputLevel + 
//                           
//                        '</tr>';
//            }
//    result += 
//            '</tbody>'+
//            '</table>'+
//            '</div>'+
//            '</div>';
//
//    document.getElementById("content-refresh").innerHTML = result;
//    return result;
//}
//
//
//
//function getGUIforRooms(response) {
//// var xhr = new XMLHttpRequest();
//    var data = JSON.parse(response);
//        
// var result = '<h4><i class="fa fa-angle-right"></i>Rooms</h4>' +
//          
//            '<table class="table table-striped table-advance table-hover  table-bordered" >' +
//            '<thead>' +
//            '<tr>' +
//            '<th >' + "Area" + '</th>' +
//            '<th>' + "General" + '</th>' +
//            '<th >' + "Type" + '</th>' +
//            '<th colspan="2">' + '</th>' +
//            '</tr>' +
//            '</thead>';
//    for (i = 0; i < data.length; i++) {
//
//        var inputArea = '<td id="sanatorium_roomtype_rel_area">' + data[i].area + '</td>';
//        var inputGeneral = '<td id="sanatorium_roomtype_rel_general">' + data[i].general + '</td>';
//        var inputRoomtypeName = '<td  id="roomtype_name">' + data[i].roomTypeId.name + '</td>';
//
//        result += '<tr style="background-color:white" >' +
//                inputArea + inputGeneral + inputRoomtypeName +
//                '</tr>';
//    }
//    result += '</table>';
//
//    document.getElementById("content-refresh").innerHTML = result;
//    return result;
//}
//
//function getGUIforTreatmentProgram() {
//    var link2 = '<a href="#" onclick="loadTreatmentProgram(1)" >Treatement Program 1</a>';
//    var link3 = '<a href="#" onclick="loadTreatmentProgram(2)">Treatement Program 2</a>';
//    var link4 = '<a href="#" onclick="loadTreatmentProgram(3)">Treatement Program 3</a>';
//    var result = link2 + "<br>" + link3 + "<br>" + link4 + "<br>";
//    return result;
//}
//
//
//
//function getGUIforPackettypes(response) {
//    var result = "";
//
//    var packetTypes = JSON.parse(response);
//    for (i = 0; i < packetTypes.length; i++) {
//        result += '<input type="checkbox" value=' + packetTypes[i].id + ' id=' + "packettype_" + packetTypes[i].id + ' >' + packetTypes[i].name + '</input><br/>';
//    }
//    return result;
//}
//
//function getGUIforIllnesses(response) {
//    var data = JSON.parse(response);
//
//  var result = 
//          '<h4><i class="fa fa-angle-right"></i>Illnesses</h4>' +
//          '<hr>';
//
//    result += '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
//    for (i = 0; i < data.length; i++) {
////        var models = getGUIforModels(data[i].models, data[i].id);
//
//        result +=
//                '<div class="panel panel-default">' +
//                    '<div class="panel-heading" role="tab" id="heading' + i + '">' +
//                        '<h4 class="panel-title">' +
//                            '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '" class="collapsed">' +
//                                data[i].name +
//                            '</a>' +
//                        '</h4>' +
//                    '</div>' +
//                    '<div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '">' +
//                        '<div class="panel-body" data-spy="scroll">';
//                            for(j=0;j<data[i].subillnessList.length;j++){
//                                result +='<input type="checkbox" style="margin:0px 7px" id="subillness_'+data[i].subillnessList[j].id+'">'+data[i].subillnessList[j].name+'</input>';
//                            }
//                        result+='</div>' +
//                    '</div>' +
//                '</div>';
//    }
//    result += '</div>';
//     
//    return result;
//}
//
//function getGUIforTreatments(response) {
//
//  var data = JSON.parse(response);
//   
//  var result = 
//          '<h4><i class="fa fa-angle-right"></i>Treatments</h4>' +
//          '<hr>';
//
//    result += '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
//    for (i = 0; i < data.length; i++) {
//        result +=
//                '<div class="panel panel-default">' +
//                    '<div class="panel-heading" role="tab" id="heading' + i + '">' +
//                        '<h4 class="panel-title">' +
//                            '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '" class="collapsed">' +
//                                data[i].name +
//                            '</a>' +
//                        '</h4>' +
//                    '</div>' +
//                    '<div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '">' +
//                        '<div class="panel-body" data-spy="scroll">';
//                            for(j=0;j<data[i].subtreatmentList.length;j++){
//                                result +='<input type="checkbox" style="margin:0px 7px" id="subtreatment_'+data[i].subtreatmentList[j].id+'">'+data[i].subtreatmentList[j].name+'</input>';
//                            }
//                        result+='</div>' +
//                    '</div>' +
//                '</div>';
//    }
//    result += '</div>';
//     
//    return result;
//}
//
//function getGUIforAbout(response) {
//
//    var data = JSON.parse(response);
//
// //   var inputLabel = '<label class="col-sm-2 col-sm-2 control-label">Sanatorium:</label>';
//    var input = 'div id="sanatorium_name" >' + data[0].name + '</div>';
//
//    var areaLabel = '<label class="col-sm-2 col-sm-2 control-label">About:</label>';
//    var textArea = '<div id="sanatorium_about">' + data[0].about + '</div>';
//
//    var serviceLabel = '<label class="col-sm-2 col-sm-2 control-label">Which packet types does your sanatorium serve?</label>';
//
// 
//
//    var result =
//            '<div class="col-lg-12">' +
//                '<div class="form-panel">' +
//                    '<h4><i class="fa fa-angle-right"></i>Sanatorium</h4>' +
//                    '<div class="form-horizontal style-form">' +
//                        '<div class="form-group">' +
//                         //   inputLabel +
//                            '<div class="col-sm-10">' + 
//                                input + 
//                            '</div>' +
//                        '</div>' +
//                        '<div class="form-group">' +
//                            areaLabel +
//                            '<div class="col-sm-10">' +
//                                textArea +
//                            '</div>' +
//                        '</div>' +
//                        '<div class="form-group">' +
//                            serviceLabel +
//                            '<div class="col-sm-10" id="packettypes">' +
//                                //packet types must be shown here
//                            '</div>' +
//                        '</div>' +
//                    '</div>'+
//                  
//                '</div>'+
//            '</div>';
//
//    return result;
//
//}
//
//function getGUIforKlunaria(response) {
//    var data = JSON.parse(response);
//   
//    var labelAbout = "About:";
//    var textAreaAbout = '<div id="klunaria_about">' + data.about + '</div>';
//   
//    var result =
//            '<div class="col-lg-12">' +
//            '<div class="form-panel">' +
//            '<h4><i class="fa fa-angle-right"></i>Klunaria</h4>' +
//            '<div class="form-horizontal style-form">' +
//            '<div class="form-group">' +
//            '<label class="col-sm-2 col-sm-2 control-label">'+labelAbout+'</label>' +
//            '<div class="col-sm-10">' +
//            textAreaAbout+
//            '</div>' +
//            '</div>' +
//            '</div>' +
//            '</div>' +
//            '</div>';
//
//    return result;
//
//}
//
//function getGUIforFuns(response) {
////content-refresh() -div-in id-sidir
//
//  var data = JSON.parse(response);
//   
//  var result = 
//          '<h4><i class="fa fa-angle-right"></i>Funs</h4>' +
//          '<hr>';
//
//    result += '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
//    for (i = 0; i < data.length; i++) {
//        result +=
//                '<div class="panel panel-default">' +
//                    '<div class="panel-heading" role="tab" id="heading' + i + '">' +
//                        '<h4 class="panel-title">' +
//                            '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '" class="collapsed">' +
//                                data[i].name +
//                            '</a>' +
//                        '</h4>' +
//                    '</div>' +
//                    '<div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '">' +
//                        '<div class="panel-body" data-spy="scroll">';
//                            for(j=0;j<data[i].subfunList.length;j++){
//                                result +='<input type="checkbox" style="margin:0px 7px" id="subfun_'+data[i].subfunList[j].id+'">'+data[i].subfunList[j].name+'</input>';
//                            }
//                        result+='</div>' +
//                    '</div>' +
//                '</div>';
//    }
//   
//    result += '</div>';
//     
//    return result;
//}
//
//function getGUIforDocument(response, typeId) {
//    var data = JSON.parse(response);
//    var documentText = "";
//    if (data.name !== null) {
//        documentText = data.name;
//    }
//    var labelDocument = '<h4><i class="fa fa-angle-right"></i>Document content</h4>';
//    var inputName = '<div id="documents_name">' + documentText + '</div>';
//   
//
//    var result = labelDocument + "<br/>" + inputName + "<br>";
//    return result;
//}
//
//
////load methods
//
//function loadSubillnesss() {
//    var data = {};
//    var sanatorium = {};
//    sanatorium["id"] = "1";
//    data["sanatorium"] = sanatorium;
//    // construct an HTTP request
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            checkSubillnesss(xhr.responseText);
//        }
//    }
//    xhr.open("POST", "http://localhost:8080/rMsMaven/illnesses/subillnesses", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send(JSON.stringify(data));
//}
//
//function loadTreatments() {
//    document.getElementById("content-refresh").innerHTML = '';
//    // construct an HTTP request
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            //burda hemin muracietin neticesini alir ve gonderir loadTreatments funksiyasina
//            //netice json array dir
//            var gui = getGUIforTreatments(xhr.responseText);
//            document.getElementById("content-refresh").innerHTML = gui;
//            //indi ise hemin sanatoriyaya aid olan checkboxlar checked olmadlidir
//            loadSubtreatments();
//        }
//    }
////ashagidaki linke post methodu ile muraciet edir
//    xhr.open("GET", "http://localhost:8080/rMsMaven/treatments", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send();
//}
//
//function loadSubtreatments() {
//    var data = {};
//    var sanatorium = {};
//    sanatorium["id"] = "1";
//    data["sanatorium"] = sanatorium;
//    // construct an HTTP request
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        //status veziyyetdir ==4 tamamlanmaq demekdi ==1 olsa loading ve s. 
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            //neticeni gonderir bu funksiyaya
//            checkSubtreatments(xhr.responseText);
//        }
//    }
////bu gedir sanatoriuma aid olan subtreatmentleri goturur
//    xhr.open("POST", "http://localhost:8080/rMsMaven/treatments/subtreatments", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send(JSON.stringify(data));
//}
//
//function loadIllnesses() {
//    document.getElementById("content-refresh").innerHTML = '';
//    // construct an HTTP request
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            document.getElementById("content-refresh").innerHTML = getGUIforIllnesses(xhr.responseText);
//            loadSubillnesss();
//        }
//    }
//    xhr.open("GET", "http://localhost:8080/rMsMaven/illnesses", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send();
//}
//
//function loadKlunaria() {
//
//    var data = {};
//    var sanatorium = {};
//    sanatorium["id"] = 1;
//    data["sanatorium"] = sanatorium;
//    document.getElementById("content-refresh").innerHTML = '';
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            var gui = getGUIforKlunaria(xhr.responseText);
//            document.getElementById("content-refresh").innerHTML = gui;
//        }
//    }
//
//    xhr.open("POST", "http://localhost:8080/rMsMaven/klunaria", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    xhr.send(JSON.stringify(data));
//}
//
//function loadDocuments(typeId) {
////bu funksiya sadece service muraciet edir ve tip idye uygun neticeni goturur ve neticeni gonderiri
////getdui-ye o da hemin melumati emal edir ve geriye ekranda gorunmeli olan melumati return edir
//    var data = {};
//    var documentTypeId = {};
//    documentTypeId["id"] = typeId;
//    data["documentTypeId"] = documentTypeId;
//    document.getElementById("content-refresh").innerHTML = '';
//    // construct an HTTP request
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            var data = JSON.parse(xhr.responseText);
//            //burda parse edir hemin arrayi
//            var result = '';
//            if (typeId > 1) {
//                result += getGUIforGeneralInformationDocumentTypes();
//            }
//            result += getGUIforDocument(xhr.responseText, typeId);
//
//            document.getElementById("content-refresh").setAttribute('display', 'none');
//            document.getElementById("content-refresh").innerHTML = result;
//            document.getElementById("content-refresh").setAttribute('display', 'inline');
//        }
//    }
////ashagidaki linke post methodu ile muraciet edir
//    xhr.open("POST", "http://localhost:8080/rMsMaven/documents", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send(JSON.stringify(data));
//}
//
//function loadDocTypesForGeneralInformation() {
////sadece 3 linki cixaracaq
//    document.getElementById("content-refresh").innerHTML = '';
//    document.getElementById("content-refresh").innerHTML = getGUIforGeneralInformationDocumentTypes();
//}
//
//function loadTreatmentProgram(typeId) {
//    document.getElementById("content-refresh").innerHTML = '';
//    var result = getGUIforTreatmentProgram();
//    document.getElementById("content-refresh").innerHTML = result;
//}
//
//function loadDoctors() {
//    document.getElementById("content-refresh").innerHTML = '';
//    var xhr = new XMLHttpRequest();
//    var data = {};
//    var sanatorium = {};
//    sanatorium["id"] = 1;
//    data["sanatoriumId"] = sanatorium;
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            var result = getGUIforDoctors(xhr.responseText);
//            document.getElementById("content-refresh").setAttribute('display', 'none');
//            document.getElementById("content-refresh").innerHTML = result;
//            document.getElementById("content-refresh").setAttribute('display', 'inline');
//        }
//    }
////ashagidaki linke post methodu ile muraciet edir
//    xhr.open("POST", "http://localhost:8080/rMsMaven/doctors", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send(JSON.stringify(data));
//}
//
//function loadDoctor(doctorId) {
//    document.getElementById("content-refresh").innerHTML = '';
//    var xhr = new XMLHttpRequest();
//    var data = {};
//    var sanatorium = {};
//    sanatorium["id"] = 1;
//    data["sanatoriumId"] = sanatorium;
//    if (doctorId > 0) {
//        data["id"] = doctorId;
//    }
//
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//
//        {
//           
//        }
//    }
////ashagidaki linke post methodu ile muraciet edir
//    xhr.open("POST", "http://localhost:8080/rMsMaven/doctors", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send(JSON.stringify(data));
//}
//
//function loadSanatoriumMedia(mediaTypeId, categoryId) {
//    var data = {};
//    var category = {};
//    category["id"] = categoryId;
//    var mediaType = {};
//    mediaType["id"] = mediaTypeId;
//    var sanatorium = {};
//    sanatorium["id"] = "1";
//    data["sanatoriumId"] = sanatorium;
//    data["mediaTypeId"] = mediaType;
//    data["categoryId"] = category;
//    document.getElementById("content-refresh").innerHTML = '';
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            var result = getGUISanatoriumMedia(xhr.responseText);
//            document.getElementById("content-refresh").setAttribute('display', 'none');
//            document.getElementById("content-refresh").innerHTML = result;
//            document.getElementById("content-refresh").setAttribute('display', 'inline');
//        }
//    }
//
//    xhr.open("POST", "http://localhost:8080/rMsMaven/media", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send(JSON.stringify(data));
//}
//
//function loadReviews() {
//    var data = {};
//    var sanatorium = {};
//    sanatorium["id"] = 1;
//    data["sanatoriumId"] = sanatorium;
//    document.getElementById("content-refresh").innerHTML = '';
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            var result = getGUIReviews(xhr.responseText);
//            document.getElementById("content-refresh").setAttribute('display', 'none');
//            document.getElementById("content-refresh").innerHTML = result;
//            document.getElementById("content-refresh").setAttribute('display', 'inline');
//        }
//    }
////ashagidaki linke post methodu ile muraciet edir
//    xhr.open("POST", "http://localhost:8080/rMsMaven/review", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//
//    xhr.send(JSON.stringify(data));
//}
//
//
//function loadReview(reviewId) {
//    document.getElementById("content-refresh").innerHTML = '';
//    var xhr = new XMLHttpRequest();
//    var data = {};
//    data["id"] = reviewId;
//    var sanatorium = {};
//    sanatorium["id"] = 1;
//    data["sanatoriumId"] = sanatorium;
//
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            getGUIforReviewUpdating(xhr.responseText);
//        }
//    }
////ashagidaki linke post methodu ile muraciet edir
//    xhr.open("POST", "http://localhost:8080/rMsMaven/review", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send(JSON.stringify(data));
//}
//
//
//function loadAbout() {
//    document.getElementById("content-refresh").innerHTML = '';
//    data = {"id": 1};
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            var gui = getGUIforAbout(xhr.responseText);
//            document.getElementById("content-refresh").innerHTML = gui;
//            loadPacketTypes();
//        }
//    }
////ashagidaki linke post methodu ile muraciet edir
//    xhr.open("POST", "http://localhost:8080/rMsMaven/sanatorium", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send(JSON.stringify(data));
//}
//
//function loadPacketTypes() {
//    var data = {};
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            var gui = getGUIforPackettypes(xhr.responseText);
//            document.getElementById("packettypes").innerHTML = gui;
//            loadPacketTypesOfSanatorium(1);
//        }
//    }
////ashagidaki linke post methodu ile muraciet edir
//    xhr.open("POST", "http://localhost:8080/rMsMaven/packettypes", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send(JSON.stringify(data));
//}
//
//function loadPacketTypesOfSanatorium(sanatoriumId) {
//    var data = {};
//    var sanatorium = {};
//    sanatorium["id"] = sanatoriumId;
//    data["sanatorium"] = sanatorium;
//
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//         
//        }
//    }
////ashagidaki linke post methodu ile muraciet edir
//    xhr.open("POST", "http://localhost:8080/rMsMaven/packettypes", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send(JSON.stringify(data));
//}
//
//function loadFuns() {
//
//    document.getElementById("content-refresh").innerHTML = '';
//    // construct an HTTP request
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            
//            var gui = getGUIforFuns(xhr.responseText);
//            document.getElementById("content-refresh").innerHTML = gui;
//
//            loadSubfunsOfSanatorium();
//        }
//    }
////ashagidaki linke post methodu ile muraciet edir
//    xhr.open("GET", "http://localhost:8080/rMsMaven/funs", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send();
//}
//
//function loadSubfunsOfSanatorium() {
//    var data = {};
//    var sanatorium = {};
//    sanatorium["id"] = "1";
//    data["sanatorium"] = sanatorium;
//    // construct an HTTP request
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        //status veziyyetdir ==4 tamamlanmaq demekdi ==1 olsa loading ve s. 
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            //neticeni gonderir bu funksiyaya
//            checkSubfuns(xhr.responseText);
//        }
//    }
////bu gedir sanatoriuma aid olan subtreatmentleri goturur
//    xhr.open("POST", "http://localhost:8080/rMsMaven/funs/subfuns", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send(JSON.stringify(data));
//}
//
//function loadRooms() {
//    document.getElementById("content-refresh").innerHTML = '';
//    
//    var xhr = new XMLHttpRequest();
//   
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//        {
//            var result = getGUIforRooms(xhr.responseText);
//            document.getElementById("content-refresh").setAttribute('display', 'none');
//            document.getElementById("content-refresh").innerHTML = result;
//            document.getElementById("content-refresh").setAttribute('display', 'inline');
//        }
//    }
////ashagidaki linke post methodu ile muraciet edir
//    xhr.open("POST", "http://localhost:8080/rMsMaven/rooms", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send();
//}
//
//function loadRoom(roomId) {
//    document.getElementById("content-refresh").innerHTML = '';
//    var xhr = new XMLHttpRequest();
//    var data = {};
//    var sanatorium = {};
//    sanatorium["id"] = 1;
//    data["sanatoriumId"] = sanatorium;
//    data["id"] = roomId;
////    if (roomId > 0) {
////        data["id"] = roomId;
////    }
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//
//        {
//            getGUIforRoomUpdating(xhr.responseText);
//        }
//    }
////ashagidaki linke post methodu ile muraciet edir
//    xhr.open("POST", "http://localhost:8080/rMsMaven/rooms", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send(JSON.stringify(data));
//}
//
//function loadProfessionalisms(id) {
//
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//
//        {    //bu resulti goturub hemin profa menimset
//       //     var result = getGUIforProfessionalismCombobox(xhr.responseText, id);
//            document.getElementById("prof").innerHTML = result;
//        }
//    }
////ashagidaki linke post methodu ile muraciet edir
//    xhr.open("GET", "http://localhost:8080/rMsMaven/doctors/professionalisms", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send();
//}
//
//function loadSpecialty(id) {
//
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//
//        {    //bu resulti goturub hemin profa menimset
//            var result = getGUIforSpecialtyCombobox(xhr.responseText, id);
//            document.getElementById("special").innerHTML = result;
//        }
//    }
////ashagidaki linke post methodu ile muraciet edir
//    xhr.open("GET", "http://localhost:8080/rMsMaven/doctors/specialties", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send();
//}
//
//function loadRoomtype(id) {
//
//    var xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = function()
//    {
//        if (xhr.readyState == 4 && xhr.status == 200)
//
//        {
//            var result = getGUIforRoomtypeCombobox(xhr.responseText, id);
//            document.getElementById("type").innerHTML = result;
//        }
//    }
////ashagidaki linke post methodu ile muraciet edir
//    xhr.open("GET", "http://localhost:8080/rMsMaven/rooms/type", true);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    // send the collected data as JSON
//    xhr.send();
//}
//
//
