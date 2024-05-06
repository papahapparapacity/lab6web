interface TaskData {
  task: string;
  createdAt: string;
}

const initialtodoListData: TaskData[] = [
  { task: "Сделать дело", createdAt: "05/02/2024" },
  { task: "Погладить кошку", createdAt: "06/02/2024" },
  { task: "Посадить картошку", createdAt: "06/02/2024" },
  { task: "Прочитать книгу", createdAt: "07/02/2024" },
  { task: "Сходить в магазин", createdAt: "05/03/2024" },
];

let listElement = document.getElementById('unnumberedList').children[1] as HTMLUListElement;

let listItemElemetsData: { element: HTMLLIElement; remove: () => void }[] = [];

const addButton = document.getElementById('addButton') as HTMLButtonElement;
const removeAllButton = document.getElementById('clearButton') as HTMLButtonElement;
const emptyListMessage = document.getElementById('emptyListMessage') as HTMLDivElement;

const createListItemElement = (listItemData: TaskData): { element: HTMLLIElement; remove: () => void } => {
  const listItemElement = document.createElement('li');

  const removeListItemElement = () => { listItemElement.remove(); };

  const divElement = document.createElement('div');
  divElement.appendChild(document.createTextNode(listItemData.task));
  const subElement = document.createElement('sub');
  subElement.appendChild(document.createTextNode('от ' + listItemData.createdAt));
  divElement.appendChild(subElement);

  listItemElement.appendChild(divElement);

  const buttonElement = document.createElement('button');
  buttonElement.appendChild(document.createTextNode('✖️'));
  buttonElement.addEventListener('click', removeListItemElement);

  listItemElement.appendChild(buttonElement);

  listItemElement.addEventListener('click', () => { listItemElement.classList.toggle('checked') });

  return {
    element: listItemElement,
    remove: removeListItemElement,
  };
};

const renderList = () => {
  initialtodoListData.forEach(itemData => {
    const newListItemElementData = createListItemElement(itemData);

    listItemElemetsData.push(newListItemElementData);
    listElement.appendChild(newListItemElementData.element);
  });
};

const clearList = () => {
  listItemElemetsData.forEach(elementData => {
    elementData.remove();
  });

  listItemElemetsData = [];
  emptyListMessage.style.display = 'block';
};

function createListItem() {
  const taskText = (document.getElementById('inputValue') as HTMLInputElement).value;
  const currentDate = new Date().toLocaleDateString('en-GB');

  const newListItemElementData = createListItemElement({
    task: taskText,
    createdAt: currentDate,
  });

  listItemElemetsData.push(newListItemElementData);
  listElement.appendChild(newListItemElementData.element);
}

addButton.addEventListener('click', createListItem);
removeAllButton.addEventListener('click', clearList);

renderList();

if (listItemElemetsData.length !== 0) {
  emptyListMessage.style.display = 'none';
}
