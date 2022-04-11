const formElem = document.querySelector('form');
// let deals = [];
// const deals_status = {
// 	done: 0,
// 	deny: 0
// };
// if (!localStorage.getItem('deals')){
// 	localStorage.setItem('deals', '[]');
// }

// if (!localStorage.getItem('deals_status')){
// 	localStorage.setItem('deals_status', JSON.stringify({done: 0, deny: 0}));
// }

const get_deals = () => JSON.parse(localStorage.getItem('deals'))|| [];
const get_deals_status = () => JSON.parse(localStorage.getItem('deals_status'))|| {done: 0, deny: 0};

const add_deal = deal => localStorage.setItem('deals', JSON.stringify([...get_deals(), deal]));

const remove_deal = deal => {
	const new_lst = get_deals().filter(elem => JSON.stringify(elem) !==JSON.stringify(deal));
	localStorage.setItem('deals', JSON.stringify(new_lst));
}

const add_pos_status = ()=> { 
	const deals_status = get_deals_status();
	deals_status.done ++;
	localStorage.setItem('deals_status', JSON.stringify(deals_status));
} 

const add_neg_status = ()=> {
	const deals_status = get_deals_status();
	deals_status.deny ++;
	localStorage.setItem('deals_status', JSON.stringify(deals_status));
} 



formElem.addEventListener('submit', event=>{
	event.preventDefault();
	const {title, description} = event.target;
	add_deal({
		title: title.value,
		description: description.value
	});
	render(get_deals())
	title.value = '';
	description.value = '';

})

	function render(lst){
		const posElem = document.querySelector('.pos span')
		const negElem = document.querySelector('.neg span')
		const {done, deny} = get_deals_status();
		posElem.innerText = done;
		negElem.innerText = deny;

		const dealsElem = document.querySelector('#deals');
		dealsElem.innerText = '';
		if (get_deals().length){
			dealsElem.append(
				...get_deals().map(deal=>{
					const {title, description} = deal;
					const rootElem = document.createElement('div');
					rootElem.classList.add('deal');

					const titleElem = document.createElement('div');
					const descrElem = document.createElement('div');
					const infoElem = document.createElement('div');
					
					infoElem.classList = ('info')
					titleElem.innerText = title;
					descrElem.innerText = description;
					infoElem.append(titleElem, descrElem)

					
					

					const buttonsElem = document.createElement('div')
					const okBtnElem = document.createElement('div')
					const denBtnElem = document.createElement('div')
					buttonsElem.classList = ('triggers')
					okBtnElem.innerText = '👌';
					denBtnElem.innerText= '🚫';
					okBtnElem.classList.add('btn_pos');
					denBtnElem.classList.add('btn_neg');
					buttonsElem.append(okBtnElem, denBtnElem);

					rootElem.append(infoElem, buttonsElem);

					okBtnElem.addEventListener('click', ()=> {
						add_pos_status()
						remove_deal(deal)
						// deals_status.done ++;
						// deals = deals.filter(elem => elem!==deal);
						render();
					})
					denBtnElem.addEventListener('click',()=> {
						add_neg_status()
						remove_deal(deal)
						// deals_status.done ++;
						// deals = deals.filter(elem => elem!==deal);
						render()
					});

					return rootElem

			})
		)
		}else{
			const infoElem = document.createElement('p');
			infoElem.classList.add('empty_info');
			infoElem.innerText = 'нет дел';
			dealsElem.append(infoElem);
		}
	} render(get_deals())