const list = document.querySelector('ul.student-list');
let listStudents = list.children;
let nbr_items_show = 10;
let numberOfStudents = list.children.length;
let numberOfPages = Math.ceil(numberOfStudents / nbr_items_show);
let numberOfNewStudents = 0;
let numberOfNewPages = 0;

function showPage(list, page) {
	for (let i = 0; i < numberOfStudents; i += 1) {
		let startIndex = (page * nbr_items_show) - (nbr_items_show);
		let endIndex = page * nbr_items_show;
		// show only 10 list items per page
		if (i >= startIndex && i < endIndex) {
			list.children[i].style.display = 'block';
		} else {
			list.children[i].style.display = 'none';
		}
	}
}

function appendPageLinks(numberOfPages) {
	let divpage = document.querySelector('.page');
	let div = document.createElement('DIV'); //creating pagination area
	div.className = "pagination";
	let ul = document.createElement('UL'); //pagination list
	divpage.append(div); //appending pagination to the page
	div.append(ul); //appending list to pagination
	for (let i = 0; i < numberOfPages; i++) {
		let li = document.createElement('LI');
		let a = document.createElement('A');
		a.setAttribute('href', '#');
		a.textContent = i + 1;
		ul.append(li);
		li.append(a); //appending links to list items
	}
	let aa = document.querySelectorAll('.pagination >ul>li>a');
	aa[0].className = "active";
	let active = document.querySelector('.active');
	//setting the active class to the clicked pagination link 
	function setAction(event) {
		for (let i = 0; i < numberOfPages; i++) {
			aa[i].classList.remove('active');
		}
		let e = event.target;
		const currentPage = parseInt(e.textContent);
		showPage(list, currentPage);
		e.classList.add('active');
	}
	for (let i = 0; i < numberOfPages; i++) {
		aa[i].addEventListener('click', (e) => {
			setAction(event);
		})
	}
}
//calling the functions 
showPage(list, 1);
appendPageLinks(numberOfPages);
// the searching bar without affecting the index.html page
const divSearch = document.createElement('div');
divSearch.className = "student-search";
const input = document.createElement('input');
input.placeholder = "Search for students...";
const button = document.createElement('button');
button.textContent = "Search";
divSearch.append(input);
divSearch.append(button);
let header = document.querySelector('.page-header');
header.append(divSearch);
let pagination = document.querySelector('.pagination');
// adding a click event listener on the submit button
button.addEventListener('click', () => {
	let pagii = document.querySelectorAll('.pagination');
	for (let i = 0; i < pagii.length; i++) {
		pagii[i].parentNode.removeChild(pagii[i]);
	}
	let storage = document.createElement('ul');
	storage.className = "ul.student-list";
	let listNames = document.querySelectorAll('ul.student-list>li>div>h3');
	for (let i = 0; i < list.children.length; i++) {
		let name = listNames[i].textContent;
		list.children[i].style.display = 'none';
		if (name.includes(input.value)) {
			numberOfNewStudents += 1;
			list.children[i].style.display = 'block';
		} else {
			list.children[i].style.display = 'none';
		}
	}
	numberOfNewPages = Math.ceil(numberOfNewStudents / nbr_items_show);
	appendPageLinks(numberOfNewPages);
});
