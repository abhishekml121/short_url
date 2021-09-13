function copy_to_clipboard(class_or_id_name) {
  /* Get the text field */
  let copyText = document.querySelector('.'+class_or_id_name) ?? document.querySelector('#'+class_or_id_name);

  /* Select the text field */
  // SELECT only works on input fields
  copyText.select();

   /* Copy the text inside the text field */
  console.log(navigator.clipboard.writeText(copyText.value));

  /* Alert the copied text */
  // alert("Copied the text: " + copyText.value);
}

// This code is taken from- 
// https://codepen.io/manish88/pen/JjNqpjL
function counter_meter(class_or_id_name, views){
let counter = document.querySelector('.'+ class_or_id_name) ?? document.getElementById(class_or_id_name);
let counterData = views;
let initialTranslate = 'translateY(-100%)';
let addTranslate = 'translateY(100%)';

// if(counterData > 0){
//     counter.style.color = 'yellow'
// }

csstranform = '-webkit-transform';
counter.style.transform = initialTranslate;
counter.style.csstranform = initialTranslate;
counter.style.opacity = '0';

timeOut = 80;

setTimeout(function () {
    counter.textContent = views;
    setTimeout(function () {
        counter.style.transform = addTranslate;  
        counter.style.csstranform = addTranslate;    
        counter.style.opacity = '0'; 
        setTimeout(function () {
            counter.style.transform = 'translateY(0%)';   
            counter.style.csstranform = 'translateY(0%)';  
            counter.style.opacity = '1'; 
        },timeOut)
    },timeOut)
},timeOut)
}


function get_url_file_name() {
	let href = window.location.href
	index = href.lastIndexOf("/") + 1;
	return href.slice(index);
}

function url_has_params(url) {
	return url.includes('?'); // true/false
}

function get_url_params(url, param_name) {
	let url_string = url;
	url = new URL(url_string);
	if (url.searchParams.has(param_name)) {
		return url.searchParams.get(param_name);
	}
	// If url does not has a requested parameter.
	return false;
}

function shake_element(class_name) {
	anime({
		targets: [class_name],
		translateX: [20, 0, -20, 0, 20, 0, -20, 0],
		easing: 'linear',
		duration: 400
	});
}

function goBack() {
	window.history.back();
}

function remove_elements(id_or_class_name) {
	let element = document.querySelectorAll('.'+ id_or_class_name) ?? document.querySelector('#'+id_or_class_name);
	if (element.length > 0) {
		element.forEach(element => {
			element.remove();
		});
		return true;
	}
	return false;
}

function update_textContent(id_or_class_name, textContent) {
	let element = document.querySelector('.'+ id_or_class_name) ?? document.querySelector('#'+id_or_class_name);

	if (element != null) {
		element.textContent = textContent;
	}
}

function compare_arrays(a, b){
	return a.length === b.length && a.every((value, index) => value === b[index])
}
function get_unique_array(arr){
	return [... new Set(arr)];
}
function strip_html(html){
	return html.replace(/(<([^>]+)>)/gi, "");
}
function popup_close_outside_clicks(outside_element, class_name, close_btn){
	let outside = document.querySelector(outside_element);
	let close_btn_ = document.querySelector(close_btn);
	outside.addEventListener('click', (e) => {
		e.stopImmediatePropagation();
		if(e.target.classList.contains(class_name)){
			close_btn_.click();
		}
	});
}
function resetForm(form_id_or_class) {
	let form = document.querySelector('#'+form_id_or_class) ?? document.querySelector('.'+form_id_or_class);
	
	if (form != null) {
		form.reset();
	}
}

function filter_by_regex(unfiltered, regex){
	if(!regex){
		regex = /[\w]+/;
	}
	return unfiltered.match(regex);
}

