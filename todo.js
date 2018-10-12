'use strict';

{
  const qs = document.querySelector.bind(document);

  const store = [
    {
      item: 'Walk the dog', 
      checked: false
    },
    {
      item: 'Pay bills', 
      checked: false
    },
    {
      item: 'Make dinner', 
      checked: false
    },
    {
      item: 'Code for one hour', 
      checked: false
    }
  ];

  /**
   * Creates the HTML template for one todo item
   * @param  {string} item - The todo item name
   * @param  {boolean} checked - true if checked, false if not
   * @return {number} index - The index of the item in the store
   */
  const createToDo = ( item, checked, index ) => {  
    return `
      <div>
        <input type="checkbox" class="checkbox" name="todo-item" id="${index}" ${checked ? 'checked' : ''}>
        <label for="${index}">${item}</label>
      </div>
    `;
  };

  /**
   * Generate the HTML for the list of todos
   * @return {object} - HTML Node object
   */
  const generateToDos = () => {
    let itemsEl = document.createElement('div');
    itemsEl.classList.add('items');
    let toDoHtml = '';
    for(let i = 0; i < store.length; i++) {
      toDoHtml += createToDo( store[i].item, store[i].checked, i );
    }
    // assumes sanitized data in 'store'
    itemsEl.innerHTML = toDoHtml;
    return itemsEl;
  };

  /**
   * Render todo list HTML to the page
   */
  const renderList = () => {
    let oldItems = qs('.items');
    let newItems = generateToDos();
    qs('#to-do-list').replaceChild( newItems, oldItems );
  };

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    qs("#to-do-list").addEventListener( 'submit', event => {
      event.preventDefault();
      let itemInput = qs('#item');
      let userInput = itemInput.value;
      if( userInput && !userInput.match(/[&<>"'/]/ig) ) {
        addItemToList( userInput );
        itemInput.value = '';
        renderList();
      }
      else { 
        alert('Please enter valid a to do item!')
      }
    });
  };

  /**
   * Add todo item to the store
   * @param  {string} item - The todo item name
   * @param  {boolean} isChecked - true if checked, false if not
   */
  const addItemToList = ( item ) => store.push({ item, checked: false });

  /**
   * Handle todo item checkbox toggling
   */
  const handleItemChecked = () => {
    qs('#to-do-list').addEventListener( 'change', event => {
      if( event.target.matches('.checkbox') ) {
        const itemIndex = parseInt( event.target.id );
        console.log(store);
        store[itemIndex].checked = !store[itemIndex].checked;
        renderList();
      }
    }, false);
  };

  /**
   * Handles the todo list
   */
  const handleToDoList = () => {
    renderList();
    handleSubmit();
    handleItemChecked();
  };

  handleToDoList();
}




