$(document).ready(function() {
	
	{		
		$('[id^=priority').each(function () {	
			var id = $(this).attr('id');
			var selected = parseInt($(this).find(":selected").text());
			$('[id^=priority').each(function(){			
				if($(this).attr('id') != id) {
					$(this).find("option").each(function () {
						if($(this).text() == selected && selected != 0) {
							$(this).attr('disabled', 'disabled');
						}
					});
				}
			});
		});
	}
	
	$("input[type='text']").each(function(e){
		$(this).val("");
	});
	
	$(".nav li").on("click", function() {
		$(".nav li").removeClass("active");
		$(this).addClass("active");
	});
	$(document).on("click","[id^=deleteRow]",function(e) {
		if (confirm("Are you sure you want to delete selected item(s)?")) {
			$.ajax({
				url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/SlotManagement',
				type : 'post',
				data : {
					'action' : 'delete',
					'course' : $(this).attr('course'),
					'slot' : $(this).attr('slot')
				},
				success : function(data) {
					giveAlert(data);
					location.reload();
				}
			});
		}
	});
	
	$(document).on("click","[id^=addCourse]",function(e) {
		$.ajax({
			url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/SlotManagement',
			type : 'post',
			data : {
				'action' : 'add',
				'course' : $(this).attr('course'),
				'slot' : $(this).attr('slot')
			},
			success : function(data) {
				giveAlert(data);
				location.reload();
			}
		});
	});
	$("#generateAndDownloadTT").click(function(e) {
		var name = $("#generateAndDownloadTT").html();
		$("#generateAndDownloadTT").html("Processing....");
		$("#generateAndDownloadTT").removeClass("btn-warning");
		$("#generateAndDownloadTT").addClass("btn-success");
		var sem = $('#exam_type').val();
		$.ajax({
			url : 'FileDownloadServlet',
			type : 'get',
			data : {'action':'generatett','semester':sem},
			success : function(data) {
				$("#generateAndDownloadTT").html(name);
				$("#generateAndDownloadTT").removeClass("btn-success");
				$("#generateAndDownloadTT").addClass("btn-warning");
				giveAlert(data);
				window.location.href='FileDownloadServlet?action=downloadtt';
			}
		});
	});
	function giveAlert(data){
		alert(data);
	}
	$('#uploadCourseDetail').click(function(){
			var form_data = new FormData();
			if(! ($('#courseDetails').prop('files')[0]==undefined) ) {
				form_data.append('file','examdetails');
				form_data.append('courseDetails',$('#courseDetails').prop('files')[0]);				
			}
			$.ajax({
				url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/FileUploadServlet',
				type : 'POST',
				contentType : false,
				processData : false,
				cache : false,
				data : form_data,
				success : function(data){
					giveAlert(data);
				}
			});
	});
	$('#uploadSlotDetail').click(function(){
		var form_data = new FormData();
		if(! ($('#slotDetails').prop('files')[0]==undefined) ) {
			form_data.append('slot_no',$('#slot_no').val());
			form_data.append('file','slotdetails');
			form_data.append('slotDetails',$('#slotDetails').prop('files')[0]);			
		}
		$.ajax({
			url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/FileUploadServlet',
			type : 'POST',
			contentType : false,
			processData : false,
			cache : false,
			data : form_data,
			success : function(data){
				alert(data);
			}
		});
});
	$("#registerCourse").click(function(e){
		var course_id = $('#course_id').val();
		var course_name = $('#course_name').val();
		var batch = $('#batch').val();
		var no_of_students = $('#no_of_students').val();
		var faculty = $('#faculty').val();
		$.ajax({
			url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/CourseServlet',
			type : 'post',
			data : {"action":"register","course_id":course_id,"course_name":course_name,"batch":batch,"no_of_students":no_of_students,"faculty":faculty},
			success : function(data){
				giveAlert(data);
				location.reload();
			}
		});
	});
	$(document).on("click","[id^=editCourse]",function(e){
		var clicked = e.target.id || this.id;
		var course_id = $('#'+clicked).parent().parent().find('td:first').text();
		var course_name = $('#'+clicked).parent().parent().find('td:first').next().text();
		var batch = $('#'+clicked).parent().parent().find('td:first').next().next().attr('batchNo');
		var no_of_students = $('#'+clicked).parent().parent().find('td:first').next().next().next().text();
		var faculty_code = $('#'+clicked).parent().parent().find('td:first').next().next().next().next().text();
		$('#editCourseModalSpan').html(course_id+"-"+course_name);
		$('#edit_course_id').val(course_id);
		$('#edit_course_name').val(course_name);
		$('#edit_batch').val(batch);
		$('#edit_no_of_students').val(no_of_students);
		$('#edit_faculty').val(faculty_code);
	});
	$(document).on("click","[id^=editRoom]",function(e){
		var clicked = e.target.id || this.id;
		var room_no = $('#'+clicked).parent().parent().find('td:first').text();
		var capacity = $('#'+clicked).parent().parent().find('td:first').next().text();
		$('#editRoomModalSpan').html(room_no);
		$('#edit_room_no').val(room_no);
		$('#edit_capacity').val(capacity);
	});
	$(document).on("click","#updateCourseDetail",function(e){
		var course_id = $('#edit_course_id').val();
		var course_name = $('#edit_course_name').val();
		var batch = $('#edit_batch').val();
		var no_of_students = $('#edit_no_of_students').val();
		var faculty = $('#edit_faculty').val();
		$.ajax({
			url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/CourseServlet',
			type : 'post',
			data : {"action":"update","course_id":course_id,"course_name":course_name,"batch":batch,"no_of_students":no_of_students,"faculty":faculty},
			success : function(data){
				giveAlert(data);
				location.reload();
			}
		});
	});
	$(document).on("click","[id^=deleteCourse]",function(e){
		if (confirm("Are you sure you want to delete selected item(s)?")) {
			var clicked = e.target.id || this.id;
			var course_id = $(this).attr('course_id');
			$.ajax({
				url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/CourseServlet',
				type : 'post',
				data : {"action":"delete","course_id":course_id},
				success : function(data){
					giveAlert(data);
					location.reload();
				}
			});
		}
	});
	$(document).on("click","#removeAllCourses",function(e){
		if (confirm("Are you sure you want to delete selected item(s)?")) {
			$.ajax({
				url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/CourseServlet',
				type : 'post',
				data : {"action":"deleteallcourses"},
				success : function(data){
					giveAlert(data);
					location.reload();
				}
			});
		}
	});
	$(document).on("click","#addRoom",function(e){
		var room_no = $('#room_no').val();
		var capacity = $('#capacity').val();
		$.ajax({
			url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/RoomServlet',
			type : 'post',
			data : {"action":"register", "room_no":room_no, "capacity":capacity},
			success : function(data) {
				giveAlert(data);
				location.reload();
			}
		})
	});
	$(document).on("click","#updateRoomDetail",function(e){
		var room_no = $('#edit_room_no').val();
		var capacity = $('#edit_capacity').val();
		$.ajax({
			url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/RoomServlet',
			type : 'post',
			data : {"action":"update","room_no":room_no, "capacity":capacity},
			success : function(data){
				giveAlert(data);
				location.reload();
			}
		});
	});
	$(document).on("click","[id^=deleteRoom]",function(e){
		if (confirm("Are you sure you want to delete selected item(s)?")) {
			var clicked = e.target.id || this.id;
			var room_no = $(this).attr('room_no');
			$.ajax({
				url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/RoomServlet',
				type : 'post',
				data : {"action":"delete","room_no":room_no},
				success : function(data){
					giveAlert(data);
					location.reload();
				}
			});
		}
	});
	$(document).on("change","[id^=activateRoom]",function(e) {
		if (confirm("Are you sure you want to change the room status?")) {
			$.ajax({
				url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/RoomServlet',
				type : 'post',
				data : {
					'action' : 'activate',
					'room_no' : $(this).attr('room_no'),
					'status' : this.checked
				},
				success : function(data) {
					giveAlert(data);
					location.reload();
				}
			});
		}
	});
	$(document).on("click","#login",function(e){
		$.ajax({
			url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/LoginServlet',
			type : 'post',
			data : {"user":$('#user').val(),"password":$('#password').val()},
			success : function(data){
				if(data=="false"){
					giveAlert("Wrong Credentials !");
					location.reload();
				} else
					window.location.href = 'Home.jsp';
			}
		});
	});
	$(document).on("click","#userRegistration",function(e){
		$.ajax({
			url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/UserServlet',
			type : 'post',
			data : {"action":"userRegistration","uname":$('#uname').val(),"password":$('#password').val()},
			success : function(data){
				giveAlert(data);
				location.reload();
			}
		});
	});
	$(document).on("click","#resetPassword",function(e){
		$.ajax({
			url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/UserServlet',
			type : 'post',
			data : {"action":"resetPassword","uname":$('#uname').val(),"password":$('#password').val()},
			success : function(data){
				giveAlert(data);
				location.reload();
			}
		});
	});
	$(document).on("click","#mapbatchProgram",function(e){
		var batch_no = $('#batch_no').val();
		var program = $('#program').val();
		$.ajax({
			url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/BatchProgramServlet',
			type : 'post',
			data : {"action":"mapbatchprogram", "batch_no":batch_no, "program":program},
			success : function(data) {
				giveAlert(data);
				location.reload();
			}
		})
	});
	$(document).on("click","#updateBatchProgram",function(e){
		var batch_no = $('#edit_batch_no').val();
		var program = $('#edit_program').val();
		$.ajax({
			url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/BatchProgramServlet',
			type : 'post',
			data : {"action":"remapbatchprogram","batch_no":batch_no, "program":program},
			success : function(data){
				giveAlert(data);
				location.reload();
			}
		});
	});
	$(document).on("click","[id^=deleteBatchProgram]",function(e){
		if (confirm("Are you sure you want to delete selected item(s)?")) {
			var clicked = e.target.id || this.id;
			var batch_no = $(this).attr('batch_program_no');
			$.ajax({
				url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/BatchProgramServlet',
				type : 'post',
				data : {"action":"removebatchprogram","batch_no":batch_no},
				success : function(data){
					giveAlert(data);
					location.reload();
				}
			});
		}
	});
	$(document).on("click","[id^=editBatchProgram]",function(e){
		var clicked = e.target.id || this.id;
		var batch_no = $('#'+clicked).parent().parent().find('td:first').text();
		var program = $('#'+clicked).parent().parent().find('td:first').next().text();
		$('#editBatchProgramSpan').html(batch_no);
		$('#edit_batch_no').val(batch_no);
		$('#edit_program').val(program);
	});
	$('#password').keypress(function(e) {
	    var key = e.which;
	    if (key == 13) // the enter key code
	    {
	      $('#login').click();
	    }
	  });
	{
		var id, old;
		$('[id^=priority]').on('focus', function () {
			id = $(this).attr('id');
			old = $('#'+id).find(":selected").text();
		}).change( function(e) {
			id = $(this).attr('id');
			var selected = parseInt($('#'+id).find(":selected").text());
			if(selected != 0) {			
				$('[id^=priority').each(function () {	
					if($(this).attr('id') != id) {	
						$(this).find("option").each(function () {
							if($(this).text() == selected && parseInt($(this).text()) != 0) {
								$(this).attr('disabled', 'disabled');
							}
						});
					}
				});
			}
			else {
				$('[id^=priority').each(function () {
						$(this).find("option").each(function () {
							alert(e.old);
							if($(this).text() == e.old) {							
								$(this).removeAttr('disabled');
							}
						});
				});
			}
		});
	}
	$(document).on("change","[id^=priority]",function(e) {
		$.ajax({
			url : 'Exam_TimeTable_Scheduler_bySlots_Web_Project/RoomServlet',
			type : 'post',
			data : {
				'action' : 'setpriority',
				'room_no' : $(this).attr('room_no'),
				'priority' : $(this).find(":selected").attr('value')
			},
			success : function(data) {
				giveAlert(data);
				location.reload();
			}
		});
	});
});