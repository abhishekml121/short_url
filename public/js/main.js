/*

(()=>{
	let right_checkbox = document.querySelectorAll('.right_aside_wrap .checkbox');
	if(right_checkbox.length == 0) return false;
	right_checkbox.forEach(element => {
		if(localStorage[element.id]){
		  // fetching previous state
		  element.checked = (localStorage[element.id] == 'true')? true : false;
		}
		element.addEventListener('change', function() {
			  // Store
			  localStorage[this.id] = this.checked;
			  console.log(localStorage);
		  });
		
	});
})();*/
function ajax_call(obj={}){
	ajax_form_process.set_dynamic_values(obj.d_values);
	ajax_form_process.call_of_ajax(obj.xhr_values, obj['multiple_request']);
}

class CommonAjaxFunctions {
	default_form_btn_text_process = 'Please wait...';
	show_loading(obj) {
		if (typeof obj.e != 'object') {
			switch (obj.e) {
				case 'all_notes_art_wrap':
					break;

				default:
					// statements_def
					break;
			}
			return;
		}else{
		if (obj.e.target.classList.contains('submit_btn_short_url')) {
			obj.e.target.textContent = 'Generating Short URL...';
		}
	}
	}
	hide_loading(obj) {
		if (typeof obj.e === 'object') {
			obj.e.target.textContent = obj.default_btn_value['default_btn_value'];
			/*if (obj.e.target.classList.contains('subscription_form_btn')) {
				obj.e.target.classList.remove('processsing_loader');
			}*/
		} else if (typeof obj.e != 'object') {
			switch (obj.e) {
				case 'all_notes_art_wrap':
					if (window.location.href.search('user/notes') >= 0) {
						show_more_note.first_container_note.querySelectorAll('.ajax_loader1').forEach(element => {
							element.remove();
						});
					}
					break;
				default:
					// statements_def
					break;
			}
		}
	}

	get_form_data(form_id) {
		let form_details = document.getElementById(form_id);
		if (form_details == null) return;
		let form_data = new FormData(form_details);
		switch (form_id) {
			case 'create_note_form':
				form_data.append('note_html', get_parsed_output.parsed_sanitized_markdown);
				break;
				
			case 'q_n_form':
				form_data.append('note_html', get_parsed_output.parsed_sanitized_markdown);
				if(document.querySelector('.q_n_note__id').value.trim() != ''){
					form_data.append('note_id', document.querySelector('.q_n_note__id').value.trim());
				}
				break;

			case 'edit_note_form':
				form_data.append('note_html', get_parsed_output.parsed_sanitized_markdown);
				break;

			default:
				// statements_def
				break;
		}
		let key, value;
		for ([key, value] of form_data.entries()) {
			console.log(key + ': '+ value);
		}
		return form_data;
	}
}


class UserFormProcessAjax extends CommonAjaxFunctions {
	request_in_progess = false;
	which_form = '';
	url;
	method;
	form_id;
	hide_loading_param = {};

	constructor() {
		super();
	}

	set_dynamic_object_for_loading_status() {
		switch (this.which_form) {
			case 'short_url_form':
				this.hide_loading_param = {
					default_btn_value: 'Get Short URL'
				};
				break;

			case 'user_reg_form':
				this.hide_loading_param = {
					default_btn_value: 'Register'
				};
				break;

			case 'login_form':
				this.hide_loading_param = {
					default_btn_value: 'Login'
				};
				break;
		
			default:
				// statements_def
				break;
		}
	}

	reset_reg_form_err() {
		if (document.querySelector('#reg_art .error_div') != null) {
			document.querySelectorAll('#reg_art .error_div').forEach(element => {
				element.remove();
			});
		}
		if (document.querySelector('#reg_art .input_red_border') != null) {
			document.querySelectorAll('#reg_art .input_red_border').forEach(element => {
				element.classList.remove('input_red_border');
			});
		}
	}
	/* reset_reg_form_err()  -------ENDS*/

	reset_login_form_err() {
		if (document.querySelector('#login_art .error_div') != null) {
			document.querySelectorAll('#login_art .error_div').forEach(element => {
				element.remove();
			});
		}
		if (document.querySelector('#login_art .input_red_border') != null) {
			document.querySelectorAll('#login_art .input_red_border').forEach(element => {
				element.classList.remove('input_red_border');
			});
		}
	}
	/* reset_login_form_err()  -------ENDS*/

	show_reg_form_err(json) {
		this.reset_reg_form_err();
		let error_div = document.createElement('div');
		error_div.className = 'error_div';

		for (let i in json) {
			switch (i) {
				case 'username':
					error_div.textContent = json[i];
					document.querySelector('.reg_user_name_or_email').appendChild(error_div.cloneNode(true));
					document.getElementById('unique_username').classList.add('input_red_border');
					break;

				case 'password':
					error_div.textContent = json[i];
					document.querySelector('.reg_user_paswd').appendChild(error_div.cloneNode(true));
					document.getElementById('reg_user_paswd').classList.add('input_red_border');
					break;

				case 'confirm_password':
					error_div.textContent = json[i];
					document.querySelector('.reg_user_confirm_paswd').appendChild(error_div.cloneNode(true));
					document.getElementById('reg_user_confirm_paswd').classList.add('input_red_border');
					break;
				default:
					// statements_def
					break;
			}
		}
	}
	/* show_reg_form_err() -----ENDS*/

	show_login_form_err(json) {
		this.reset_login_form_err();
		let error_div = document.createElement('div');
		error_div.className = 'error_div';

		for (let i in json) {
			switch (i) {
				case 'username_email':
					error_div.textContent = json[i];
					document.querySelector('.user_name_or_email').appendChild(error_div.cloneNode(true));
					document.getElementById('unique_user_id').classList.add('input_red_border');
					break;

				case 'password':
					error_div.textContent = json[i];
					document.querySelector('.user_paswd_wrap').appendChild(error_div.cloneNode(true));
					document.getElementById('user_paswd').classList.add('input_red_border');
					break;

				case 'username_email_wrong':
					error_div.textContent = json[i];
					document.querySelector('.user_paswd').appendChild(error_div.cloneNode(true));
					break;
				default:
					// statements_def
					break;
			}
		}
	}

	/* show_login_form_error() -----ENDS*/


	set_dynamic_values(obj = {}) {
		if (typeof obj.e === 'object' && obj.e.target.hasAttribute("data-src")) {
			let data_src = obj.e.target.getAttribute('data-src');

			switch (data_src) {
				case 'short_url_form':
					this.form_id = obj.form_id;
					this.method = 'POST';
					this.url = './process/create_short_url_form.process.php';
					this.which_form = obj.which_form;
					break;

				case 'user_reg_form':
					this.form_id = obj.form_id;
					this.method = 'POST';
					this.url = './process/user_registration.process.php';
					this.which_form = obj.which_form;
					break;
				/*
				case 'login_btn':
					this.form_id = obj.form_id;
					this.method = 'POST';
					if (window.location.href.search('/user/') >= 0 || window.location.href.search('/pages/forget_password') >=0 || window.location.href.search('/pages/about') >=0) {
						this.url = '../process/user_form_login.process.php';
					} else {
						this.url = './process/user_form_login.process.php';
					}
					this.which_form = obj.which_form;
					break;
				case 'save_note_btn':
					this.form_id = obj.form_id;
					this.method = 'POST';
					this.url = './process/user_save_note.process.php';
					this.which_form = obj.which_form;
					break;*/

				default:
					// statements_def
					break;
			} // switch()
			this.set_dynamic_object_for_loading_status();
		} else {
			switch (obj.which_form) {
/*				case 'load_user_notes':
					this.method = 'GET';
					this.url = './process/get_user_notes.process.php?page=' + (++show_more_note.page);
					this.which_form = obj.which_form;
					break;
				case 'delete_note_of_popup':
					this.method = 'GET';
					this.url = './process/delete_note.process.php?note_id=' + show_more_note.note_id;
					this.which_form = obj.which_form;
					this.set_dynamic_object_for_loading_status();
					break;*/
				case 'show_live_views':
					this.form_id = obj.form_id;
					this.method = 'GET';
					this.url = './process/get_views.php?id='+ShowLiveView.get_id('aj_url_id');
					this.which_form = obj.which_form;
					break;

				default:
					break;
			}
		}
	}

	/* params => e, has_form */
	call_of_ajax(obj = {}, multiple_request = 'false') {
		// Prevents multiple AJAX request.
		if (this.request_in_progess && multiple_request == 'false') {
			return;
		}
		this.request_in_progess = true;
		this.show_loading({
			e: obj.e
		});

		let xhr = new XMLHttpRequest();
		xhr.open(this.method, this.url, true);
		xhr.setRequestHeader('X-Requested-with', 'XMLHttpRequest');
		//--For POST request
		// Do not set content-type with FormData
		if (obj.has_form == false && this.method == 'POST') {
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		}

		xhr.onreadystatechange = () => {
			try {
				console.log(xhr.readyState, xhr.status);
				if (xhr.readyState == 4 && xhr.status == 200) {
					this.hide_loading({
						e: obj.e,
						default_btn_value: this.hide_loading_param
					});
					console.log(xhr.responseText);
					let json = JSON.parse(xhr.responseText);

					if (json.hasOwnProperty('type')) {
						switch (json.type) {
							case 'create_short_url':
								if (json.hasOwnProperty('result') && json.result == 'true') {
									window.location.href ='./shorted_url.php?id='+json.data.short_url_id;
								} else if (json.hasOwnProperty('errors')) {
									this.show_reg_form_err(json.errors);
								}
								break;

							case 'total_views':
								if (json.hasOwnProperty('result') && json.result == 'true') {
									if(json.data['views'] > ShowLiveView.get_previous_views){
									counter_meter('live_view_here', json.data['views']);
									ShowLiveView.get_previous_views = json.data['views'];
								}
								} else if (json.hasOwnProperty('errors')) {
								}
								break;

							

							/*case 'user_reg':
								if (json.hasOwnProperty('result') && json.result == 'true') {
									// [][][] show alert like PUBG (yellow) .
									// alert => may be data has been added successfuly.
									this.reset_reg_form_err();
									window.location.href = json['redirect_url'];
								} else if (json.hasOwnProperty('errors')) {
									this.show_reg_form_err(json.errors);
								}
								break;
							
							case 'user_login':
								if (json.hasOwnProperty('result') && json.result == 'true') {
									this.reset_login_form_err();
									window.location.href = json['redirect_url'];
								} else if (json.hasOwnProperty('errors') && json.result == 'false') {
									this.show_login_form_err(json.errors);
								}
								break;*/

							default:
								// statements_def
								break;
						}

					}

				} else if (xhr.readyState == 4 && xhr.status == 404) {
					// code for handle errors...
					// [][][] show alert like PUBG (yellow) .
					// alert => may be like something went wrong.
					console.log(`ERROR : script for processing not found. (${xhr.status})`);
					// (has_form == true)  ? hide_loading(e) : hide_loading_specific(e);

				}
				// It means request has completed.
				this.request_in_progess = false;
			} catch (e) {
				// [][][] show alert like PUBG (yellow) .
				console.log('%c ERROR : ' + e, 'color: red;');
			} finally {
				/*	    if(xhr.readyState == 4){
							if(document.querySelector('.temp_loading')){
								let second_loading = document.querySelectorAll('.temp_loading');
								for (let k = 0; k < second_loading.length; k++) {
									second_loading[k].remove();
								}
							    
							}
						}*/
			}


		}; // onreadystatechange()
		/* Sending the request */
		if (obj.has_form == true) {
			xhr.send(this.get_form_data(this.form_id));
		} else {
			xhr.send();
		}
	}
}

let ajax_form_process = new UserFormProcessAjax;
/* add click event on checkbox for input the custom short URL*/
let custom_checkbox_for_url = document.querySelector('.custom_url_checkbox');
if(custom_checkbox_for_url != null){
	let custom_url_name = document.querySelector('.custom_url_name');
	custom_checkbox_for_url.addEventListener('change', ()=>{
		if(custom_checkbox_for_url.checked){
			custom_url_name.disabled=false;
			custom_url_name.classList.add('blue_border_input');
		}else{
			custom_url_name.disabled=true;
			custom_url_name.classList.remove('blue_border_input');
		}
	});
}

/* create short url */
let short_url_form = document.querySelector('.submit_btn_short_url');
if(short_url_form != null){
	short_url_form.addEventListener('click', (e)=>{
		e.preventDefault();
		console.log(e);
		ajax_call(
			{
				d_values :{
					e: e,
					form_id: 'short_url_form',
					which_form: 'short_url_form'
				},
				xhr_values: {
					e: e,
					has_form: true
				},
				multiple_request : 'false'
			}
		);
		
	});
}

// copy text to clipboard
class copyToClipboard{
	static copy_now(class_id_name){
		copy_to_clipboard(class_id_name);
	}
}

let copy_to_clp = document.querySelector('.copy_to_clp');
if(copy_to_clp!=null){
	copy_to_clp.addEventListener('click', ()=>{
		copy_to_clp.classList.remove('copied_success');
		copyToClipboard.copy_now('copy_this_text');
		copy_to_clp.classList.add('copied_success');
		setTimeout(() => {
			copy_to_clp.classList.remove('copied_success');
		}, 1000)
	});
}

// ajax code for show live views of a short URL
class ShowLiveView{
	static previousViews;
	static set_previous_views(value){
		this.previousViews = value;
	}

	static get_previous_views(){
		return this.previousViews;
}
	static send_ajax_req(){
		ajax_call(
			{
				d_values :{
					e: '',
					form_id: '',
					which_form: 'show_live_views'
				},
				xhr_values: {
					e: 'show_live_views',
					has_form: false
				},
				multiple_request : 'false'
			}
		);
	}

	static get_id(class_id_name){
		let element = document.querySelector('.'+class_id_name) ?? document.querySelector('#'+class_id_name);
		return element.textContent;
	}
}

let live_view_here = document.querySelector('.live_view_here');
if(live_view_here != null){
	setInterval(() => {
		ShowLiveView.send_ajax_req();
	}, 1000);
}

let user_reg_btn = document.querySelector('.register_btn');
if(user_reg_btn != null){
	user_reg_btn.addEventListener('click', (e)=>{
		e.preventDefault();
		console.log(e);
		ajax_call(
			{
				d_values :{
					e: e,
					form_id: 'user_reg_form',
					which_form: 'user_reg_form'
				},
				xhr_values: {
					e: e,
					has_form: true
				},
				multiple_request : 'false'
			}
		);
	});
}

/* save note process --STARTS*/
/*if(window.location.href.substr(-15) == 'create_note.php'){
	console.log('running md parsed...');
	var converter = new showdown.Converter();
	text      = '`hello`, markdown!';
	html      = converter.makeHtml(text);
	console.log(html);
}*/
/*
class ChangeProfilePic
{
	selected_pic_div = '';
	add_event_on_button(){
		document.querySelector('.profile button').addEventListener('click',(e)=>{
			e.preventDefault();
			if(document.querySelector('input[name="s_profile"]:checked') != null){
				this.send_request();
				this.selected_pic_div = document.querySelector('input[name="s_profile"]:checked').closest('.profile');
			}
		});
	}

	updateUI(){
		let previous_profile_pic_url = document.querySelector('.current_profile img').src;
		// moving selected [right/left] src to middle src.
		document.querySelector('.current_profile img').src = this.selected_pic_div.querySelector('img').src.replace('s=80', 's=60');
		// moving middle src to selected [right/left] src.
		this.selected_pic_div.querySelector('img').src = previous_profile_pic_url.replace('s=60', 's=80');
		// updating main user profile which is 130px.
		document.querySelector('.current_user_profile img').src = document.querySelector('.current_profile img').src.replace('s=60', 's=130');
	}

	send_request(){
		ajax_call(
			{
				d_values :{
					e: '',
					form_id: '',
					which_form: 'change_profile_pic'
				},
				xhr_values: {
					e: 'change_profile_pic',
					has_form: false
				},
				multiple_request : 'false'
			}
		);
	}
}
*/

/*class ChartsGraphs
{
	send_request(){
		ajax_call(
			{
				d_values :{
					e: '',
					form_id: '',
					which_form: 'load_chart'
				},
				xhr_values: {
					e: 'load_charts_graphs',
					has_form: false
				},
				multiple_request : 'true'
			}
		);
	}
	// {arr:json, target_element:insert_into, t_w_h:{title, width, height}}
	show_pie_chart(obj={}){
		// load google charts
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);

		// Draw the chart and set the chart values
		function drawChart() {
			var data = google.visualization.arrayToDataTable(obj.arr);

			// Optional; add a title and set the width and height of the chart
			var options = obj.t_w_h;

			// Display the chart inside the <div> element with id="piechart"
			var chart = new google.visualization.PieChart(document.querySelector(obj.target_element));
			chart.draw(data, options);
		}
		
	}
}*/

/*if(window.location.href.search('/user/overview') > 0){
	var graph_chart = new ChartsGraphs;
	setTimeout(() => {
		graph_chart.send_request();
	}, 0);
	console.log('google chart will show');
}else{
	console.log('google chart will NOT show');
}*/





/*class award_to_developer {
	current_trophy_ID = null;
	add_event_on_btn() {
		let btn = document.querySelector('.award_me_art .btn');
		if (btn != null) {
			btn.addEventListener('click', (e) => {
				if (this.current_trophy_ID == null) {
					anime({
						targets: '.award_me_art .child_award',
						scale: [2,0,1,2,0,1],
						rotate:[45,-45,0],
						easing: 'linear',
						duration: 1000
					});
					return;
				}
				ajax_form_process.set_dynamic_values({
					e: '',
					form_id: '',
					which_form: 'give_award_to_developer'
				});
				ajax_form_process.call_of_ajax({
					e: e,
					has_form: false
				});
			}, false);
		}
	}

	give_me_award() {
		let container = document.querySelector('.award_me_art');
		let previous_clicked_trophy = null;
		let trophy_name = '';
		let create_element_id = 0;
		if (container == null) {
			return;
		}
		container.addEventListener('click', (e) => {
			if (e.target.classList.contains('child_award')) {
				if (previous_clicked_trophy != null) {
					anime({
						targets: '.award_me_wrap .' + trophy_name,
						scale: [1.5, 1],
						duration: 300
					});
				}
				previous_clicked_trophy = e.target.getAttribute('data-trophy-id');
				this.current_trophy_ID = previous_clicked_trophy;
				if (previous_clicked_trophy == 0) {
					trophy_name = 'gold-trophy';
				} else if (previous_clicked_trophy == 1) {
					trophy_name = 'silver-trophy';
				} else {
					trophy_name = 'bronze-trophy';
				}

				//used for sending ajax request to save user response in DB.
				this.current_clicked_trophy = document.querySelector('.award_me_wrap .' + trophy_name);

				anime({
					targets: this.current_clicked_trophy,
					scale: [1, 1.5],
					duration: 300
				});
			}
		}, false);
	}
}

let award = new award_to_developer;
award.add_event_on_btn();
award.give_me_award();*/
